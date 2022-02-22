#!/bin/bash

cd ./backend
echo "Installing dependencies..."
npm start  
echo "Starting backend"

pm2 start --name=backend npm -- start

if [ $? -eq 0 ]; then
    echo "Backend Started"
else
    echo "Cannot start backend. Please check if pm2 installed or not. You can install pm2 by typing 'npm install pm2 -g' "
fi

cd ../frontend
echo "Installing dependencies..."
npm start  
echo "Starting frontend..."
pm2 start --name=frontend npm -- start

if [ $? -eq 0 ]; then
    echo "Frontend Started"
else
    echo "Cannot start frontend. Please check if pm2 installed or not. You can install pm2 by typing 'npm install pm2 -g' "
fi

echo "Successfully started the application"
echo "You can see the logs by running 'pm2 logs'"
echo "You can monitor the application memory usage and cpu usage by running 'pm2 monit'"
echo "You can stop the application by running 'pm2 stop all' or 'pm2 delete all'"


cd ./backend && npm start && pm2 start --name=backend npm -- start && cd ../frontend && npm start && pm2 start --name=frontend npm -- start