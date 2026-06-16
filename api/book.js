process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const N8N_URL = process.env.VITE_BOOK_URL || 'https://n8n.srv1711190.hstgr.cloud/webhook/b91d7ddb-0f62-4b38-96d3-fd43f6a644e1';

export default async function handler(req, res) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString();

    const qs = req.url?.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const response = await fetch(N8N_URL + qs, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body || undefined,
    });
    const text = await response.text();
    res.status(200).send(text);
  } catch (e) {
    res.status(502).json({ error: 'Failed to book: ' + (e?.message || e) });
  }
}
