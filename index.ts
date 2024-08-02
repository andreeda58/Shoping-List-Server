import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categoriesRoutes from './src/routes/categoriesRoutes';
import shoppinglistsRoutes from './src/routes/shoppinglistsRoutes';
import productsRoutes from './src/routes/productsRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/categories', categoriesRoutes);
app.use('/shoppinglists', shoppinglistsRoutes);
app.use('/products', productsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
