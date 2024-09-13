import { ChatService } from "../services/ChatService";
import { StatsService } from "../services/StatsService";
import { QueueService } from "../services/QueueService";

describe("StatsService", () => {
  let chatService: ChatService;
  let queueService: QueueService;
  let statsService: StatsService;

  beforeEach(() => {
    chatService = new ChatService();
    queueService = new QueueService();
    statsService = new StatsService(chatService, queueService);
  });

  it("should return 0 satisfaction rate when no customers requested to join the queue", () => {
    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(0); // Expecting 0 since no customers are in the queue
  });

  it("should return 0 satisfaction rate when all customers in queue are unsatisfied", () => {
    chatService.sendMessage("customerA", "Hello");
    chatService.markCustomerUnsatisfied("customerA");
    queueService.addToQueue("customerA"); // Add unsatisfied customer to queue

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(0); // Expecting 0 as the only customer in the queue is unsatisfied
  });

  it("should return 100 satisfaction rate when all customers in queue are satisfied", () => {
    chatService.sendMessage("customerB", "Hi");
    queueService.addToQueue("customerB"); // Add satisfied customer to queue

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(100); // Expecting 100 since the only customer in the queue is satisfied
  });

  it("should return correct satisfaction rate when there are satisfied and unsatisfied customers", () => {
    // Setting up customers
    chatService.sendMessage("customerC", "How can I help you?");
    chatService.markCustomerUnsatisfied("customerC"); // Unsatisfied

    chatService.sendMessage("customerD", "Great service!");
    queueService.addToQueue("customerC"); // Unsatisfied customer in queue
    queueService.addToQueue("customerD"); // Satisfied customer in queue

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(50); // Expecting 50% since 1 satisfied and 1 unsatisfied
  });

  it("should handle multiple customers correctly with a mix of satisfied and unsatisfied statuses", () => {
    chatService.sendMessage("customerE", "I am happy!");
    chatService.markCustomerUnsatisfied("customerE"); // Unsatisfied

    chatService.sendMessage("customerF", "Everything is good!");
    queueService.addToQueue("customerE"); // Unsatisfied in queue
    queueService.addToQueue("customerF"); // Satisfied in queue

    const satisfactionRate = statsService.getSatisfactionRate();
    expect(satisfactionRate).toBe(50); // Expecting 50% since 1 satisfied and 1 unsatisfied
  });

  it("should calculate the satisfaction rate correctly when there are satisfied and unsatisfied customers in the queue", () => {
    // Customer 1 and 2 are satisfied, customer 3 is unsatisfied
    chatService.sendMessage("customer1", "Hello");
    queueService.addToQueue("customer1");

    chatService.sendMessage("customer2", "Hi there");
    queueService.addToQueue("customer2");

    chatService.sendMessage("customer3", "instantqueue");
    queueService.addToQueue("customer3");

    // Calculate the satisfaction rate
    const satisfactionRate = statsService.getSatisfactionRate();

    // Expecting 66.67% since 2 satisfied out of 3 in the queue
    expect(satisfactionRate).toBeCloseTo(66.67, 2); // Use 2 decimal places for precision
  });
});
