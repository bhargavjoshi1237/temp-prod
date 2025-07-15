// abc-server.js
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.get('/books', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://abc.nl/', { waitUntil: 'networkidle2' });
  const books = await page.evaluate(() => {
    const anchors = document.querySelectorAll('a.book-detail-link');
    return Array.from(anchors).map(anchor => ({
      title: anchor.querySelector('h6.sort-title')?.textContent?.trim() || '',
      image: anchor.querySelector('img')?.getAttribute('src') || '',
      author: anchor.querySelector('span.sort-author')?.textContent?.trim() || '',
      bookType: anchor.querySelector('p')?.childNodes[2]?.textContent?.trim() || '',
      price: anchor.querySelector('span.sort-price')?.textContent?.trim() || '',
    }));
  });
  await browser.close();
  res.json(books);
});

app.listen(3001, () => console.log('ABC server running on port 3001'));