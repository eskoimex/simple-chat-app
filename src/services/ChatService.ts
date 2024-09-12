// import { Customer, Message } from "../models/Message";
import { Customer } from "../models/Customer";
import { Message } from "../models/Message";

export class ChatService {
  public customers: Map<string, Customer> = new Map();

  sendMessage(customerId: string, content: string): void {
    const customer = this.customers.get(customerId) || {
      id: customerId,
      chatHistory: [],
      satisfiedWithBot: true,
    };
    const message: Message = { customerId, content, timestamp: new Date() };
    customer.chatHistory.push(message);
    this.customers.set(customerId, customer);
  }

  getChatHistory(customerId: string): Message[] {
    return this.customers.get(customerId)?.chatHistory || [];
  }

  getTotalMessageCount(customerId: string): number {
    return this.getChatHistory(customerId).length;
  }

  markCustomerUnsatisfied(customerId: string): void {
    const customer = this.customers.get(customerId);
    if (customer) {
      customer.satisfiedWithBot = false;
    }
  }
}
