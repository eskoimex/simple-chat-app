// src/index.ts
import { ChatService } from "./services/ChatService";
import { QueueService } from "./services/QueueService";
import { StatsService } from "./services/StatsService";

const chatService = new ChatService();
const queueService = new QueueService();
const statsService = new StatsService(chatService);

// Simulate some chat interactions
chatService.sendMessage("customer1", "Hello, I need help with my order.");
chatService.sendMessage("customer2", "Can you help me with a return?");

// Simulate customer1 satisfaction
console.log(
  `Customer1 message count: ${chatService.getTotalMessageCount("customer1")}`
);

// Simulate customer2 is dissatisfied and joins queue
chatService.sendMessage("customer2", "instantqueue");
queueService.addToQueue("customer2");
chatService.markCustomerUnsatisfied("customer2");

// Retrieve queue
console.log("Customers in queue:");
queueService.getQueue().forEach((entry) => {
  console.log(
    `Customer ${entry.customerId} is in position ${entry.position}, joined at ${entry.timestamp}`
  );
});

// Calculate satisfaction rate
console.log(
  `Customer Satisfaction Rate: ${statsService.getSatisfactionRate()}%`
);
