import { Request, Response } from 'express';
import {  saveDocument,bulkSaveDocuments } from '../services/elasticHandler';
import dotenv from 'dotenv';
import { Product } from '../models/product';
dotenv.config();

const index = process.env.PRODUCTS_INDEX || 'products';

export const addAllProducts = async (req: Request, res: Response): Promise<void> => {
  
  const  products :Product[] = req.body;
 
  
  if (!products || !Array.isArray(products)) {
    res.status(400).send('Products array is required');
    return;
  }

  try {
    const bulkOperations: any[] = [];
    products.forEach((product: any) => {
      bulkOperations.push({ index: { _index: index, _id: product.productId } });
      bulkOperations.push(product);
    });

    // Guardar los productos en el índice de productos
    const result = await bulkSaveDocuments(bulkOperations);

    res.status(201).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};

export const addNewProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await saveDocument({
      index,
      body: req.body,
    });
    res.status(201).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};


