
const app = require('./app'); 
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//  require('./models/inventoryModel'); 
//  require('./models/userModel'); 

const port = 1515; // Sunucunun dinleyeceği portu belirtiyoruz
app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on localhost:${port}`);
});
