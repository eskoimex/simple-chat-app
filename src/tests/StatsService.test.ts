import { ChatService } from '../services/ChatService';
import { StatsService } from '../services/StatsService';

describe("StatsService", () => {
  it("should calculate the satisfaction rate", () => {
    const chatService = new ChatService();
    const statsService = new StatsService(chatService);

    chatService.sendMessage("customer1", "Hello!");
    chatService.sendMessage("customer2", "Help");
    chatService.markCustomerUnsatisfied("customer2");

    expect(statsService.getSatisfactionRate()).toBe(50);
  });
});