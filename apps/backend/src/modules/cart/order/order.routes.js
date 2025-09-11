import express from 'express';
import orderRepository from './order.repository.js';
import {
  createOrderRouteSchema,
  deleteOrderRouteSchema,
  // updateOrderRouteSchema,
} from './order.routes.schemas.js';
const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  const body = req.body;
  const orders = await orderRepository.getAll(body);
  res.json(orders);
});

ordersRouter.post('/', async (req, res) => {
  const body = createOrderRouteSchema.body.parse(req.body);
  const newOrders = await orderRepository.addOne(body);
  res.json(newOrders);
});

ordersRouter.delete('/:orderId/:userId', async (req, res) => {
  const params = deleteOrderRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const orderDeleted = await orderRepository.deleteOneById({
    orderId: params.orderId,
    userId: params.userId,
  });
  console.log('ORDEN ELIMINADA', orderDeleted);
  res.json(orderDeleted);
});

// ordersRouter.put('/:orderId/:userId', async (req, res) => {
//   const body = updateOrderRouteSchema.body.parse(req.body);
//   const params = updateOrderRouteSchema.params.parse(req.params);
//   const orderUpdated = await orderRepository.updateOneById(
//     params.orderId,
//     params.userId,
//     body.status,
//   );
//   res.json(orderUpdated);
// });

export default ordersRouter;
