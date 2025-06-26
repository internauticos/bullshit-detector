
#!/bin/bash

# Docker startup script for Bullshit Detector

echo "🚨 Starting Bullshit Detector..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Function to use docker-compose or docker compose
docker_compose_cmd() {
    if command -v docker-compose &> /dev/null; then
        docker-compose "$@"
    else
        docker compose "$@"
    fi
}

# Create necessary directories for SSL
create_ssl_dirs() {
    mkdir -p docker-data/letsencrypt
    mkdir -p docker-data/certbot
    echo "📁 Created SSL directories"
}

# Parse command line arguments
case "$1" in
    "dev")
        echo "🔧 Starting development environment..."
        docker_compose_cmd --profile dev up --build
        ;;
    "prod")
        echo "🚀 Starting production environment..."
        docker_compose_cmd up --build -d bullshit-detector
        echo "✅ Application is running at http://localhost:3000"
        ;;
    "ssl")
        echo "🔐 Starting SSL-enabled production environment..."
        create_ssl_dirs
        
        # Check for required environment variables
        if [ -z "$DOMAIN" ]; then
            echo "⚠️  DOMAIN environment variable not set. Using localhost."
            export DOMAIN="localhost"
        fi
        
        if [ -z "$EMAIL" ]; then
            echo "⚠️  EMAIL environment variable not set. Using admin@localhost."
            export EMAIL="admin@localhost"
        fi
        
        echo "🌐 Domain: $DOMAIN"
        echo "📧 Email: $EMAIL"
        
        docker_compose_cmd --profile ssl up --build -d bullshit-detector-ssl
        echo "✅ SSL Application is running at:"
        echo "   HTTP:  http://localhost (redirects to HTTPS)"
        echo "   HTTPS: https://localhost"
        echo ""
        echo "📝 Note: For production, set DOMAIN and EMAIL environment variables:"
        echo "   export DOMAIN=yourdomain.com"
        echo "   export EMAIL=your@email.com"
        echo "   ./docker-start.sh ssl"
        ;;
    "stop")
        echo "🛑 Stopping all containers..."
        docker_compose_cmd down
        ;;
    "logs")
        echo "📋 Showing logs..."
        docker_compose_cmd logs -f
        ;;
    "clean")
        echo "🧹 Cleaning up Docker resources..."
        docker_compose_cmd down --volumes --rmi all
        docker system prune -f
        ;;
    "renew-ssl")
        echo "🔄 Renewing SSL certificates..."
        docker exec bullshit-detector-ssl certbot renew
        docker exec bullshit-detector-ssl nginx -s reload
        echo "✅ SSL certificates renewed"
        ;;
    *)
        echo "Usage: $0 {dev|prod|ssl|stop|logs|clean|renew-ssl}"
        echo ""
        echo "Commands:"
        echo "  dev       - Start development environment (http://localhost:5173)"
        echo "  prod      - Start production environment (http://localhost:3000)"
        echo "  ssl       - Start SSL-enabled production environment (https://localhost)"
        echo "  stop      - Stop all containers"
        echo "  logs      - Show container logs"
        echo "  clean     - Clean up all Docker resources" 
        echo "  renew-ssl - Manually renew SSL certificates"
        echo ""
        echo "SSL Environment Variables:"
        echo "  DOMAIN    - Your domain name (default: localhost)"
        echo "  EMAIL     - Your email for Let's Encrypt (default: admin@localhost)"
        echo ""
        echo "Example for production SSL:"
        echo "  export DOMAIN=yourdomain.com"
        echo "  export EMAIL=your@email.com"
        echo "  ./docker-start.sh ssl"
        exit 1
        ;;
esac
