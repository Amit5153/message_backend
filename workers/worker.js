const amqp = require('amqplib');

async function consumeTasks(queueName) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);

    channel.consume(queueName, msg => {
      if (msg !== null) {
        const taskData = JSON.parse(msg.content.toString());
        console.log(`Processing task:`, taskData);
        channel.ack(msg);
      }
    });

    console.log(`Worker is processing tasks from ${queueName}`);
  } catch (error) {
    console.error('Worker error:', error);
  }
}

consumeTasks('queue_client1');
