# Environment Variables Setup

This document explains the required environment variables for running the Donatale application.

## Required Variables

### DatoCMS Configuration

```env
# DatoCMS Content Delivery API tokens
# Get these from: DatoCMS Project > Settings > API tokens
DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN=your_published_content_token_here
DATOCMS_DRAFT_CONTENT_CDA_TOKEN=your_draft_content_token_here

# DatoCMS Content Management API token
# Used for server-side operations (creating donation events)
DATOCMS_CMA_TOKEN=your_cma_token_here
```

### Security Tokens

```env
# Secret token for protecting API routes
# Generate with: openssl rand -hex 32
SECRET_API_TOKEN=your_32_character_hex_string_here

# JWT secret for signing draft mode cookies
# Generate with: openssl rand -hex 32
SIGNED_COOKIE_JWT_SECRET=your_32_character_hex_string_here
```

### Email Configuration

```env
# Forward Email API key for sending notifications
# Get from: https://forwardemail.net/generate
FORWARD_EMAIL_API_KEY=your_forward_email_api_key_here

# Admin email for receiving donation notifications
ADMIN_EMAIL=admin@example.com
```

### Application Settings

```env
# Draft mode cookie name (can be customized)
DRAFT_MODE_COOKIE_NAME="__draftMode"
```

## Setup Instructions

### 1. Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

### 2. Generate Secure Tokens

```bash
# Generate SECRET_API_TOKEN
openssl rand -hex 32

# Generate SIGNED_COOKIE_JWT_SECRET
openssl rand -hex 32
```

### 3. Get DatoCMS Tokens

1. Go to your DatoCMS project
2. Navigate to **Settings** > **API tokens**
3. Copy the following tokens:
   - **CDA Only (Published)** → `DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN`
   - **CDA Only (Draft)** → `DATOCMS_DRAFT_CONTENT_CDA_TOKEN`
   - **CMA Only (Admin)** → `DATOCMS_CMA_TOKEN`

### 4. Configure Email (Optional)

If you want email notifications:

1. Sign up at [Forward Email](https://forwardemail.net)
2. Generate an API key
3. Add it to `FORWARD_EMAIL_API_KEY`
4. Set your admin email in `ADMIN_EMAIL`

### 5. Verify Configuration

```bash
# Start the development server
npm run dev

# Check for any environment-related errors
# The application should load at http://localhost:4321
```

## Environment-Specific Notes

### Development

- Use draft mode token to see unpublished content
- Enable hot reloading and error reporting
- Use local environment variables

### Production

- Use published content token only
- Ensure all secrets are properly set
- Enable caching and optimization

### Testing

- Use mock tokens for unit tests
- Use test environment variables
- Mock external services (email, DatoCMS)

## Troubleshooting

### Common Issues

1. **"Invalid API token" error**
   - Verify DatoCMS tokens are correct
   - Check token permissions (CDA vs CMA)

2. **"JWT secret not set" error**
   - Ensure `SIGNED_COOKIE_JWT_SECRET` is set
   - Generate a new secret if needed

3. **"Email sending failed" error**
   - Verify Forward Email API key
   - Check admin email format

### Debug Mode

To debug environment variable issues:

```bash
# List all environment variables
env | grep -E "(DATOCMS|SECRET|FORWARD|ADMIN)"

# Test DatoCMS connection
curl -H "Authorization: Bearer $DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN" \
     "https://graphql.datocms.com/"
```

## Security Best Practices

- Never commit `.env` files to version control
- Use different tokens for development and production
- Rotate tokens regularly
- Use strong, randomly generated secrets
- Limit token permissions to minimum required

## Support

If you encounter issues with environment setup:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [main documentation](../README.md)
3. Open an issue on GitHub
4. Contact the project maintainers
