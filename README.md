# Simple Chat Application

This is a simple chat application designed to handle messages between customers and a bot, manage a queue for customers who request to chat with a live agent, and calculate satisfaction rates.

### Assumptions:
- Customers are satisfied with the bot unless they send "instantqueue".
- A customer is added to the queue if they send the message "instantqueue".
- Total customers are simulated for the purpose of calculating satisfaction percentage.
- Messages are stored in memory (no persistence for simplicity).- Chat history is maintained per customer.


## Trade-offs
- No external persistence or database is included to keep the solution simple and focus on the requirements.
- Simulated data for total customers helps demonstrate the satisfaction calculation in the test cases.

### Design Decisions:
- **Separation of Concerns**: Each service is responsible for a distinct feature: message management, queueing, and satisfaction calculation..
-  **Memory**: Map is used to store messages, and an array is used for the queue to allow efficient lookup.
- **Scalability**: The design is simple, but it's modular and can be extended easily.
- **Extensibility**: is kept in mind: adding more features like persistence or APIs can easily be implemented without significant changes.


### Trade-offs:
- The current implementation uses an in-memory data structure, meaning data is lost when the application stops. This was a deliberate trade-off to simplify the solution and focus on functionality.
- No real database or external API interactions were included, as per the requirements. However, the design is modular and can be extended to include these features later if needed.

### Running Tests:
To run the app, tests, install dependencies and use the following commands:

```bash
npm start
npm test
npm install
