# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port the app runs in
EXPOSE 5000

# Define the command to run your app
CMD [ "node", "server.js" ]
