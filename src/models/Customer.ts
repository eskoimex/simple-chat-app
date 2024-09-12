import { Message } from "./Message";

export interface Customer {
  id: string;
  chatHistory: Message[];
  satisfiedWithBot: boolean;
}
