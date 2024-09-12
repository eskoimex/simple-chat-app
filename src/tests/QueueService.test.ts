import { QueueService } from "../services/QueueService";

describe("QueueService", () => {
  it("should add customer to queue and get queue with position", () => {
    const queueService = new QueueService();
    queueService.addToQueue("customer1");
    const queue = queueService.getQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].position).toBe(1);
  });
});
