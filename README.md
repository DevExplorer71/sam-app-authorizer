# SAM App with Lambda Authorizer Example

This project demonstrates an AWS SAM application with a Lambda authorizer and a protected API endpoint (`/people`).

---

## Prerequisites

- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed (`sam --version`)
- Node.js 18+ and Python 3.7+
- (Optional) Postman or curl for API testing

---

## Setup

### 1. Install Dependencies

From the project root, install Node.js dependencies for each Lambda:

```bash
cd authorizer
npm install
cd ../people
npm install
cd ../hello-world
npm install
cd ../..
```

### 2. Build the SAM Application

```bash
sam build
```

### 3. Deploy to AWS

```bash
sam deploy --guided
```
- Answer prompts for stack name, region, and permissions.
- Note the API endpoint URL output at the end.

---

## Testing the API

### 1. Generate a Demo JWT Token

Save this as `generate_token.py` and run:

```python
import base64, json
header = {"alg": "none"}
payload = {"authemail": "alice@example.com", "authuserid": "123", "authroles": ["admin", "user"]}
def b64encode(data): return base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip("=")
token = f"{b64encode(header)}.{b64encode(payload)}.sig"
print(token)
```

Run:
```bash
python3 generate_token.py
```
Copy the output token.

### 2. Call the API

Save this as `call_people_api.py`:

```python
import base64, json, requests
header = {"alg": "none"}
payload = {"authemail": "alice@example.com", "authuserid": "123", "authroles": ["admin", "user"]}
def b64encode(data): return base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip("=")
token = f"{b64encode(header)}.{b64encode(payload)}.sig"
url = "https://vfelb1btn8.execute-api.us-east-1.amazonaws.com/Prod/people/"
headers = {"Authorization": token}
response = requests.get(url, headers=headers)
print("Status:", response.status_code)
print("Response headers:", response.headers)
print("Response body:", response.text)
```

Install requests if needed:
```bash
pip install requests
```

Run:
```bash
python3 call_people_api.py
```

Or use curl:
```bash
curl -H "Authorization: <PASTE_TOKEN_HERE>" "https://vfelb1btn8.execute-api.us-east-1.amazonaws.com/Prod/people/"
```

---

## Local Testing (Optional)

Start the local API:
```bash
sam local start-api
```

Call the local endpoint (default: http://127.0.0.1:3000/people/) with the same Authorization header.

---

## Logs

- In AWS Console, go to CloudWatch Logs.
- Find log groups for both the authorizer and people Lambda functions.
- Look for your request’s logs to confirm flow and context.

---

## Cleanup

To avoid AWS charges:
```bash
sam delete
```

---

## Notes
- The Lambda authorizer expects a JWT-like token (header.payload.signature) with a base64-encoded JSON payload.
- The people Lambda returns custom headers based on the authorizer context.

---

For questions or issues, open an issue or contact the maintainer.
# sam-app-authorizer

