import express from 'express';
import productsRepository from './products.repository.js';
import {
  createProductRouteSchema,
  deleteProductRouteSchema,
  updateProductRouteSchema,
} from './products.routes.schemas.js';
const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const body = req.body;
  const products = await productsRepository.getAll(body);
  res.json(products);
});

productsRouter.post('/', async (req, res) => {
  const body = createProductRouteSchema.body.parse(req.body);
  const newProduct = await productsRepository.addOne(body);
  res.json(newProduct);
});

productsRouter.delete('/:id', async (req, res) => {
  const params = deleteProductRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const productDeleted = await productsRepository.deleteOneById({
    productId: params.id,
  });
  console.log('PRODUCTO ELIMINADO', productDeleted);

  res.json(productDeleted);
});

productsRouter.put('/:id', async (req, res) => {
  const body = updateProductRouteSchema.body.parse(req.body);
  const params = updateProductRouteSchema.params.parse(req.params);
  const productUpdated = await productsRepository.updateOneById(params.id, {
    ...body,
  });
  res.json(productUpdated);
});

export default productsRouter;
