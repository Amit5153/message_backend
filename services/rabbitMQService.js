const amqp = require('amqplib');

const rabbitMQUrl = 'amqp://localhost'; // Update this

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    console.log('Connected to RabbitMQ');
  } catch (err) {
    console.error('RabbitMQ connection error:', err);
  }
}

connectRabbitMQ();
