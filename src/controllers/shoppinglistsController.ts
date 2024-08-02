import { Request, Response } from 'express';
import { saveDocument } from '../services/elasticHandler';
import dotenv from 'dotenv';
import { ShoppingList } from '../models/shoppingList';
dotenv.config();

const index=process.env.SHOPPINGLIST_INDEX||"shoppinglist";

export const saveShoppingList = async (req: Request, res: Response) => {
  const shoppingList: ShoppingList = req.body;
  
  if (!shoppingList) {
    return res.status(400).send('Shopping list and products are required');
  }

  try {

    //save data 
    const result = await saveDocument({
      index,
      body: shoppingList,
    });
    res.status(201).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};
