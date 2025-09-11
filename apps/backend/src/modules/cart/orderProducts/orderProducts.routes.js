import express from 'express';
import orderProductsRepository from './orderProducts.repository.js';
import {
  addProductToOrderSchema,
  updateProductQuantitySchema,
  deleteProductFromOrderSchema,
} from './orderProducts.routes.schemas.js';

const orderProductsRouter = express.Router();

orderProductsRouter.post('/:orderId', async (req, res) => {
  const { orderId } = addProductToOrderSchema.params.parse(req.params);
  const { productId, quantity } = addProductToOrderSchema.body.parse(req.body);
  const newProduct = await orderProductsRepository.addProductToOrder({
    orderId,
    productId,
    quantity,
  });
  res.json(newProduct);
});

orderProductsRouter.get('/:orderId', async (req, res) => {
  const { orderId } = addProductToOrderSchema.params.parse(req.params);
  const productsInOrder = await orderProductsRepository.getOrderProducts(orderId);
  res.json(productsInOrder);
});

orderProductsRouter.put('/:orderId/:productId', async (req, res) => {
  const { orderId, productId } = updateProductQuantitySchema.params.parse(req.params);
  const { newQuantity } = updateProductQuantitySchema.body.parse(req.body);
  const updatedProduct = await orderProductsRepository.updateProductQuantity({
    orderId,
    productId,
    newQuantity,
  });
  res.json(updatedProduct);
});

orderProductsRouter.delete('/:orderId/:productId', async (req, res) => {
  const { orderId, productId } = deleteProductFromOrderSchema.params.parse(req.params);
  const deletedProduct = await orderProductsRepository.removeProductFromOrder({
    orderId,
    productId,
  });
  res.json(deletedProduct);
});

export default orderProductsRouter;
