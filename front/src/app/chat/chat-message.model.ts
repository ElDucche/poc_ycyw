import { z } from 'zod';

// Define the schema for a chat message
export const ChatMessageSchema = z.object({
  id: z.string(),
  sender: z.string(),
  content: z.string(),
  timestamp: z.string().datetime(),
});

// Infer the TypeScript type from the schema
export type ChatMessage = z.infer<typeof ChatMessageSchema>;