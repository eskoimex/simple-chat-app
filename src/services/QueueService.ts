
import { QueueEntry } from "../models/QueueEntry";

export class QueueService {
  private queue: QueueEntry[] = [];
  private maxQueueSize: number = 1000; // Example limit, if needed

  addToQueue(customerId: string): void {
    if (!customerId || customerId.trim() === "") {
      throw new Error("Invalid customerId");
    }

    // Check for duplicates
    if (this.queue.some((entry) => entry.customerId === customerId)) {
      throw new Error("Customer is already in the queue");
    }

    // Check for maximum queue size
    if (this.queue.length >= this.maxQueueSize) {
      throw new Error("Queue is full");
    }

    const position = this.queue.length + 1;
    const entry: QueueEntry = { customerId, timestamp: new Date(), position };
    this.queue.push(entry);
  }

  getQueue(): QueueEntry[] {
    return this.queue;
  }

}
