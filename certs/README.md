# Custom SSL Certificates

Place your SSL certificate files in this directory to use them with NGINX Proxy Manager.

## File Structure

For each domain, you'll need:
- `yourdomain.com.crt` - Your SSL certificate (or fullchain)
- `yourdomain.com.key` - Your private key
- `yourdomain.com.ca.crt` - (Optional) Certificate Authority bundle/intermediate certificates

## Using Certificates in NPM

### Option 1: Via UI (Recommended)
1. Go to http://localhost:81
2. Navigate to SSL Certificates → Add SSL Certificate → Custom
3. Upload your certificate and key files
4. Apply to your proxy hosts

### Option 2: Direct File Access
The certificates in this directory are mounted at `/etc/nginx/certs` inside the container (read-only).

## Example Files

```
certs/
├── example.com.crt
├── example.com.key
├── example.com.ca.crt
└── README.md
```

## Security Notes

- Keep `.key` files secure and never commit them to git
- Consider adding `certs/*.key` and `certs/*.crt` to `.gitignore`
- Certificates are mounted read-only for security
