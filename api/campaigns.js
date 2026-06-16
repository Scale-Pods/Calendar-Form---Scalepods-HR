process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const N8N_URL = process.env.VITE_ROLE_URL || 'https://n8n.srv1711190.hstgr.cloud/webhook/f1f73fff-1311-4fb6-8ed6-ea7efa1cb6c3?action=Roles';

export default async function handler(req, res) {
  try {
    const response = await fetch(N8N_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Failed to fetch campaigns: ' + (e?.message || e) });
  }
}
