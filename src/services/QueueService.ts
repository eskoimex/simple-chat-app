import { QueueEntry } from "../models/QueueEntry";

export class QueueService {
  private queue: QueueEntry[] = [];

  addToQueue(customerId: string): void {
    const position = this.queue.length + 1;
    const entry: QueueEntry = { customerId, timestamp: new Date(), position };
    this.queue.push(entry);
  }

  getQueue(): QueueEntry[] {
    return this.queue;
  }
}
