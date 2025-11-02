import base64
import json

# JWT header and payload
header = {"alg": "none"}
payload = {
    "authemail": "alice@example.com",
    "authuserid": "123",
    "authroles": ["admin", "user"]
}

def b64encode(data):
    return base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip("=")

header_b64 = b64encode(header)
payload_b64 = b64encode(payload)
signature = "sig"

token = f"{header_b64}.{payload_b64}.{signature}"
print(token)
