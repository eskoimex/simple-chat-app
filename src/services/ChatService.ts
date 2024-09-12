import { Customer, Message } from "../models";

export class ChatService {
  public customers: Map<string, Customer> = new Map();

  sendMessage(customerId: string, content: string): void {
    if (!customerId || !content || content.trim() === "") {
      throw new Error("Invalid customerId or empty message content");
    }

    // Ensure message content doesn't exceed a certain length
    if (content.length > 1000) {
      throw new Error("Message content is too long");
    }

    let customer = this.customers.get(customerId);

    if (!customer) {
      // If customer doesn't exist, initialize a new one
      customer = {
        id: customerId,
        chatHistory: [],
        satisfiedWithBot: true,
      };
    }

    const message: Message = { customerId, content, timestamp: new Date() };

    // Prevent duplicate consecutive messages
    const lastMessage = customer.chatHistory[customer.chatHistory.length - 1];
    if (lastMessage && lastMessage.content === content) {
      throw new Error("Duplicate message detected");
    }

    customer.chatHistory.push(message);
    this.customers.set(customerId, customer);
  }

  getChatHistory(customerId: string): Message[] {
    if (!customerId) {
      throw new Error("Invalid customerId");
    }
    const customer = this.customers.get(customerId);
    return customer ? customer.chatHistory : [];
  }

  getTotalMessageCount(customerId: string): number {
    return this.getChatHistory(customerId).length;
  }

  markCustomerUnsatisfied(customerId: string): void {
    const customer = this.customers.get(customerId);
    if (customer) {
      customer.satisfiedWithBot = false;
    } else {
      throw new Error("Customer not found");
    }
  }
}
