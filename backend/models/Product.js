import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  unit: {
    type: String,
    default: 'lb'
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
