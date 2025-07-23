import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// In-memory storage for demo
let users: any[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
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
    firstName: "สมชาย",
    lastName: "ใจดี",
    bio: "ผู้ใช้งานทั่วไป",
    isOnline: false,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  }
];

const userSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
  bio: z.string().optional(),
  avatar: z.string().optional(),
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

  try {
    if (req.method === 'GET') {
      const { endpoint } = req.query;
      
      if (endpoint === 'count') {
        return res.status(200).json({ count: users.length });
      }
      
      // Return users without passwords
      const safeUsers = users.map(({ password, ...user }) => user);
      return res.status(200).json(safeUsers);
    }

    if (req.method === 'POST') {
      const validatedData = userSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUser = users.find(u => 
        u.username === validatedData.username || u.email === validatedData.email
      );
      
      if (existingUser) {
        return res.status(400).json({ 
          message: 'Username or email already exists' 
        });
      }
      
      const newUser = {
        id: users.length + 1,
        ...validatedData,
        isOnline: true,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      };
      
      users.push(newUser);
      
      // Return user without password
      const { password, ...safeUser } = newUser;
      return res.status(201).json(safeUser);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors 
      });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
}