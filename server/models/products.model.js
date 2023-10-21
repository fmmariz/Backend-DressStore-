import mongoose from 'mongoose'
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  category: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  published: {
    type: Boolean,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

const ProductsModel = mongoose.model('Products', ProductsSchema);


function findProductsByNameSubstring(substring){
  const regex = new RegExp(substring, 'i');
  return ProductsModel.find({"name" : {$regex: regex}});
}

export default ProductsModel

