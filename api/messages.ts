import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// In-memory storage for demo (in production, use a database)
let messages: any[] = [
  {
    id: 1,
    content: "สวัสดีครับ! ยินดีต้อนรับสู่แชทแอป",
    username: "Admin",
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    content: "ระบบพร้อมใช้งานแล้วครับ",
    username: "System",
    userId: 2,
    createdAt: new Date().toISOString(),
  }
];

const messageSchema = z.object({
  content: z.string().min(1, "Content is required"),
  username: z.string().min(1, "Username is required"),
  userId: z.number(),
  attachmentUrl: z.string().optional(),
  attachmentType: z.enum(['image', 'file', 'gif']).optional(),
  attachmentName: z.string().optional(),
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
      const limit = parseInt(req.query.limit as string) || 100;
      const sortedMessages = messages
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .slice(-limit);
      
      return res.status(200).json(sortedMessages);
    }

    if (req.method === 'POST') {
      const validatedData = messageSchema.parse(req.body);
      
      const newMessage = {
        id: messages.length + 1,
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      messages.push(newMessage);
      return res.status(201).json(newMessage);
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      const messageId = parseInt(id as string);
      
      const messageIndex = messages.findIndex(m => m.id === messageId);
      if (messageIndex === -1) {
        return res.status(404).json({ message: 'Message not found' });
      }

      const { content } = req.body;
      messages[messageIndex] = {
        ...messages[messageIndex],
        content,
        updatedAt: new Date().toISOString(),
      };

      return res.status(200).json(messages[messageIndex]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      const messageId = parseInt(id as string);
      
      const messageIndex = messages.findIndex(m => m.id === messageId);
      if (messageIndex === -1) {
        return res.status(404).json({ message: 'Message not found' });
      }

      messages.splice(messageIndex, 1);
      return res.status(204).end();
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}