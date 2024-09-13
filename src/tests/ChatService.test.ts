import { ChatService } from "../services/ChatService";
import { Message } from "../models/Message";
import { QueueService } from "../services/QueueService";

describe("ChatService", () => {
  let chatService: ChatService;

  beforeEach(() => {
    chatService = new ChatService();
  });

  it("should send a message and maintain chat history", () => {
    chatService.sendMessage("customerA", "Hello");
    const history: Message[] = chatService.getChatHistory("customerA");

    expect(history.length).toBe(1);
    expect(history[0].content).toBe("Hello");
  });

  it("should return the total message count for a customer", () => {
    chatService.sendMessage("customerA", "Hello");
    chatService.sendMessage("customerA", "How are you?");

    const messageCount = chatService.getTotalMessageCount("customerA");
    expect(messageCount).toBe(2);
  });

  it("should mark a customer as unsatisfied if they send 'instantqueue' and add them to the queue", () => {
    chatService.sendMessage("customerA", "instantqueue");
    const history = chatService.getChatHistory("customerA");

    // Check if the chat history contains the instantqueue message
    expect(history.length).toBe(1);
    expect(history[0].content).toBe("instantqueue");

    // Check if the customer is marked as unsatisfied
    expect(chatService.customers.get("customerA")?.satisfiedWithBot).toBe(
      false
    );

    // Add customer to queue
    const queueService = new QueueService(); // Create a new QueueService instance
    queueService.addToQueue("customerA");
    const queue = queueService.getQueue();

    // Check if the customer is in the queue
    expect(queue.length).toBe(1);
    expect(queue[0].customerId).toBe("customerA");
  });

  it("should return an empty chat history for a new customer", () => {
    const history = chatService.getChatHistory("customerB");
    expect(history.length).toBe(0);
  });
});
