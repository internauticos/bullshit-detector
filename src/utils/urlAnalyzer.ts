
import { AnalysisScore } from '@/types/analysis';
import { isPublisherBlacklisted, getBlacklistReason } from './publisherBlacklist';

export const extractTitleFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/').filter(seg => seg.length > 0);
    const lastSegment = segments[segments.length - 1] || '';
    
    // Clean up the URL segment to make it readable
    return lastSegment
      .replace(/[-_]/g, ' ')
      .replace(/\.(html|htm|php|aspx?)$/i, '')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim() || 'Article from ' + urlObj.hostname;
  } catch {
    return 'Unknown Article';
  }
};

export const performUrlOnlyAnalysis = async (url: string): Promise<AnalysisScore> => {
  const redFlags = [];
  let bullshitScore = 0;
  
  console.log('Performing URL-only analysis for:', url);
  
  // PUBLISHER BLACKLIST CHECK - HIGHEST PRIORITY - Check first!
  console.log('🚨 URL-only analysis: Checking publisher blacklist...');
  const isBlacklisted = await isPublisherBlacklisted(url);
  if (isBlacklisted) {
    bullshitScore += 60; // Heavy penalty for blacklisted publishers
    const blacklistReason = getBlacklistReason(url);
    redFlags.push(blacklistReason);
    console.log('🚨 BLACKLISTED PUBLISHER DETECTED in URL-only analysis:', blacklistReason);
    
    // For blacklisted publishers, we can return early with high confidence
    return {
      verdict: 'bullshit' as const,
      confidence: 90, // High confidence for blacklisted sites even in URL-only mode
      bullshitRating: Math.min(100, bullshitScore + 40),
      reasons: [blacklistReason, 'Domain found on untrustworthy publishers blacklist']
    };
  }
  
  // Continue with regular URL analysis if not blacklisted...
  
  // Domain analysis
  const urlBullshitPatterns = [
    { pattern: /\.tk$|\.ml$|\.ga$|\.cf$|\.pw$|\.top$/i, score: 40, reason: 'Suspicious free domain extension' },
    { pattern: /news-?\w*\d+\.com|real\w*news|truth\w*news|fake\w*news/i, score: 35, reason: 'Suspicious news-style domain name' },
    { pattern: /\d{4,}\.com$|\w+\d{3,}\.com$/i, score: 30, reason: 'Random numeric domain name' },
    { pattern: /wordpress\.com|blogspot\.com|medium\.com\/[^\/]*$/i, score: 15, reason: 'Personal blog platform' },
    { pattern: /\.info$|\.biz$|\.click$/i, score: 20, reason: 'Lower-trust domain extension' }
  ];
  
  const credibleDomains = [
    { pattern: /bbc\.com|cnn\.com|reuters\.com|ap\.org|npr\.org/i, score: -25, reason: 'Established mainstream news source' },
    { pattern: /nytimes\.com|washingtonpost\.com|wsj\.com|guardian\.com|theguardian\.com/i, score: -25, reason: 'Reputable newspaper' },
    { pattern: /economist\.com|time\.com|newsweek\.com|politico\.com|axios\.com/i, score: -20, reason: 'Known credible publication' },
    { pattern: /\.gov$|\.edu$|\.org$/i, score: -15, reason: 'Institutional domain' },
    { pattern: /tagesschau\.de|spiegel\.de|zeit\.de|sueddeutsche\.de|faz\.net/i, score: -20, reason: 'Reputable German news source' }
  ];
  
  // Check URL patterns
  urlBullshitPatterns.forEach(({ pattern, score, reason }) => {
    if (pattern.test(url)) {
      bullshitScore += score;
      redFlags.push(reason);
    }
  });
  
  credibleDomains.forEach(({ pattern, score, reason }) => {
    if (pattern.test(url)) {
      bullshitScore += score;
      redFlags.push(reason);
    }
  });
  
  // URL structure analysis
  if (url.includes('clickbait') || url.includes('viral') || url.includes('shocking')) {
    bullshitScore += 25;
    redFlags.push('URL contains clickbait-style keywords');
  }
  
  if (url.match(/\?utm_|&utm_|facebook|twitter|social/)) {
    bullshitScore += 10;
    redFlags.push('URL shows social media tracking (viral spread pattern)');
  }
  
  // Final scoring
  const bullshitRating = Math.max(0, Math.min(100, bullshitScore + 50));
  const isBullshit = bullshitRating > 60;
  const confidence = Math.min(80, Math.max(40, Math.abs(bullshitScore) + 50)); // Lower confidence for URL-only
  
  return {
    verdict: isBullshit ? 'bullshit' as const : 'ok' as const,
    confidence,
    bullshitRating,
    reasons: redFlags.length > 0 ? redFlags.slice(0, 4) : ['Limited analysis based on URL only']
  };
};
