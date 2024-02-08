import cheerio from 'cheerio';


export async function POST(req) {
  let reqBody = await req.json();
  const response1 = await fetch('https://www.cosmetic-info.jp/jcln/result.php', {
    method: 'POST',
    headers: {
      'Allow-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/121.0.0.0',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Cookie': '_ga=GA1.1.1750206488.1707273743; PHPSESSID=b880f5bfa9df8576c400716ebc0efc7a;',
      'Cookie': '_ga=GA1.1.1750206488.1707273743; PHPSESSID=b880f5bfa9df8576c400716ebc0efc7a;',
      'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-CN;q=0.5',
      'Origin': 'https://www.cosmetic-info.jp',
      'Referer': 'https://www.cosmetic-info.jp/jcln/index.php',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
    },
    body: new URLSearchParams(reqBody).toString(),
  });
  if (!response1.ok) {
    throw new Error(`Failed to fetch: ${externalApiResponse.statusText}`);
  }
  // Read the response body as text to get the HTML content
  const htmlText1 = await response1.text();
  // get text in the first div with class un_wba lg_only
  const $1 = cheerio.load(htmlText1);
  const text1 = $1('td.un_wba.lg_only').text();

  const response2 = await fetch(`https://www.cosdna.com/cht/stuff.php?q=${text1}`)
  if (!response2.ok) {
    throw new Error(`Failed to fetch: ${externalApiResponse.statusText}`);
  }
  const htmlText2 = await response2.text();
  const $2 = cheerio.load(htmlText2);
  // get text in a tag of second td in table
  const text2 = $2('td').eq(1).find('a').text();
  
  return new Response(JSON.stringify({
    eng: text1,
    material: text2,
  }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}