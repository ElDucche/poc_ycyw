import { z } from 'zod';

// Define the schema for a chat message
export const ChatMessageSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  sender: z.string(),
  isFromUser: z.boolean(),
});

// Infer the TypeScript type from the schema
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
