# Simple Chat Application

This is a simple chat application designed to handle messages between customers and a bot, manage a queue for customers who request to chat with a live agent, and calculate satisfaction rates.

### Assumptions:
- Customers are satisfied with the bot unless they send "instantqueue".
- No persistence is required; everything is stored in memory.
- Chat history is maintained per customer.

### Design Decisions:
- **Separation of Concerns**: Each service is responsible for a distinct feature.
- **Scalability**: The design is simple, but it's modular and can be extended easily.

### Edge Cases Considered:
**The ChatService edge cases**:

- Non-existent Customer: Methods such as getChatHistory, getTotalMessageCount, and markCustomerUnsatisfied gracefully handle scenarios where the customer ID does not exist.

- Invalid customerId: The service throws an error when attempting to send messages with an invalid or null customer ID, ensuring the integrity of operations.

- Empty or Whitespace Message Content: Sending an empty or whitespace-only message will now result in an error, preventing meaningless entries in the chat history.

- Message Length: There is a limit on the message length (e.g., 1000 characters). Messages exceeding this limit will throw an error to ensure that message size remains reasonable.

- Duplicate Messages: Consecutive identical messages from the same customer are detected and blocked, ensuring the same message isn’t added multiple times.

- Sending a Message After Marking Customer Unsatisfied: Once a customer is marked as unsatisfied (e.g., by sending "instantqueue"), they can still continue sending messages, but their satisfaction state is tracked.

### Trade-offs:
- I opted for an in-memory approach to keep things simple and meet the requirements.
- No real database or external API interactions, as per the task.

### Running Tests:
To run the app, tests, install dependencies and use the following commands:

```bash
npm start
npm test
npm install
