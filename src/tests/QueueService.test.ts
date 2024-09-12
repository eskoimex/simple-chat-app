import { QueueService } from "../services/QueueService";

describe("QueueService", () => {
  let queueService: QueueService;

  beforeEach(() => {
    queueService = new QueueService();
  });

  it("should add customer to queue and assign the correct position", () => {
    queueService.addToQueue("customer1");
    const queue = queueService.getQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].position).toBe(1);
    expect(queue[0].customerId).toBe("customer1");
  });

  it("should assign correct positions to multiple customers", () => {
    queueService.addToQueue("customer1");
    queueService.addToQueue("customer2");
    const queue = queueService.getQueue();
    expect(queue.length).toBe(2);
    expect(queue[0].position).toBe(1);
    expect(queue[1].position).toBe(2);
  });

  it("should throw an error when adding the same customer twice", () => {
    queueService.addToQueue("customer1");
    expect(() => queueService.addToQueue("customer1")).toThrowError(
      "Customer is already in the queue"
    );
  });

  it("should throw an error for invalid customerId (null or empty)", () => {
    expect(() => queueService.addToQueue("")).toThrowError(
      "Invalid customerId"
    );
    expect(() =>
      queueService.addToQueue(null as unknown as string)
    ).toThrowError("Invalid customerId");
    expect(() => queueService.addToQueue("   ")).toThrowError(
      "Invalid customerId"
    );
  });

  it("should throw an error when queue exceeds the maximum size", () => {
    const maxQueueSize = 1000; // Adjust if maxQueueSize changes
    for (let i = 1; i <= maxQueueSize; i++) {
      queueService.addToQueue(`customer${i}`);
    }
    expect(() => queueService.addToQueue("customer1001")).toThrowError(
      "Queue is full"
    );
  });

  it("should return an empty array when the queue is empty", () => {
    const queue = queueService.getQueue();
    expect(queue).toEqual([]);
  });

});
