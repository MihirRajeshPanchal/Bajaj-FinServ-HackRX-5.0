from io import BytesIO
import os
from typing import Any, Dict, List
import uuid
import json
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from backend.constants import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
from fastapi import HTTPException
import boto3
from collections import defaultdict
from backend.models import QuizResponse


name_icon_map = {
    "Brochure": "file-pdf",
    "Customer Information Sheet": "file-lines",
    "Policy Wordings": "file-contract",
    "Proposal Form": "file-pen",
}

folder_icon = "folder"

dynamodb = boto3.resource(
    "dynamodb",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)

UserTable = "bajaj_user"
QuizTable = "bajaj_quiz"
SlideTable = "bajaj_slide"
QuizResponseTable = "bajaj_quiz_response"
SummaryTable = "bajaj_summary"

BajajBucket = "bajaj-bucket"
BajajCredentials = "bajaj-credentials"

usertable = dynamodb.Table(UserTable)
quiztable = dynamodb.Table(QuizTable)
slidetable = dynamodb.Table(SlideTable)
quizresponsetable = dynamodb.Table(QuizResponseTable)
summarytable = dynamodb.Table(SummaryTable)


def store_email_in_dynamodb(email):
    """Store the user's email in DynamoDB, avoiding duplicates."""
    try:
        response = usertable.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr("email").eq(email)
        )
        if response["Items"]:
            print(f"Email {email} already exists in DynamoDB.")
        else:
            item_id = str(uuid.uuid4())
            usertable.put_item(Item={"id": item_id, "email": email})
            print(f"Stored email {email} in DynamoDB with id {item_id}.")
    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error storing email: {e.response['Error']['Message']}",
        )


def dump_quiz_to_dynamodb(plan: str, json_data: Dict[str, Any]) -> None:
    """
    Function to dump JSON data to DynamoDB with plan as the partition key.
    """
    quiztable.put_item(Item={"plan": plan, "json_data": json.dumps(json_data)})


def dump_slide_to_dynamodb(plan: str, json_data: Dict[str, Any]) -> None:
    """
    Function to dump JSON data to DynamoDB with plan as the partition key.
    """
    slidetable.put_item(Item={"plan": plan, "json_data": json.dumps(json_data)})


def dump_summary_to_dynamodb(plan: str, json_data: Dict[str, Any]) -> None:
    """
    Function to dump JSON data to DynamoDB with plan as the partition key.
    """
    summarytable.put_item(Item={"plan": plan, "json_data": json.dumps(json_data)})


def dump_quiz_response_to_dynamodb(
    email: str,
    topic: str,
    plan: str,
    document: str,
    noCorrectResponse: str,
    noWrongResponse: str,
) -> None:
    """
    Function to dump JSON data to DynamoDB.
    """
    quizresponsetable.put_item(
        Item={
            "id": email + " " + topic + " " + plan + " " + document,
            "email": email,
            "topic": topic,
            "plan": plan,
            "document": document,
            "noCorrectResponse": noCorrectResponse,
            "noWrongResponse": noWrongResponse,
        }
    )


def list_s3_objects(bucket_name: str, prefix: str) -> List[str]:
    """List all objects in an S3 bucket with a given prefix."""
    try:
        objects = []
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        while response.get("Contents"):
            objects.extend([obj["Key"] for obj in response["Contents"]])
            if response.get("IsTruncated"):
                continuation_token = response.get("NextContinuationToken")
                response = s3.list_objects_v2(
                    Bucket=bucket_name,
                    Prefix=prefix,
                    ContinuationToken=continuation_token,
                )
            else:
                break
        return objects
    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error listing S3 objects: {e.response['Error']['Message']}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error listing S3 objects: {str(e)}"
        )


def download_s3_folder(bucket_name: str, s3_folder: str, local_folder: str):
    """Download an entire S3 folder to a local directory."""
    objects = list_s3_objects(bucket_name, s3_folder)
    if not objects:
        raise FileNotFoundError("No objects found in S3 folder")

    for s3_key in objects:
        local_file_path = os.path.join(local_folder, os.path.basename(s3_key))
        s3.download_file(bucket_name, s3_key, local_file_path)


def upload_folder_to_s3(local_folder: str, bucket_name: str, s3_folder: str):
    """Upload a local folder to an S3 bucket."""
    try:
        for root, _, files in os.walk(local_folder):
            for file in files:
                local_file_path = os.path.join(root, file)
                relative_path = os.path.relpath(local_file_path, local_folder)
                s3_file_path = os.path.join(s3_folder, relative_path).replace("\\", "/")

                s3.upload_file(local_file_path, bucket_name, s3_file_path)
                print(f"Uploaded {local_file_path} to {s3_file_path}")
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=f"File not found: {e}")
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS credentials not found.")
    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading files to S3: {e.response['Error']['Message']}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error uploading files to S3: {str(e)}"
        )


def upload_to_s3(file_obj: BytesIO, bucket_name: str, s3_key: str):
    try:
        file_obj.seek(0)
        s3.upload_fileobj(file_obj, bucket_name, s3_key)
        print(f"Uploaded file to s3://{bucket_name}/{s3_key}")
    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading to S3: {e.response['Error']['Message']}",
        )
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS credentials not found.")


def download_from_s3(bucket_name: str, s3_key: str) -> BytesIO:
    buffer = BytesIO()
    s3.download_fileobj(bucket_name, s3_key, buffer)
    buffer.seek(0)
    return buffer


def upload_pdf_to_s3(file_path, bucket_name, s3_file_path):
    try:
        with open(file_path, "rb") as pdf_file:
            s3.upload_fileobj(pdf_file, bucket_name, s3_file_path, ExtraArgs={"ContentDisposition": "inline", "ContentType": "application/pdf"},)
        return {"response": "PDF uploaded to S3"}
    except Exception as e:
        raise Exception(f"Failed to upload PDF to S3: {str(e)}")


def should_exclude(name):
    return "faiss_index" in name or "." in name


def get_name_icon(name):
    return name_icon_map.get(name, folder_icon)


def get_s3_folder_structure(bucket_name):
    response = s3.list_objects_v2(Bucket=bucket_name)
    if "Contents" not in response:
        return {"sidebarData": []}

    files = response["Contents"]

    folder_structure = lambda: defaultdict(folder_structure)
    root = folder_structure()

    for obj in files:
        path_parts = obj["Key"].split("/")
        current_level = root
        for part in path_parts[:-1]:
            if should_exclude(part):
                continue
            current_level = current_level[part]

        if not should_exclude(path_parts[-1]):
            current_level[path_parts[-1]] = None

    def format_structure(d):
        output = []
        for key, value in d.items():
            if isinstance(value, defaultdict):

                folder_content = format_structure(value)
                folder_item = {"name": key, "icon": get_name_icon(key)}
                if folder_content:
                    folder_item["children"] = folder_content
                output.append(folder_item)
            else:

                output.append({"name": key, "icon": get_name_icon(key)})
        return output

    sidebar_data = format_structure(root)
    return {"sidebarData": sidebar_data}


def upload_video_to_s3(file_path, bucket_name, s3_key):
    """Upload a file to S3 and make it publicly accessible."""
    try:
        s3.upload_file(
            file_path,
            bucket_name,
            s3_key,
            ExtraArgs={"ContentDisposition": "inline", "ContentType": "video/mp4"},
        )
        print(f"File uploaded to S3: s3://{bucket_name}/{s3_key}")
        s3_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"
        return s3_url
    except FileNotFoundError:
        print("The file was not found")
    except NoCredentialsError:
        print("Credentials not available")


def file_exists(s3_bucket, s3_file_path):
    try:
        s3.head_object(Bucket=s3_bucket, Key=s3_file_path)
        return True
    except s3.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "404":
            return False

def check_pdf_in_s3(bucket_name, file_path, file_name):
    s3_key = f"{file_path}/{file_name}"
    
    try:
        s3.head_object(Bucket=bucket_name, Key=s3_key)
        pdf_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"
        return {"pdf_url": pdf_url}
    
    except ClientError as e:
        if e.response['Error']['Code'] == '404':
            return {"response": "File does not exist"}
        else:
            raise Exception(f"Error occurred while checking file in S3: {str(e)}")