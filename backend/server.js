const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Parse JSON request body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
