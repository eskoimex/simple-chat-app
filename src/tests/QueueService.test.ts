import { QueueService } from "../services/QueueService";
import { QueueEntry } from "../models/QueueEntry";

describe("QueueService", () => {
  let queueService: QueueService;

  beforeEach(() => {
    queueService = new QueueService();
  });

  it("should add a customer to the queue and get the queue with position", () => {
    queueService.addToQueue("customerA");
    queueService.addToQueue("customerB");

    const queue: QueueEntry[] = queueService.getQueue();

    expect(queue.length).toBe(2);
    expect(queue[0].customerId).toBe("customerA");
    expect(queue[0].position).toBe(1);
    expect(queue[1].customerId).toBe("customerB");
    expect(queue[1].position).toBe(2);
  });

  it("should retrieve the list of customers in the queue with their position and timestamp", () => {
    queueService.addToQueue("customerA");
    queueService.addToQueue("customerB");

    const queue = queueService.getQueue();
    expect(queue.length).toBe(2);
    expect(queue[0].customerId).toBe("customerA");
    expect(queue[1].customerId).toBe("customerB");
    expect(queue[0].position).toBe(1);
    expect(queue[1].position).toBe(2);

    // Check timestamps
    expect(queue[0].timestamp).toBeDefined();
    expect(queue[1].timestamp).toBeDefined();
  });
});
