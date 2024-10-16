import mongoose, { Types } from "mongoose";

export interface OrderDetail {
  _id?: Types.ObjectId;
  product: Types.ObjectId;
  qty: number;
  subTotal: number;
  order: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema<OrderDetail>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    qty: {
        type: Schema.Types.Number,
        required: true,
    },
    subTotal: {
      type: Schema.Types.Number,
      required: true,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
  },
  {
    timestamps: true,
  }
);

const OrderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema);

export default OrderDetailModel;