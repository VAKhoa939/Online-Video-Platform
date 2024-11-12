import express from 'express'
import path from 'path'
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.json());

const PORT = process.env.PORT || 3000;
// Serve static files from the frontend/dist directory 
app.use(express.static(path.join(__dirname, '../../front-end/dist')));

app.get('*', (req, res) => { 
  const des = path.join('..', __dirname, '../../front-end/dist', 'index.html')
  console.log(des);
  res.sendFile(des); 
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});