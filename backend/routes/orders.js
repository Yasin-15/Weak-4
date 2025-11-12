import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, subtotal, tax, discount, total, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      userId: userId || null,
      items,
      subtotal,
      tax,
      discount: discount || 0,
      total,
      status: 'confirmed'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (order && order.userId.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
