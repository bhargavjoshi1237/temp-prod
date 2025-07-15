// worker.jsx
// Logic to fetch and extract book info from abc.nl HTML

export async function fetchAbcHtml() {
  console.log('[fetchAbcHtml] Fetching HTML from https://abc.nl/');
  const response = await fetch("https://abc.nl/", {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-ch-ua": '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    referrer: "https://abc.nl",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include"
  });
  console.log('[fetchAbcHtml] Response status:', response.status);
  const html = await response.text();
  console.log('[fetchAbcHtml] HTML length:', html.length);
  return html;
}


export function extractBooksFromHtml(html) {
  console.log('[extractBooksFromHtml] Parsing HTML...');
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const anchors = doc.querySelectorAll('a.book-detail-link');
  console.log('[extractBooksFromHtml] Found anchors:', anchors.length);
  const books = [];
  anchors.forEach((anchor, idx) => {
    const title = anchor.querySelector('h6.sort-title')?.textContent?.trim() || '';
    const image = anchor.querySelector('img')?.getAttribute('src') || '';
    const author = anchor.querySelector('span.sort-author')?.textContent?.trim() || '';
    const bookType = anchor.querySelector('p')?.childNodes[2]?.textContent?.trim() || '';
    const price = anchor.querySelector('span.sort-price')?.textContent?.trim() || '';
    const book = { title, image, author, bookType, price };
    console.log(`[extractBooksFromHtml] Book ${idx}:`, book);
    books.push(book);
  });
  console.log('[extractBooksFromHtml] Total books extracted:', books.length);
  return books;
}
