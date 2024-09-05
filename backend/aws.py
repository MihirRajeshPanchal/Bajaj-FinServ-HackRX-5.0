from io import BytesIO
import os
from typing import Any, Dict, List
import uuid
import json
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from backend.constants import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
from fastapi import HTTPException

dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

UserTable = "bajaj_user"
QuizTable = "bajaj_quiz"
SlideTable = "bajaj_slide"

BajajBucket = "bajaj-bucket"

usertable = dynamodb.Table(UserTable)
quiztable = dynamodb.Table(QuizTable)
slidetable = dynamodb.Table(SlideTable)

def store_email_in_dynamodb(email):
    """Store the user's email in DynamoDB, avoiding duplicates."""
    try:
        response = usertable.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('email').eq(email)
        )
        if response['Items']:
            print(f"Email {email} already exists in DynamoDB.")
        else:
            item_id = str(uuid.uuid4())
            usertable.put_item(Item={"id": item_id, "email": email})
            print(f"Stored email {email} in DynamoDB with id {item_id}.")
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Error storing email: {e.response['Error']['Message']}")

def dump_quiz_to_dynamodb(file_path: str, json_data: Dict[str, Any]) -> None:
    """
    Function to dump JSON data to DynamoDB with file_path as the partition key.
    """
    quiztable.put_item(
        Item={
            'file_path': file_path,
            'json_data': json.dumps(json_data)
        }
    )

def dump_slide_to_dynamodb(file_path: str, json_data: Dict[str, Any]) -> None:
    """
    Function to dump JSON data to DynamoDB with file_path as the partition key.
    """
    slidetable.put_item(
        Item={
            'file_path': file_path,
            'json_data': json.dumps(json_data)
        }
    )
    
def list_s3_objects(bucket_name: str, prefix: str) -> List[str]:
    """List all objects in an S3 bucket with a given prefix."""
    try:
        objects = []
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        while response.get('Contents'):
            objects.extend([obj['Key'] for obj in response['Contents']])
            if response.get('IsTruncated'):
                continuation_token = response.get('NextContinuationToken')
                response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix, ContinuationToken=continuation_token)
            else:
                break
        return objects
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Error listing S3 objects: {e.response['Error']['Message']}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing S3 objects: {str(e)}")

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
        raise HTTPException(status_code=500, detail=f"Error uploading files to S3: {e.response['Error']['Message']}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading files to S3: {str(e)}")

def upload_to_s3(file_obj: BytesIO, bucket_name: str, s3_key: str):
    try:
        file_obj.seek(0) 
        s3.upload_fileobj(file_obj, bucket_name, s3_key)
        print(f"Uploaded file to s3://{bucket_name}/{s3_key}")
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Error uploading to S3: {e.response['Error']['Message']}")
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS credentials not found.")
    

def download_from_s3(bucket_name: str, s3_key: str) -> BytesIO:
    buffer = BytesIO()
    s3.download_fileobj(bucket_name, s3_key, buffer)
    buffer.seek(0)
    return buffer