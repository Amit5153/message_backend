const { getChannel } = require('../config/rabbitmq');

const processQueue = (queueName) => {
  try {
    const channel = getChannel(); 
    channel.assertQueue(queueName, { durable: true });
    console.log(`Listening on queue: ${queueName}`);
    
    channel.consume(queueName, (message) => {
      if (message) {
        console.log(`Received: ${message.content.toString()}`);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error(`Error processing queue ${queueName}:`, error);
  }
};

module.exports = { processQueue };
