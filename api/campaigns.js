import https from 'https';

const N8N_URL = process.env.VITE_ROLE_URL;
const agent = new https.Agent({ rejectUnauthorized: false });

export default async function handler(req, res) {
  try {
    const response = await fetch(N8N_URL, { agent });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Failed to fetch campaigns' });
  }
}
