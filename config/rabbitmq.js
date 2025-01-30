const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel();
    console.log('RabbitMQ Connected');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel not created. Please ensure RabbitMQ is connected.');
  }
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };
