// necessary modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config(); // environment variables

// configure the application
const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.DATABASE_URL);

// a database connection
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', (req, res) => {
  res.send('Welcome to the Guestbook!');
});

// GET route to fetch messages
app.get('/messages', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST route to add new messages
app.post('/messages', async (req, res) => {
  const { name, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING *',
      [name, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// start the server on the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});