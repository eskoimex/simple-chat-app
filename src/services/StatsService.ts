import { ChatService } from "./ChatService";
import { QueueService } from "./QueueService";

export class StatsService {
  constructor(
    private chatService: ChatService,
    private queueService: QueueService
  ) {}

  getSatisfactionRate(): number {
    // Get the total number of customers who requested to join the queue
    const totalQueueRequests = this.queueService.getQueue().length;

    // If no customers are in the queue, return 0
    if (totalQueueRequests === 0) return 0;

    // Get the IDs of customers currently in the queue
    const queueCustomerIds = new Set(
      this.queueService.getQueue().map((entry) => entry.customerId)
    );

    // Count how many of those customers are satisfied with the bot response
    const satisfiedQueueCustomers = Array.from(
      this.chatService.customers.values()
    ).filter(
      (customer) =>
        customer.satisfiedWithBot && queueCustomerIds.has(customer.id)
    ).length;

    // Calculate the satisfaction rate as a percentage
    return (satisfiedQueueCustomers / totalQueueRequests) * 100;
  }
}
