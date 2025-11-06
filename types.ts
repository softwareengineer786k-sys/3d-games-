export interface Mission {
  title: string;
  objective: string;
  location: string;
  reward: number;
}

export interface ChatMessage {
  sender: string;
  text: string;
  isUser: boolean;
}