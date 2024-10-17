import mongoose, { Types } from "mongoose";
import UserModel from "./user.model";
import mail from "../utils/mail";
import { ZOHO_MAIL_USER } from "../utils/env";
import ProductsModel from "./products.model";
import {
  update,
} from "../services/product.service";
export interface OrderItem {
  name: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
}

export interface Order {
  _id?: Types.ObjectId;
  grandTotal: number;
  orderItems: OrderItem[];
  createdBy: Types.ObjectId;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const Schema = mongoose.Schema;

const OrderSchema = new Schema<Order>(
  {
    grandTotal: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Minimal quantity adalah 1"],
            max: [5, "Maksimal quantity adalah 5"],
          },
        },
      ],
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", async function (next) {
  const order = this;
  const productIds = order.orderItems.map(item => item.productId);
  const products = await ProductsModel.find({ _id: { $in: productIds } });

  const productStockMap = new Map(products.map(product => [product._id.toString(), product.qty]));

  const isQuantityValid = order.orderItems.some(item => {
    const stock = productStockMap.get(item.productId.toString());
    return !stock || item.quantity > stock;
  });

  if (isQuantityValid) {
    return next(new Error("Order quantity harus lebih kecil dari  qty product"));
  }

  next();
});


OrderSchema.post("save", async function (doc, next) {
  await Promise.all(
    doc.orderItems.map(async (item) => {
      await ProductsModel.findByIdAndUpdate(item.productId, {
        $inc: { qty: -item.quantity }
      });
    })
  );

  const user = await UserModel.findOne({ _id: doc.createdBy });

  console.log("Send email to: ", user?.email);
  const content = await mail.render('invoice.ejs', {
    customerName: user?.fullName,
    orderItems: this.orderItems,
    grandTotal: this.grandTotal,
    contactEmail: "indahbahrina@gmail.com",
    year: 2024,
    companyName: "Indah Store"
  });

  await mail.send({
    to: user?.email || "",
    subject: "Order Confirmation",
    content
  });
  next();
});


const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;