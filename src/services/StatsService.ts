import { ChatService } from "./ChatService";

export class StatsService {
  constructor(private chatService: ChatService) {}

  getSatisfactionRate(): number {
    const totalCustomers = Array.from(this.chatService.customers.values());
    const satisfiedCustomers = totalCustomers.filter(
      (customer) => customer.satisfiedWithBot
    ).length;
    const queueCustomers = totalCustomers.filter(
      (customer) => !customer.satisfiedWithBot
    ).length;

    if (totalCustomers.length === 0) return 0;

    return (satisfiedCustomers / totalCustomers.length) * 100;
  }
}
