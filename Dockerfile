# Use Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application code
COPY . .

# Expose the port the application listens on
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
