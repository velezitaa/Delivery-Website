import express from 'express';
import orderRepository from './order.repository.js';
import {
  createOrderRouteSchema,
  deleteOrderRouteSchema,
  updatePaymentStatusRouteSchema,
  userOrdersRouteSchema,
  // updateOrderRouteSchema,
} from './order.routes.schemas.js';
const ordersRouter = express.Router();

// ordersRouter.get('/', async (req, res) => {
//   const body = req.body;
//   const orders = await orderRepository.getAll(body);
//   res.json(orders);
// });

// GET /api/orders/user/:userId - Ruta para que un cliente vea sus pedidos
ordersRouter.get('/user/:userId', async (req, res) => {
  const params = userOrdersRouteSchema.params.parse(req.params);
  const orders = await orderRepository.getByUserId(params.userId);
  res.json(orders);
});

// GET /api/orders/pending - Ruta para que el "admin" vea los pagos por revisar
ordersRouter.get('/pending', async (req, res) => {
  const pendingOrders = await orderRepository.getByPaymentStatus('pendiente');
  res.json(pendingOrders);
});

ordersRouter.post('/', async (req, res) => {
  const body = createOrderRouteSchema.body.parse(req.body);
  const newOrder = await orderRepository.addOne(body);
  res.json(newOrder);
});

// PATCH /api/orders/:orderId/payment-status - Ruta para que el "admin" acepte o rechace
ordersRouter.patch('/:orderId/payment-status', async (req, res) => {
  const params = updatePaymentStatusRouteSchema.params.parse(req.params);
  const body = updatePaymentStatusRouteSchema.body.parse(req.body);

  const updatedOrder = await orderRepository.updatePaymentStatus(
    params.orderId,
    body.payment_status,
  );
  res.json(updatedOrder);
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
