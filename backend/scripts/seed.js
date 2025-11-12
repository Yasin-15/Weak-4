import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    console.log('Products cleared');

    const productsPath = join(__dirname, '../../src/data/products.json');
    const productsData = await readFile(productsPath, 'utf-8');
    const products = JSON.parse(productsData);

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
