// import { ChatService } from '../services/ChatService';
// import { StatsService } from '../services/StatsService';

// describe("StatsService", () => {
//   it("should calculate the satisfaction rate", () => {
//     const chatService = new ChatService();
//     const statsService = new StatsService(chatService);

//     chatService.sendMessage("customer1", "Hello!");
//     chatService.sendMessage("customer2", "Help");
//     chatService.markCustomerUnsatisfied("customer2");

//     expect(statsService.getSatisfactionRate()).toBe(50);
//   });
// });

import { ChatService } from "../services/ChatService";
import { StatsService } from "../services/StatsService";

describe("StatsService", () => {
  let chatService: ChatService;
  let statsService: StatsService;

  beforeEach(() => {
    chatService = new ChatService();
    statsService = new StatsService(chatService);
  });

  it("should return 0% satisfaction rate when there are no customers", () => {
    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(0); // Edge case: no customers
  });

  it("should return 100% satisfaction rate when all customers are satisfied", () => {
    chatService.sendMessage("customer1", "Hello!");
    chatService.sendMessage("customer2", "Hi!");

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(100); // Edge case: all customers satisfied
  });

  it("should return 0% satisfaction rate when all customers are unsatisfied", () => {
    chatService.sendMessage("customer1", "Hello!");
    chatService.sendMessage("customer2", "Help");
    chatService.markCustomerUnsatisfied("customer1");
    chatService.markCustomerUnsatisfied("customer2");

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(0); // Edge case: all customers unsatisfied
  });

  it("should calculate the satisfaction rate for mixed satisfaction", () => {
    chatService.sendMessage("customer1", "Hello!");
    chatService.sendMessage("customer2", "Help");
    chatService.markCustomerUnsatisfied("customer2");

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(50); // Mixed satisfaction: 1 satisfied, 1 unsatisfied
  });

  it("should return 0% satisfaction rate when there are customers but none are satisfied", () => {
    chatService.sendMessage("customer1", "Hello!");
    chatService.markCustomerUnsatisfied("customer1");

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(0); // Edge case: one customer unsatisfied
  });
});
