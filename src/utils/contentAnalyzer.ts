
import { AnalysisResult } from '@/types/analysis';
import { fetchContentWithProxies } from './contentFetcher';
import { extractMainContent, extractStructuredContent } from './contentExtractor';
import { performStructuredBullshitAnalysis } from './bullshitAnalyzer';
import { performUrlOnlyAnalysis, extractTitleFromUrl } from './urlAnalyzer';

export const analyzeContent = async (url: string, language: 'en' | 'de' = 'en'): Promise<AnalysisResult> => {
  try {
    console.log('Starting comprehensive analysis for:', url, 'in language:', language);
    
    const htmlContent = await fetchContentWithProxies(url);
    
    // If we couldn't fetch content, perform URL-based analysis only
    if (!htmlContent || htmlContent.length < 100) {
      console.log('No content fetched, performing URL-only analysis');
      const urlAnalysis = await performUrlOnlyAnalysis(url);
      return {
        url,
        title: extractTitleFromUrl(url),
        verdict: urlAnalysis.verdict,
        confidence: urlAnalysis.confidence,
        reasons: urlAnalysis.reasons,
        timestamp: new Date(),
        bullshitRating: urlAnalysis.bullshitRating
      };
    }
    
    // Parse HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract title
    const title = doc.querySelector('title')?.textContent || extractTitleFromUrl(url);
    console.log('Extracted title:', title);
    
    // Extract structured content for comprehensive analysis
    const structuredContent = extractStructuredContent(doc);
    console.log('Extracted structured content:', {
      mainTextLength: structuredContent.mainText.length,
      headingsTotal: Object.values(structuredContent.headings).flat().length,
      paragraphs: structuredContent.paragraphs.length,
      links: structuredContent.links.length
    });
    
    // Perform comprehensive structured bullshit analysis
    const analysis = await performStructuredBullshitAnalysis(title, structuredContent, url, doc);
    
    return {
      url,
      title: title.trim(),
      verdict: analysis.verdict,
      confidence: analysis.confidence,
      reasons: analysis.reasons,
      timestamp: new Date(),
      bullshitRating: analysis.bullshitRating
    };
  } catch (error) {
    console.error('Error analyzing content:', error);
    
    // Fallback to URL-only analysis if everything fails
    console.log('Performing fallback URL-only analysis');
    const urlAnalysis = await performUrlOnlyAnalysis(url);
    return {
      url,
      title: extractTitleFromUrl(url),
      verdict: urlAnalysis.verdict,
      confidence: Math.max(30, urlAnalysis.confidence - 20), // Lower confidence for fallback
      reasons: [...urlAnalysis.reasons, language === 'de' ? 'Analyse aufgrund von Zugriffsbeschränkungen begrenzt' : 'Analysis limited due to content access restrictions'],
      timestamp: new Date(),
      bullshitRating: urlAnalysis.bullshitRating
    };
  }
};
