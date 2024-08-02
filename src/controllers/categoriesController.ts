import { Request, Response } from 'express';
import { getDocument, searchDocuments } from '../services/elasticHandler';
import dotenv from 'dotenv';
dotenv.config();

const index = process.env.CATEGORIES_INDEX || 'categories';
 

  // get all categories
  export const getCategories=async(req: Request, res: Response): Promise<void> =>{
    try {
      const result = await searchDocuments(index, {
        match_all: {}
      });
      res.json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  }

 
 

