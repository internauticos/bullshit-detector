
#!/bin/sh

# SSL Setup Script for Let's Encrypt

DOMAIN=${DOMAIN:-localhost}
EMAIL=${EMAIL:-admin@localhost}

echo "🔐 Setting up SSL for domain: $DOMAIN"

# Check if domain is localhost (for development)
if [ "$DOMAIN" = "localhost" ] || [ "$DOMAIN" = "127.0.0.1" ]; then
    echo "🚧 Development mode detected - creating self-signed certificate"
    
    # Create self-signed certificate for localhost
    mkdir -p /etc/letsencrypt/live/cert
    
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/letsencrypt/live/cert/privkey.pem \
        -out /etc/letsencrypt/live/cert/fullchain.pem \
        -subj "/C=US/ST=Development/L=Local/O=Bullshit Detector/CN=localhost"
    
    echo "✅ Self-signed certificate created for development"
    return 0
fi

echo "🌐 Production mode - setting up Let's Encrypt certificate"

# Check if certificate already exists
if [ -f "/etc/letsencrypt/live/cert/fullchain.pem" ]; then
    echo "✅ SSL certificate already exists"
    return 0
fi

# Create certificate directory
mkdir -p /etc/letsencrypt/live/cert

# Initial certificate request
echo "📜 Requesting SSL certificate from Let's Encrypt..."

certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --domains $DOMAIN

# Check if certificate was created successfully
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    # Link certificates to expected location
    ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/cert/fullchain.pem
    ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem /etc/letsencrypt/live/cert/privkey.pem
    
    echo "✅ SSL certificate successfully obtained and linked"
else
    echo "❌ Failed to obtain SSL certificate"
    echo "🚧 Falling back to self-signed certificate"
    
    # Create self-signed certificate as fallback
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/letsencrypt/live/cert/privkey.pem \
        -out /etc/letsencrypt/live/cert/fullchain.pem \
        -subj "/C=US/ST=Production/L=Fallback/O=Bullshit Detector/CN=$DOMAIN"
    
    echo "⚠️  Self-signed certificate created as fallback"
fi
