import { Request, Response } from 'express';
import { getDocument, saveDocument, searchDocuments,bulkSaveDocuments } from '../services/elasticHandler';
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

export const updateProductQuantity = async (req: Request, res: Response): Promise<void> => {
  const { name, quantity } = req.body;

  try {
    // Buscar el producto por nombre
    const searchResult = await searchDocuments(index, {
      term: {
        name
      }
    });

    // Verificar que se encontró el producto
    if (searchResult.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const productId = searchResult[0].id;
    const existingProduct = searchResult[0];

    // Actualizar la cantidad del producto
    const updatedProduct = {
      ...existingProduct,
      quantity
    };

    // Guardar el documento actualizado
    const result = await saveDocument({
      index,
      id: productId,
      body: updatedProduct
    });

    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await getDocument(index, id);
    res.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};

export const getProductsByCategoryId = async (req: Request, res: Response): Promise<void> => {
  const { categoryId } = req.params;

  try {
    const result = await searchDocuments(index, {
      term: {
        categoryId
      }
    });
    res.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};
