import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import "dotenv/config";
import './db.js';

const PORT = process.env.PORT;

var app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Miejsce na routery

app.use((req, res) => {
    res.status(404).send("<h2>404 - nie znaleziono strony</h2>");
});


app.use((err, req, res, next) => {
 console.error('Unhandled error:', err);
 const status = err.status || 500;
 res.status(status).json({
 error: err.message || 'Internal Server Error'
 });
});


app.listen(PORT, () =>{
  console.log(`Server running at http://localhost:${PORT} `);
});


export default app;