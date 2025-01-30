const { getChannel } = require('../config/rabbitmq');

async function enqueueRequest(queueName, request) {
  const channel = getChannel();
  if (!channel) return console.error('RabbitMQ channel not available');
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(request)));
  console.log(`Request added to ${queueName}`);
}

module.exports = { enqueueRequest };
