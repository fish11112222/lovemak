import type { VercelRequest, VercelResponse } from '@vercel/node';

// Default theme for demo
const defaultTheme = {
  id: 1,
  name: "Default",
  primaryColor: "#3b82f6",
  secondaryColor: "#e5e7eb", 
  backgroundColor: "#ffffff",
  messageBackgroundSelf: "#3b82f6",
  messageBackgroundOther: "#f3f4f6",
  textColor: "#000000",
  isActive: true,
  createdAt: new Date().toISOString(),
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json(defaultTheme);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}