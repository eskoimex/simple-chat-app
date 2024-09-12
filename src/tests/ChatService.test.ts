
import { ChatService } from "../services/ChatService";
import { QueueService } from "../services/QueueService"; // Import QueueService

describe("ChatService", () => {
  let chatService: ChatService;
  let queueService: QueueService; // Declare a QueueService instance

  beforeEach(() => {
    chatService = new ChatService();
    queueService = new QueueService(); // Initialize QueueService
  });

  it("should send and retrieve messages for a valid customer", () => {
    chatService.sendMessage("customer1", "Hello!");
    chatService.sendMessage("customer1", "How are you?");
    expect(chatService.getTotalMessageCount("customer1")).toBe(2);
    const chatHistory = chatService.getChatHistory("customer1");
    expect(chatHistory[0].content).toBe("Hello!");
    expect(chatHistory[1].content).toBe("How are you?");
  });

  it('should mark customer as unsatisfied and add to queue when "instantqueue" is sent', () => {
    const customerId = "customer2";

    chatService.sendMessage(customerId, "instantqueue");
    chatService.markCustomerUnsatisfied(customerId);
    queueService.addToQueue(customerId);

    const customer = chatService.customers.get(customerId);
    expect(customer?.satisfiedWithBot).toBe(false);

    const queue = queueService.getQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].customerId).toBe(customerId);
  });

  it("should throw error when sending message with empty content", () => {
    expect(() => chatService.sendMessage("customer1", "")).toThrowError(
      "Invalid customerId or empty message content"
    );
  });

  it("should throw error when sending message with only whitespace", () => {
    expect(() => chatService.sendMessage("customer1", "   ")).toThrowError(
      "Invalid customerId or empty message content"
    );
  });

  it("should throw error when sending a message with a null customerId", () => {
    expect(() =>
      chatService.sendMessage(null as unknown as string, "Hello!")
    ).toThrowError("Invalid customerId or empty message content");
  });

  it("should throw error when sending a message with too long content", () => {
    const longMessage = "a".repeat(1001); // 1001 characters
    expect(() =>
      chatService.sendMessage("customer1", longMessage)
    ).toThrowError("Message content is too long");
  });

  it("should throw error for duplicate consecutive messages", () => {
    chatService.sendMessage("customer1", "Hello!");
    expect(() => chatService.sendMessage("customer1", "Hello!")).toThrowError(
      "Duplicate message detected"
    );
  });

  it("should mark customer as unsatisfied", () => {
    chatService.sendMessage("customer1", "Hello!");
    chatService.markCustomerUnsatisfied("customer1");
    const customer = chatService.customers.get("customer1");
    expect(customer?.satisfiedWithBot).toBe(false);
  });

  it("should throw error when marking a non-existent customer as unsatisfied", () => {
    expect(() =>
      chatService.markCustomerUnsatisfied("nonExistentCustomer")
    ).toThrowError("Customer not found");
  });

  it("should return an empty chat history for a non-existent customer", () => {
    const chatHistory = chatService.getChatHistory("nonExistentCustomer");
    expect(chatHistory).toEqual([]);
  });

  it("should return zero message count for a non-existent customer", () => {
    const messageCount = chatService.getTotalMessageCount(
      "nonExistentCustomer"
    );
    expect(messageCount).toBe(0);
  });
});
