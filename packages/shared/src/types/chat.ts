export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  title?: string;
  event_id?: string;
  created_at: string;
  last_message?: {
    content: string;
    sender_id: string;
    created_at: string;
  };
  unread_count?: number;
  participants: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
    is_online?: boolean;
  }[];
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
  content: string;
  created_at: string;
}
