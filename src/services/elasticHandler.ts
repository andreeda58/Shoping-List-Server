import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();


//service that allows me to manage the data that is sent and received from elastic


const client = new Client({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || 'password'
  }
});

interface Document {
  index: string;
  id?: string;
  body: any;
}

export const saveDocument = async (document: Document) => {
  try {
    const response = await client.index({
      index: document.index,
      id: document.id,
      body: document.body
    });
    return response;
  } catch (error) {
    console.error('Error saving document to Elasticsearch', (error as Error).message);
    throw error;
  }
};

export const getDocument = async (index: string, id: string) => {
  try {
    const response = await client.get({
      index,
      id
    });
    return response;
  } catch (error) {
    console.error('Error getting document from Elasticsearch', (error as Error).message);
    throw error;
  }
};



export const searchDocuments = async (index: string, query: any) => {
  try {
    const response = await client.search({
      index,
      body: {
        query
      }
    });
    return response.hits.hits.map((hit: any) => ({
      id: hit._id,
      ...hit._source
    }));
  } catch (error) {
    console.error('Error searching documents in Elasticsearch', (error as Error).message);
    throw error;
  }
};

export const deleteDocument = async (index: string, id: string) => {
  try {
    const response = await client.delete({
      index,
      id
    });
    return response;
  } catch (error) {
    console.error('Error deleting document from Elasticsearch', (error as Error).message);
    throw error;
  }
};

export const bulkSaveDocuments = async (operations: any[]) => {
  const result = await client.bulk({
    refresh: true,
    body: operations
  });
  return result;
};
