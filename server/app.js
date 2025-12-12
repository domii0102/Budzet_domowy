import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import "dotenv/config";
import './db.js';
import categoriesRouter from './routes/categories.js';
import limitsRouter from './routes/limits.js';
import transactionsRouter from './routes/transactions.js';
import statsRouter from './routes/stats.js';

const PORT = parseInt(process.env.PORT, 10);


var app = express();

app.use(cors({
  origin: "http://localhost:4200"
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get(["/","/home"], (req, res) => {
  res.send("<h2>Strona główna</h2>");
})

app.use('/api/categories', categoriesRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/limits', limitsRouter);
app.use('/api/stats', statsRouter);


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