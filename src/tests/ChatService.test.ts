import { ChatService } from "../services/ChatService";

describe("ChatService", () => {
  it("should send and retrieve messages", () => {
    const chatService = new ChatService();
    chatService.sendMessage("customer1", "Hello!");
    chatService.sendMessage("customer1", "How are you?");
    expect(chatService.getTotalMessageCount("customer1")).toBe(2);
  });
});
