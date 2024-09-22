import os
import json
import boto3
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from backend.aws import BajajCredentials
SCOPES = [
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
]

S3_BUCKET_NAME = BajajCredentials
S3_CREDENTIALS_FOLDER = "credentials"

s3_client = boto3.client("s3")

def load_credentials(email):
    """Load user credentials from S3 or initiate the OAuth flow."""
    creds = None
    token_file_key = f"{S3_CREDENTIALS_FOLDER}/{email}_token.json"

    if s3_key_exists(S3_BUCKET_NAME, token_file_key):
        creds = load_credentials_from_s3(token_file_key)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            creds = authorize_credentials()
        save_credentials_to_s3(creds, email)
    
    return creds


def authorize_credentials():
    """Run the OAuth flow to obtain new credentials."""
    flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
    creds = flow.run_local_server(port=0)
    return creds


def load_credentials_from_s3(s3_key):
    """Load credentials from S3 using the provided key."""
    try:
        response = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=s3_key)
        creds_data = response['Body'].read().decode('utf-8')
        creds = Credentials.from_authorized_user_info(json.loads(creds_data), SCOPES)
        return creds
    except Exception as e:
        print(f"Error loading credentials from S3: {e}")
        return None


def save_credentials_to_s3(creds, email):
    """Save the credentials to S3."""
    token_file_key = f"{S3_CREDENTIALS_FOLDER}/{email}_token.json"
    try:
        creds_data = creds.to_json()
        s3_client.put_object(
            Bucket=S3_BUCKET_NAME, Key=token_file_key, Body=creds_data
        )
        print(f"Credentials saved to S3: {token_file_key}")
    except Exception as e:
        print(f"Error saving credentials to S3: {e}")


def s3_key_exists(bucket_name, key):
    """Check if a key exists in the S3 bucket."""
    try:
        s3_client.head_object(Bucket=bucket_name, Key=key)
        return True
    except:
        return False


def get_user_info(creds):
    """Retrieve user information (email) using the People API."""
    service = build("oauth2", "v2", credentials=creds)
    user_info = service.userinfo().get().execute()
    return user_info