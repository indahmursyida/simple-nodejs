import express, { Request, Response } from "express";
import { Category } from "./models/category";
import { Product } from "./models/product";
import * as categoryService from "./services/categoryService";

let categoryData: Category[] = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Perabotan' }
];

let productData: Product[] = [{ id: 1, name: 'Laptop', category: 'Elektronik' }, { id: 2, name: 'Meja', category: 'Perabotan' }];

const PORT = 3000;

function init() {
  const app = express();
  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    console.log(categoryData);
    res.status(200).json({
      message: "OK",
      data: null,
    });
  });

  // GET semua category
  app.get('/api/categories', (req, res) => {
    const categories = categoryService.getCategories(categoryData);
    res.json(categories);
  });

  // GET category berdasarkan ID
  app.get('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categoryService.getCategoryDetail(categoryData, categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category is not found' });
    }
  });

  // POST category baru
  app.post('/api/categories', (req, res) => {
    const newCategory = {
      id: categoryData.length ? categoryData[categoryData.length - 1].id + 1 : 1,
      ...req.body
    }

    categoryData = categoryService.addCategory(categoryData, newCategory);
    res.status(201).json(newCategory);
  });

  // PUT update category
  app.put('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const updatedCategory = { id: categoryId, ...req.body }
    const updatedCategoryData = categoryService.updateCategory(categoryData, updatedCategory)
    if (updatedCategoryData) {
      categoryData = updatedCategoryData;
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category is not found' });
    }
  });

  // PUT delete category
  app.delete('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    categoryData = categoryService.removeCategory(categoryData, categoryId);
    res.json({ message: "Category is successfully deleted" });
  });

  app.get('/api/products', (req, res) => {
    const query = req.query.q?.toString().toLowerCase() || '';
    const filteredProducts = productData.filter(product => product.name.toLowerCase().includes(query))
    res.json({ query: query, results: filteredProducts });
  });

  app.get('/api/products/:category', (req, res) => {
    const { category } = req.params;
    const query = req.query.q?.toString().toLowerCase() || '';

    const filteredProducts = productData.filter(product =>
      product.category.toLowerCase() === category.toLowerCase() &&
      product.name.toLowerCase().includes(query)
    );

    res.json({ category, query, results: filteredProducts });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();