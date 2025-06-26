
#!/bin/sh

echo "🚀 Starting Bullshit Detector with SSL support..."

# Run SSL setup
/usr/local/bin/ssl-setup.sh

# Set up certificate renewal cron job (runs twice daily)
echo "0 12 * * * /usr/bin/certbot renew --quiet && /usr/sbin/nginx -s reload" > /var/spool/cron/crontabs/root

# Start cron daemon
crond

# Test nginx configuration
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    echo "🌐 Starting nginx with SSL support..."
    
    # Start nginx
    exec nginx -g "daemon off;"
else
    echo "❌ Nginx configuration error"
    exit 1
fi
