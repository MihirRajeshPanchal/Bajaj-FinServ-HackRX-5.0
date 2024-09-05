from typing import Any, Dict
import uuid
import json
import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException

dynamodb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')

UserTable = "bajaj_user"
QuizTable = "bajaj_quiz"
SlideTable = "bajaj_slide"

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