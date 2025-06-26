
export interface ExtractedContent {
  mainText: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  };
  paragraphs: string[];
  links: string[];
  imageAlts: string[];
  metaDescription?: string;
  keywords?: string;
}

export const extractMainContent = (doc: Document): string => {
  // Remove script, style, and ad elements
  const unwantedElements = doc.querySelectorAll('script, style, nav, header, footer, aside, .ad, .advertisement, .popup, .modal');
  unwantedElements.forEach(el => el.remove());
  
  // Try to find main content areas in order of preference
  const contentSelectors = [
    'main article',
    'article',
    'main',
    '[role="main"]',
    '.post-content',
    '.article-content', 
    '.entry-content',
    '.content-body',
    '.story-body',
    '.article-body',
    '.post-body',
    'body'
  ];
  
  for (const selector of contentSelectors) {
    const element = doc.querySelector(selector) as HTMLElement;
    if (element && element.textContent && element.textContent.length > 200) {
      return element.textContent.trim();
    }
  }
  
  return doc.body?.textContent?.trim() || '';
};

export const extractStructuredContent = (doc: Document): ExtractedContent => {
  // Remove unwanted elements first
  const unwantedElements = doc.querySelectorAll('script, style, nav, header, footer, aside, .ad, .advertisement, .popup, .modal, .comments, .comment');
  unwantedElements.forEach(el => el.remove());
  
  // Find main content area
  const contentSelectors = [
    'main article',
    'article',
    'main',
    '[role="main"]',
    '.post-content',
    '.article-content', 
    '.entry-content',
    '.content-body',
    '.story-body',
    '.article-body',
    '.post-body'
  ];
  
  let contentArea: HTMLElement = doc.body;
  for (const selector of contentSelectors) {
    const element = doc.querySelector(selector) as HTMLElement;
    if (element && element.textContent && element.textContent.length > 200) {
      contentArea = element;
      break;
    }
  }
  
  // Extract headings
  const headings = {
    h1: Array.from(contentArea.querySelectorAll('h1')).map(h => h.textContent?.trim() || '').filter(Boolean),
    h2: Array.from(contentArea.querySelectorAll('h2')).map(h => h.textContent?.trim() || '').filter(Boolean),
    h3: Array.from(contentArea.querySelectorAll('h3')).map(h => h.textContent?.trim() || '').filter(Boolean),
    h4: Array.from(contentArea.querySelectorAll('h4')).map(h => h.textContent?.trim() || '').filter(Boolean),
    h5: Array.from(contentArea.querySelectorAll('h5')).map(h => h.textContent?.trim() || '').filter(Boolean),
    h6: Array.from(contentArea.querySelectorAll('h6')).map(h => h.textContent?.trim() || '').filter(Boolean)
  };
  
  // Extract paragraphs
  const paragraphs = Array.from(contentArea.querySelectorAll('p'))
    .map(p => p.textContent?.trim() || '')
    .filter(text => text.length > 20); // Filter out very short paragraphs
  
  // Extract links (for credibility checking)
  const links = Array.from(contentArea.querySelectorAll('a[href]'))
    .map(a => a.getAttribute('href') || '')
    .filter(href => href.startsWith('http'))
    .slice(0, 20); // Limit to first 20 links
  
  // Extract image alt texts
  const imageAlts = Array.from(contentArea.querySelectorAll('img[alt]'))
    .map(img => img.getAttribute('alt') || '')
    .filter(Boolean);
  
  // Extract meta description
  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  // Extract keywords
  const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
  
  // Get main text content
  const mainText = contentArea.textContent?.trim() || '';
  
  return {
    mainText,
    headings,
    paragraphs,
    links,
    imageAlts,
    metaDescription,
    keywords
  };
};
