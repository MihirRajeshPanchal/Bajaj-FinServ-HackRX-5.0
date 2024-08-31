import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import google.auth

SCOPES = ["https://www.googleapis.com/auth/presentations","https://www.googleapis.com/auth/drive"]

def load_credentials():
    """Load user credentials from the token.json file or initiate the OAuth flow."""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            creds = authorize_credentials()
        save_credentials(creds)
    return creds

def authorize_credentials():
    """Run the OAuth flow to obtain new credentials."""
    flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
    creds = flow.run_local_server(port=0)
    return creds

def save_credentials(creds):
    """Save the credentials to the token.json file."""
    with open("token.json", "w") as token:
        token.write(creds.to_json())