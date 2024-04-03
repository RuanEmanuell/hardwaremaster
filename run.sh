cd client
npm install
gnome-terminal -- sudo npm start

sleep 2

cd ../server
npm install
gnome-terminal -- npm run dev

cd ../client
code .

cd ../server
code .
