
export const fetchContentWithProxies = async (url: string): Promise<string> => {
  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    `https://cors-proxy.htmldriven.com/?url=${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`,
    `https://crossorigin.me/${url}`,
    `https://cors-anywhere.herokuapp.com/${url}`
  ];
  
  let htmlContent = '';
  
  // Try each proxy service
  for (const proxyUrl of proxies) {
    try {
      console.log('Trying proxy:', proxyUrl);
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.7,de;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br',
          'Referer': 'https://www.google.com/',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'cross-site'
        }
      });
      
      if (response.ok) {
        const responseData = await response.text();
        
        // Handle different proxy response formats
        if (proxyUrl.includes('allorigins.win')) {
          const jsonData = JSON.parse(responseData);
          htmlContent = jsonData.contents || '';
        } else {
          htmlContent = responseData;
        }
        
        console.log('Successfully fetched content, length:', htmlContent.length);
        if (htmlContent.length > 100) {
          break;
        }
      }
    } catch (error) {
      console.log('Proxy failed:', error);
      continue;
    }
  }
  
  return htmlContent;
};
