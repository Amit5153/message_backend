require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectRabbitMQ, createQueue, sendToQueue } = require('./config/rabbitmq');
const { processQueue } = require('./workers/requestWorker');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/auth', authRoutes); 
app.use('/api/users', userRoutes); 

// Task queue endpoint
app.post('/request', async (req, res) => {
  try {
    const { clientId, task } = req.body;
    const queueName = `queue_${clientId}`; 

    // Create the queue and send the task
    await createQueue(queueName);
    await sendToQueue(queueName, { task, clientId });

    res.json({ message: `Task added to ${queueName}` }); 
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process task request' }); 
  }
});


async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/queue_system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

   
    await connectRabbitMQ();

    
    processQueue('queue_client-1');
    processQueue('queue_client-2');

    
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error('Error starting server:', error); 
  }
}

startServer(); 
