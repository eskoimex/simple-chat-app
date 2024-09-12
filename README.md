# Simple Chat Application

This is a simple chat application designed to handle messages between customers and a bot, manage a queue for customers who request to chat with a live agent, and calculate satisfaction rates.

### Assumptions:
- Customers are satisfied with the bot unless they send "instantqueue".
- No persistence is required; everything is stored in memory.
- Chat history is maintained per customer.

### Design Decisions:
- **Separation of Concerns**: Each service is responsible for a distinct feature.
- **Scalability**: The design is simple, but it's modular and can be extended easily.

### Trade-offs:
- I opted for an in-memory approach to keep things simple and meet the requirements.
- No real database or external API interactions, as per the task.

### Running Tests:
To run the tests, install dependencies and use the following commands:

```bash
npm install
npm test
