cd ./backend
echo "Installing dependencies..."
npm start  
echo "Starting backend"
pm2 start --name=backend npm -- start

cd ../frontend
echo "Installing dependencies..."
npm start  
echo "Starting frontend..."
pm2 start --name=frontend npm -- start
