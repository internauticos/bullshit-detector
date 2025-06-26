
# Bullshit Detector 🚨

An AI-powered web application that analyzes news articles and content for potential misinformation, bias, and credibility issues. The detector crawls webpages and examines headlines, content quality, sources, and credibility indicators to help users make informed decisions about the information they consume.

## Features

- **AI Content Analysis**: Advanced analysis of news articles using multiple credibility indicators
- **Multilingual Support**: Available in English and German with language-specific analysis
- **Community Feedback**: User voting system to improve AI accuracy over time
- **Real-time Results**: Instant analysis with confidence ratings and detailed explanations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Privacy Focused**: No data collection, analysis happens in real-time

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **TanStack Query** for data fetching and caching
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

**OR**

- Docker and Docker Compose (for containerized deployment)

### Local Development (Node.js)

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd bullshit-detector
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Docker Deployment

#### Quick Start with Docker

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd bullshit-detector
```

2. Make the startup script executable:
```bash
chmod +x docker-start.sh
```

3. Start the application:

**For Development:**
```bash
./docker-start.sh dev
```
Application will be available at `http://localhost:5173`

**For Production:**
```bash
./docker-start.sh prod
```
Application will be available at `http://localhost:3000`

#### Docker Commands

```bash
# Start development environment
./docker-start.sh dev

# Start production environment
./docker-start.sh prod

# Stop all containers
./docker-start.sh stop

# View logs
./docker-start.sh logs

# Clean up Docker resources
./docker-start.sh clean
```

#### Manual Docker Commands

**Development:**
```bash
docker-compose --profile dev up --build
```

**Production:**
```bash
docker-compose up --build -d bullshit-detector
```

**Stop containers:**
```bash
docker-compose down
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## How It Works

1. **URL Input**: Users paste a news article URL
2. **Content Fetching**: The system attempts to fetch and parse the webpage content
3. **AI Analysis**: Multiple analysis layers examine:
   - Content structure and quality
   - Source credibility indicators
   - Language patterns and bias detection
   - Publisher reputation
4. **Results Display**: Users receive a bullshit rating (1-5) with detailed explanations
5. **Community Feedback**: Users can vote on accuracy to improve the system

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── contexts/           # React contexts (Language, etc.)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and analysis logic
└── lib/                # Library configurations
```

## Docker Configuration

The project includes several Docker-related files:

- `Dockerfile` - Production build configuration
- `Dockerfile.dev` - Development environment configuration
- `docker-compose.yml` - Multi-service orchestration
- `nginx.conf` - Production web server configuration
- `docker-start.sh` - Convenience script for Docker operations
- `.dockerignore` - Files to exclude from Docker build context

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

The project can be deployed using various methods:

### Static Hosting
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Docker Deployment
- **Local**: Use Docker Compose for local deployment
- **VPS/Cloud**: Deploy Docker containers to any cloud provider
- **Kubernetes**: Use the Docker images in Kubernetes clusters

## Support

If you encounter any issues or have questions:

1. Check the [Developer Documentation](DEVELOPER.md)
2. Look through existing GitHub issues
3. Create a new issue with detailed information

## Roadmap

- [ ] Support for more languages
- [ ] Enhanced AI analysis models
- [ ] Browser extension
- [ ] API endpoints for third-party integration
- [ ] Mobile app versions
- [ ] Kubernetes deployment configurations

