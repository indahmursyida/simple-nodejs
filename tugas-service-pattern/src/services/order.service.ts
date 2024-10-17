import { ObjectId } from "mongoose";
import OrderModel, { Order } from "../models/order.model";
import ProductsModel from "../models/products.model";

export const create = async (payload: Order): Promise<Order> => {
  

  const productIds = payload.orderItems.map(item => item.productId);
  const products = await ProductsModel.find({ _id: { $in: productIds } });

  payload.orderItems.forEach(item => {
    const product = products.find(p => p._id.toString() === item.productId.toString());
    if(product){
      item.name = product.name;
      item.price = product.price;
    }
  });
  
  const result = await OrderModel.create(payload);
  return result;
};

export const findAll = async (
  userId: ObjectId,
  limit: number = 10,
  page: number = 1
): Promise<Order[]> => {
  const result = await OrderModel.find({ createdBy: userId })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  return result;
};