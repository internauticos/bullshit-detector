import { AnalysisScore } from '@/types/analysis';
import { ExtractedContent } from './contentExtractor';
import { isPublisherBlacklisted, getBlacklistReason } from './publisherBlacklist';

export const performBullshitAnalysis = async (title: string, content: string, url: string, doc: Document): Promise<AnalysisScore> => {
  const redFlags = [];
  const credibilityIndicators = [];
  let bullshitScore = 0;
  
  console.log('🔍 Starting comprehensive bullshit analysis for:', url);
  
  // PUBLISHER BLACKLIST CHECK - HIGHEST PRIORITY - Check first!
  console.log('🚨 Checking publisher blacklist...');
  const isBlacklisted = await isPublisherBlacklisted(url);
  if (isBlacklisted) {
    bullshitScore += 60; // Even higher penalty for blacklisted publishers
    const blacklistReason = getBlacklistReason(url);
    redFlags.push(blacklistReason);
    console.log('🚨 BLACKLISTED PUBLISHER DETECTED:', blacklistReason);
    
    // For blacklisted publishers, we can return early with high confidence
    return {
      verdict: 'bullshit' as const,
      confidence: 95, // Very high confidence for blacklisted sites
      bullshitRating: Math.min(100, bullshitScore + 50),
      reasons: [blacklistReason, 'Domain found on untrustworthy publishers blacklist']
    };
  }
  
  // Continue with rest of analysis if not blacklisted...
  
  // TITLE ANALYSIS - Heavy weight on sensational headlines
  const titleBullshitPatterns = [
    { pattern: /BREAKING|URGENT|SHOCKING|UNBELIEVABLE|AMAZING|INCREDIBLE|MIRACLE/i, score: 25, reason: 'Sensationalized headline with clickbait language' },
    { pattern: /!!+|MUST READ|YOU WON'T BELIEVE|DOCTORS HATE/i, score: 20, reason: 'Excessive punctuation and attention-grabbing phrases' },
    { pattern: /EXPOSED|REVEALED|SECRET|HIDDEN TRUTH|THEY DON'T WANT YOU/i, score: 20, reason: 'Conspiracy-style language in headline' },
    { pattern: /\d+\s+(REASONS|WAYS|TRICKS|SECRETS)/i, score: 15, reason: 'Listicle-style clickbait headline' },
    { pattern: /DESTROYS|SLAMS|OBLITERATES|ANNIHILATES/i, score: 15, reason: 'Overly aggressive language in headline' }
  ];
  
  titleBullshitPatterns.forEach(({ pattern, score, reason }) => {
    if (pattern.test(title)) {
      bullshitScore += score;
      redFlags.push(reason);
    }
  });
  
  // URL/DOMAIN ANALYSIS
  const urlBullshitPatterns = [
    { pattern: /\.tk$|\.ml$|\.ga$|\.cf$|\.pw$/i, score: 30, reason: 'Suspicious free domain extension' },
    { pattern: /news-?\w*\d+\.com|real\w*news|truth\w*news/i, score: 25, reason: 'Fake news site pattern in domain' },
    { pattern: /\d{4,}\.com$|\w+\d{3,}\.com$/i, score: 20, reason: 'Suspicious numeric or random domain name' },
    { pattern: /wordpress\.com|blogspot\.com|medium\.com\/[^\/]*$/i, score: 10, reason: 'Personal blog platform (less editorial oversight)' }
  ];
  
  const credibleDomains = [
    { pattern: /bbc\.com|cnn\.com|reuters\.com|ap\.org|npr\.org/i, score: -20, reason: 'Established mainstream news source' },
    { pattern: /nytimes\.com|washingtonpost\.com|wsj\.com|guardian\.com/i, score: -20, reason: 'Reputable newspaper website' },
    { pattern: /economist\.com|time\.com|newsweek\.com|politico\.com/i, score: -15, reason: 'Known credible news publication' },
    { pattern: /\.gov$|\.edu$/i, score: -15, reason: 'Government or educational institution' }
  ];
  
  urlBullshitPatterns.forEach(({ pattern, score, reason }) => {
    if (pattern.test(url)) {
      bullshitScore += score;
      redFlags.push(reason);
    }
  });
  
  credibleDomains.forEach(({ pattern, score, reason }) => {
    if (pattern.test(url)) {
      bullshitScore += score;
      credibilityIndicators.push(reason);
    }
  });
  
  // CONTENT QUALITY ANALYSIS
  if (content.length < 300) {
    bullshitScore += 20;
    redFlags.push('Extremely short article with minimal substance');
  } else if (content.length < 500) {
    bullshitScore += 10;
    redFlags.push('Very brief article lacking depth');
  }
  
  // Check for excessive capitalization
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.15) {
    bullshitScore += 25;
    redFlags.push('Excessive use of capital letters (screaming text)');
  } else if (capsRatio > 0.1) {
    bullshitScore += 15;
    redFlags.push('High use of capital letters');
  }
  
  // Emotional manipulation detection
  const emotionalBullshitWords = [
    /OUTRAGEOUS|DISGUSTING|HORRIFIC|TERRIFYING|DEVASTATING/gi,
    /SCANDAL|BETRAYAL|CONSPIRACY|COVER.?UP|DEEP STATE/gi,
    /LIBERAL|CONSERVATIVE|DEMOCRAT|REPUBLICAN.*(?:DESTROY|ATTACK|HATE)/gi,
    /BIG PHARMA|MAINSTREAM MEDIA|FAKE NEWS|DEEP STATE/gi
  ];
  
  let emotionalCount = 0;
  emotionalBullshitWords.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) emotionalCount += matches.length;
  });
  
  if (emotionalCount > 8) {
    bullshitScore += 25;
    redFlags.push('Heavy use of emotional manipulation and polarizing language');
  } else if (emotionalCount > 4) {
    bullshitScore += 15;
    redFlags.push('Moderate use of emotional and sensational language');  
  }
  
  // Source and credibility indicators
  const credibilityPatterns = [
    /according to.*(?:study|research|report|survey)/gi,
    /peer.?reviewed|published in.*journal/gi,
    /expert.*(?:says|explains|notes|states)/gi,
    /data (?:shows|indicates|suggests|reveals)/gi,
    /statistics.*(?:show|indicate|suggest)/gi
  ];
  
  let credibilityCount = 0;
  credibilityPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) credibilityCount += matches.length;
  });
  
  if (credibilityCount > 3) {
    bullshitScore -= 20;
    credibilityIndicators.push('Multiple references to studies, experts, and data');
  } else if (credibilityCount > 0) {
    bullshitScore -= 10;
    credibilityIndicators.push('Some references to credible sources');
  }
  
  // Date and source citation check
  const hasDates = /\b(?:19|20)\d{2}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/gi.test(content);
  const hasSources = /source:|via |courtesy of|photo by|image:|credit:/gi.test(content);
  
  if (hasDates && hasSources) {
    bullshitScore -= 15;
    credibilityIndicators.push('Article includes proper dating and source citations');
  } else if (hasDates || hasSources) {
    bullshitScore -= 8;
    credibilityIndicators.push('Some dating or source information present');
  }
  
  // Grammar and coherence check (basic)
  const grammarIssues = [
    /\b(?:there|their|they're)\s+(?:are|is)\s+(?:there|their|they're)\b/gi,
    /\b(?:your|you're)\s+(?:going|gonna)\s+(?:your|you're)\b/gi,
    /[.!?]{3,}/g,
    /\s{3,}/g
  ];
  
  let grammarErrors = 0;
  grammarIssues.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) grammarErrors += matches.length;
  });
  
  if (grammarErrors > 5) {
    bullshitScore += 20;
    redFlags.push('Multiple grammar errors and poor writing quality');
  } else if (grammarErrors > 2) {
    bullshitScore += 10;
    redFlags.push('Some grammar and formatting issues');
  }
  
  // Check for author and publication info
  const hasAuthor = doc.querySelector('[class*="author"], [class*="byline"], [rel="author"]') !== null;
  const hasPublishDate = doc.querySelector('[class*="date"], [class*="time"], time') !== null;
  
  if (hasAuthor && hasPublishDate) {
    bullshitScore -= 10;
    credibilityIndicators.push('Article has clear authorship and publication date');
  } else if (!hasAuthor && !hasPublishDate) {
    bullshitScore += 15;
    redFlags.push('No clear author or publication date information');
  }
  
  // Final scoring and verdict
  const bullshitRating = Math.max(0, Math.min(100, bullshitScore + 50)); // Normalize to 0-100
  const isBullshit = bullshitRating > 65;
  const confidence = Math.min(95, Math.max(60, Math.abs(bullshitScore) + 65));
  
  console.log('Analysis complete:', { bullshitScore, bullshitRating, isBullshit, confidence });
  
  return {
    verdict: isBullshit ? 'bullshit' as const : 'ok' as const,
    confidence,
    bullshitRating,
    reasons: isBullshit ? redFlags.slice(0, 5) : credibilityIndicators.slice(0, 5)
  };
};

export const performStructuredBullshitAnalysis = async (title: string, structuredContent: ExtractedContent, url: string, doc: Document): Promise<AnalysisScore> => {
  const redFlags = [];
  const credibilityIndicators = [];
  let bullshitScore = 0;
  
  console.log('🔍 Starting structured bullshit analysis for:', url);
  
  // PUBLISHER BLACKLIST CHECK - HIGHEST PRIORITY - Check first!
  console.log('🚨 Checking publisher blacklist...');
  const isBlacklisted = await isPublisherBlacklisted(url);
  if (isBlacklisted) {
    bullshitScore += 60; // Heavy penalty for blacklisted publishers
    const blacklistReason = getBlacklistReason(url);
    redFlags.push(blacklistReason);
    console.log('🚨 BLACKLISTED PUBLISHER DETECTED:', blacklistReason);
    
    // For blacklisted publishers, we can return early with high confidence
    return {
      verdict: 'bullshit' as const,
      confidence: 95, // Very high confidence for blacklisted sites
      bullshitRating: Math.min(100, bullshitScore + 50),
      reasons: [blacklistReason, 'Domain found on untrustworthy publishers blacklist']
    };
  }
  
  // Continue with structured analysis if not blacklisted...
  
  console.log('Structured content:', {
    headingCounts: Object.entries(structuredContent.headings).map(([level, headings]) => `${level}: ${headings.length}`),
    paragraphCount: structuredContent.paragraphs.length,
    linkCount: structuredContent.links.length
  });
  
  // HEADING STRUCTURE ANALYSIS
  const allHeadings = [
    ...structuredContent.headings.h1,
    ...structuredContent.headings.h2,
    ...structuredContent.headings.h3,
    ...structuredContent.headings.h4,
    ...structuredContent.headings.h5,
    ...structuredContent.headings.h6
  ];
  
  // Check for clickbait patterns in headings
  const clickbaitPatterns = [
    /\d+\s+(REASONS|WAYS|TRICKS|SECRETS|THINGS)/i,
    /YOU WON'T BELIEVE|SHOCKING|AMAZING|INCREDIBLE/i,
    /DOCTORS HATE|ONE WEIRD TRICK|WHAT HAPPENS NEXT/i
  ];
  
  let clickbaitHeadings = 0;
  allHeadings.forEach(heading => {
    clickbaitPatterns.forEach(pattern => {
      if (pattern.test(heading)) {
        clickbaitHeadings++;
      }
    });
  });
  
  if (clickbaitHeadings > 2) {
    bullshitScore += 20;
    redFlags.push('Multiple clickbait-style headings detected');
  } else if (clickbaitHeadings > 0) {
    bullshitScore += 10;
    redFlags.push('Some clickbait elements in headings');
  }
  
  // Check heading hierarchy (good articles have proper structure)
  const hasH1 = structuredContent.headings.h1.length > 0;
  const hasMultipleH1 = structuredContent.headings.h1.length > 1;
  const hasSubheadings = structuredContent.headings.h2.length > 0 || structuredContent.headings.h3.length > 0;
  
  if (!hasH1) {
    bullshitScore += 15;
    redFlags.push('Missing main headline (H1)');
  } else if (hasMultipleH1) {
    bullshitScore += 10;
    redFlags.push('Multiple H1 tags (poor HTML structure)');
  }
  
  if (hasSubheadings && structuredContent.paragraphs.length > 5) {
    bullshitScore -= 10;
    credibilityIndicators.push('Well-structured article with proper headings');
  }
  
  // PARAGRAPH ANALYSIS
  const shortParagraphs = structuredContent.paragraphs.filter(p => p.length < 100).length;
  const longParagraphs = structuredContent.paragraphs.filter(p => p.length > 500).length;
  
  if (structuredContent.paragraphs.length < 3) {
    bullshitScore += 20;
    redFlags.push('Very few paragraphs - lacks depth');
  } else if (shortParagraphs / structuredContent.paragraphs.length > 0.7) {
    bullshitScore += 15;
    redFlags.push('Most paragraphs are very short - superficial content');
  }
  
  if (longParagraphs > 0 && structuredContent.paragraphs.length > 5) {
    bullshitScore -= 5;
    credibilityIndicators.push('Contains detailed paragraphs with substance');
  }
  
  // LINK ANALYSIS
  const externalLinks = structuredContent.links.filter(link => !link.includes(new URL(url).hostname));
  const credibleSources = externalLinks.filter(link => 
    /\.(gov|edu|org)\//.test(link) || 
    /(bbc|reuters|ap|nytimes|washingtonpost|wsj|guardian|economist|time|newsweek|politico)\.com/.test(link)
  );
  
  if (credibleSources.length > 2) {
    bullshitScore -= 15;
    credibilityIndicators.push('Multiple references to credible external sources');
  } else if (credibleSources.length > 0) {
    bullshitScore -= 8;
    credibilityIndicators.push('Some references to credible sources');
  }
  
  if (externalLinks.length === 0 && structuredContent.paragraphs.length > 5) {
    bullshitScore += 15;
    redFlags.push('No external sources cited in substantial article');
  }
  
  // Check for self-promotional links
  const selfLinks = structuredContent.links.filter(link => link.includes(new URL(url).hostname));
  if (selfLinks.length > externalLinks.length && selfLinks.length > 3) {
    bullshitScore += 10;
    redFlags.push('Excessive self-referential links vs external sources');
  }
  
  // META INFORMATION ANALYSIS
  if (structuredContent.metaDescription && structuredContent.metaDescription.length > 50) {
    bullshitScore -= 5;
    credibilityIndicators.push('Proper meta description present');
  }
  
  // IMAGE ANALYSIS
  const suspiciousImageAlts = structuredContent.imageAlts.filter(alt => 
    /click|buy|amazing|shocking|incredible/i.test(alt)
  ).length;
  
  if (suspiciousImageAlts > 0) {
    bullshitScore += 10;
    redFlags.push('Promotional or clickbait image descriptions');
  }
  
  // Apply original analysis to main content
  const originalAnalysis = await performBullshitAnalysis(title, structuredContent.mainText, url, doc);
  
  // Combine scores (weighted average)
  const combinedScore = Math.round((bullshitScore * 0.3) + (originalAnalysis.bullshitRating * 0.7));
  const finalBullshitRating = Math.max(0, Math.min(100, combinedScore));
  
  // Combine reasons
  const allRedFlags = [...redFlags, ...originalAnalysis.reasons.filter(r => originalAnalysis.verdict === 'bullshit')];
  const allCredibilityIndicators = [...credibilityIndicators, ...originalAnalysis.reasons.filter(r => originalAnalysis.verdict === 'ok')];
  
  const isBullshit = finalBullshitRating > 65;
  const confidence = Math.min(95, Math.max(60, Math.abs(finalBullshitRating - 50) + 65));
  
  console.log('Structured analysis complete:', { 
    structuredScore: bullshitScore, 
    originalScore: originalAnalysis.bullshitRating,
    finalBullshitRating, 
    isBullshit, 
    confidence 
  });
  
  return {
    verdict: isBullshit ? 'bullshit' as const : 'ok' as const,
    confidence,
    bullshitRating: finalBullshitRating,
    reasons: isBullshit ? allRedFlags.slice(0, 6) : allCredibilityIndicators.slice(0, 6)
  };
};
