import mongoose, { Types } from "mongoose";

export interface Order {
  _id?: Types.ObjectId;
  grandTotal: number;
  status: string;
  createdBy: Types.ObjectId;
  orderItems: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const Schema = mongoose.Schema;

const OrderSchema = new Schema<Order>(
  {
    grandTotal: {
      type: Schema.Types.Number,
      required: true,
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    orderItems: {
        type: Schema.Types.ObjectId,
        ref: "OrderDetail",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;