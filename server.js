
const app = require('./app'); 
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

 //require('./models/inventoryModel'); 
 //require('./models/userModel'); 

const port = 1515; // Sunucunun dinleyeceği portu belirtiyoruz
app.listen(port, '192.168.31.155', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on http://192.168.31.155:${port}`);
});
