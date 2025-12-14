import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config();
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
