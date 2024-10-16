/**
 * src/services/order.service.ts
 */

import OrderModel, { Order } from "../models/order.model";
import OrderDetailModel, { OrderDetail } from "../models/order-detail.model";
import { ObjectId } from "mongoose";
import { Product } from "../models/products.model";

export interface IOrderItem {
  name: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  grandTotal: number;
  orderItems: IOrderItem[];
  createdBy: string;
  status: string;
}

export const create = async (payload: IOrder): Promise<IOrder> => {
  const { grandTotal, orderItems, createdBy, status } = payload;
  const order = new OrderModel({
    grandTotal,
    createdBy,
    status,
  });
  
  const newOrder = await OrderModel.create(order);
  const orderDetailPromises = orderItems.map(async (item) => {
    const detail =  new OrderDetailModel({
      product: item.productId,
      qty: item.quantity,
      subTotal: item.quantity * item.price,
      order: newOrder._id
    });
    const newDetail = await OrderDetailModel.create(detail);
    return detail;
  });

  return payload;
};

export const findAll = async (
  userId: ObjectId,
  query: any,
  limit: number = 10,
  page: number = 1
): Promise<{
  grandTotal: number;
  orderItems: {
    name: string;
    productId: string | undefined;
    price: number;
    quantity: number;
  }[];
  createdBy: string;
  status: string;
}[]> => {
  const result = await OrderModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
    const orders = await OrderModel.find({ createdBy: userId });

    const formattedOrdersPromises = orders.map(async (order) => {
      const orderDetails = await OrderDetailModel.find({ order: order._id }).populate<{ product: Product }>('product')
      .lean();
      console.log(orderDetails);
      return {
        grandTotal: order.grandTotal,
        orderItems: orderDetails.map((detail) => ({
          name: detail.product.name,
          productId: detail.product._id?.toString(),
          price: detail.product.price,
          quantity: detail.qty,
        })),
        createdBy: order.createdBy.toString(),
        status: order.status,
      };
    });

    return Promise.all(formattedOrdersPromises);
};