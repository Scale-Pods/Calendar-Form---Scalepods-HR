process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const N8N_URL = process.env.VITE_SLOTS_URL || 'https://n8n.srv1711190.hstgr.cloud/webhook/78709684-d30a-4cdb-9ada-61653ea2f5e';

export default async function handler(req, res) {
  try {
    const qs = req.url?.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const response = await fetch(N8N_URL + qs);
    const text = await response.text();
    res.status(200).send(text);
  } catch (e) {
    res.status(502).json({ error: 'Failed to fetch slots: ' + (e?.message || e) });
  }
}
