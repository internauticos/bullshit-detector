
// Publisher blacklist utility for checking untrustworthy domains

let blacklistedDomains: Set<string> | null = null;

export const loadPublisherBlacklist = async (): Promise<Set<string>> => {
  if (blacklistedDomains) {
    return blacklistedDomains;
  }

  try {
    const response = await fetch('/untrustworthy-publishers.txt');
    if (!response.ok) {
      throw new Error(`Failed to fetch blacklist: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('🔍 Raw blacklist file content:', text);
    
    blacklistedDomains = new Set(
      text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#')) // Remove empty lines and comments
        .map(domain => domain.toLowerCase())
    );
    
    console.log(`✅ Loaded ${blacklistedDomains.size} blacklisted publisher domains:`, Array.from(blacklistedDomains));
    return blacklistedDomains;
  } catch (error) {
    console.error('❌ Failed to load publisher blacklist:', error);
    blacklistedDomains = new Set(); // Return empty set on error
    return blacklistedDomains;
  }
};

export const isPublisherBlacklisted = async (url: string): Promise<boolean> => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    console.log(`🔍 Checking URL: ${url}`);
    console.log(`🔍 Extracted hostname: ${hostname}`);
    
    const blacklist = await loadPublisherBlacklist();
    console.log('🔍 Current blacklist:', Array.from(blacklist));
    
    // Check both with and without www prefix
    const hostnameWithoutWww = hostname.replace(/^www\./, '');
    const hostnameWithWww = hostname.startsWith('www.') ? hostname : `www.${hostname}`;
    
    console.log(`🔍 Checking variants: ${hostname}, ${hostnameWithoutWww}, ${hostnameWithWww}`);
    
    const isBlacklisted = blacklist.has(hostname) || 
                         blacklist.has(hostnameWithoutWww) || 
                         blacklist.has(hostnameWithWww);
    
    console.log(`${isBlacklisted ? '🚨' : '✅'} Domain ${hostname} ${isBlacklisted ? 'IS' : 'is NOT'} blacklisted`);
    
    // Additional debug: Check each variant individually
    console.log(`🔍 hostname "${hostname}" in blacklist:`, blacklist.has(hostname));
    console.log(`🔍 hostnameWithoutWww "${hostnameWithoutWww}" in blacklist:`, blacklist.has(hostnameWithoutWww));
    console.log(`🔍 hostnameWithWww "${hostnameWithWww}" in blacklist:`, blacklist.has(hostnameWithWww));
    
    return isBlacklisted;
  } catch (error) {
    console.error('Error checking publisher blacklist:', error);
    return false;
  }
};

export const getBlacklistReason = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Provide specific reasons for known categories
    if (hostname.includes('postillon')) {
      return '🎭 SATIRICAL NEWS SITE - Der Postillon is a German satire website, content is parody/humor, not real news';
    }
    if (hostname.includes('onion')) {
      return '🎭 SATIRICAL NEWS SITE - The Onion is a satirical news website, content is parody/humor, not real news';
    }
    if (hostname.includes('infowars') || hostname.includes('naturalnews')) {
      return '🚨 CONSPIRACY WEBSITE - Known for spreading misinformation and conspiracy theories';
    }
    if (hostname.includes('clickhole') || hostname.includes('reductress')) {
      return '🃏 PARODY CONTENT - Satirical/comedy content not intended as real news';
    }
    
    return '⚠️ UNTRUSTWORTHY PUBLISHER - Domain appears on blacklist of unreliable news sources';
  } catch {
    return '⚠️ UNTRUSTWORTHY PUBLISHER - Domain appears on blacklist of unreliable news sources';
  }
};
