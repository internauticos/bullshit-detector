
# Developer Documentation

## Architecture Overview

The Bullshit Detector is a client-side React application that analyzes web content for credibility. The architecture follows a modular approach with clear separation of concerns.

### Core Components

#### 1. Content Analysis Pipeline

**File**: `src/utils/contentAnalyzer.ts`

The main analysis function that orchestrates the entire process:

```typescript
analyzeContent(url: string, language: 'en' | 'de'): Promise<AnalysisResult>
```

**Process Flow**:
1. Fetch content using proxy services
2. Parse HTML and extract structured data
3. Perform bullshit analysis
4. Return formatted results

#### 2. Content Fetching

**File**: `src/utils/contentFetcher.ts`

Handles fetching content from URLs with CORS workarounds:
- Multiple proxy services for reliability
- Fallback mechanisms
- Error handling for blocked content

#### 3. Content Extraction

**File**: `src/utils/contentExtractor.ts`

Extracts meaningful content from HTML:
- Main text content
- Headlines (H1-H6)
- Paragraph structure
- Links and metadata
- Image analysis

#### 4. Bullshit Analysis Engine

**File**: `src/utils/bullshitAnalyzer.ts`

Core analysis logic that evaluates:
- Content quality indicators
- Source credibility
- Language patterns
- Structural analysis
- Publisher reputation

#### 5. URL Analysis

**File**: `src/utils/urlAnalyzer.ts`

Fallback analysis when content can't be fetched:
- Domain reputation checking
- URL pattern analysis
- Publisher blacklist checking

### State Management

#### Language Context

**File**: `src/contexts/LanguageContext.tsx`

Manages:
- Current language selection (en/de)
- Translation functions
- Persistent language preference

#### Voting System

**File**: `src/utils/votingStorage.ts`

Local storage based system for:
- User feedback collection
- Accuracy statistics
- Community-adjusted ratings

### UI Components

#### Main Components

1. **BullshitDetector** - Main application component
2. **ResultCard** - Displays analysis results
3. **VotingSection** - User feedback interface
4. **VotingStats** - Community statistics display
5. **LanguageSelector** - Language switching

#### UI Library

Uses shadcn/ui components for consistent design:
- Form components (Input, Button, Select)
- Display components (Card, Badge, Alert)
- Feedback components (Toast, Dialog)

### Analysis Algorithms

#### Credibility Scoring

The system uses multiple factors to determine credibility:

1. **Content Quality** (30% weight)
   - Text length and structure
   - Grammar and spelling
   - Paragraph organization

2. **Source Indicators** (25% weight)
   - Author information
   - Publication date
   - Contact information
   - About page presence

3. **Language Analysis** (20% weight)
   - Emotional language detection
   - Clickbait patterns
   - Sensationalism indicators

4. **Publisher Reputation** (25% weight)
   - Domain age and authority
   - Blacklist checking
   - Social media presence

#### Scoring Formula

```typescript
bullshitRating = Math.round(
  (contentScore * 0.3) + 
  (sourceScore * 0.25) + 
  (languageScore * 0.2) + 
  (publisherScore * 0.25)
);
```

### Data Flow

```
User Input (URL)
      ↓
Content Fetcher
      ↓
Content Extractor
      ↓
Analysis Engine
      ↓
Results Display
      ↓
User Feedback
      ↓
Storage & Stats
```

### Error Handling

The application implements graceful degradation:

1. **Content Fetch Failure**: Falls back to URL-only analysis
2. **Parsing Errors**: Uses partial content analysis
3. **Analysis Failures**: Provides generic safety warnings
4. **Network Issues**: Cached results and retry mechanisms

### Performance Considerations

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Expensive calculations cached
- **Debounced Input**: Prevents excessive API calls
- **Progressive Enhancement**: Works without JavaScript

### Security

- **CORS Handling**: Uses proxy services for cross-origin requests
- **Input Sanitization**: All user inputs are sanitized
- **XSS Prevention**: React's built-in protections
- **No Data Collection**: Privacy-first approach

### Testing Strategy

#### Unit Tests
- Utility functions
- Analysis algorithms
- Content extraction logic

#### Integration Tests
- Component interactions
- Context providers
- Storage mechanisms

#### E2E Tests
- Complete user workflows
- Cross-browser compatibility
- Mobile responsiveness

### Browser Compatibility

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Progressive Enhancement**: Basic functionality in older browsers

### Deployment

#### Build Process
```bash
npm run build
```

Creates optimized production build in `dist/` directory.

#### Environment Variables

No environment variables required for basic functionality.

#### Static Hosting

The application is fully static and can be hosted on:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any CDN service

### Monitoring & Analytics

Currently implements:
- Console logging for debugging
- Error boundary for crash reporting
- Performance timing logs

Future considerations:
- Error tracking service integration
- Usage analytics
- Performance monitoring

### API Design

While currently client-side only, the analysis logic is designed to be easily extracted into API endpoints:

```typescript
// Future API endpoints
POST /api/analyze
GET /api/stats
POST /api/feedback
```

### Internationalization

The i18n system supports:
- UI text translation
- Analysis language adaptation
- Regional content patterns
- Cultural context awareness

### Accessibility

- **WCAG 2.1 AA compliance**
- **Keyboard navigation**
- **Screen reader support**
- **High contrast mode**
- **Reduced motion support**
