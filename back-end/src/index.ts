import express from 'express'
import path from 'path'
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); 
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});