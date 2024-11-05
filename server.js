
const app = require('./app'); 
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

<<<<<<< HEAD
//  require('./models/inventoryModel'); 
//  require('./models/userModel'); 

const port = 1515; // Sunucunun dinleyeceği portu belirtiyoruz
app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on localhost:${port}`);
=======
 //require('./models/inventoryModel'); 
 //require('./models/userModel'); 

const port = 1515; // Sunucunun dinleyeceği portu belirtiyoruz
app.listen(port, '192.168.31.155', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on http://192.168.31.155:${port}`);
>>>>>>> b2f927244c3a85658fe288c057975d77b699003b
});
