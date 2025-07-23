import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// In-memory storage for demo - same users as in users.ts
let users: any[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "password123", // In production, this should be hashed
    firstName: "ผู้ดูแลระบบ",
    lastName: "หลัก",
    bio: "ผู้ดูแลระบบแชท",
    isOnline: true,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  },
  {
    id: 2,
    username: "user1",
    email: "user1@example.com",
    password: "password123",
    firstName: "สมชาย", 
    lastName: "ใจดี",
    bio: "ผู้ใช้งานทั่วไป",
    isOnline: false,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  }
];

const authSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = authSchema.parse(req.body);
    
    // Find user by username
    const user = users.find(u => u.username === validatedData.username);
    
    if (!user || user.password !== validatedData.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Update last activity and online status
    user.lastActivity = new Date().toISOString();
    user.isOnline = true;
    
    // Return user without password
    const { password, ...safeUser } = user;
    return res.status(200).json(safeUser);
    
  } catch (error) {
    console.error('Auth Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors 
      });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
}