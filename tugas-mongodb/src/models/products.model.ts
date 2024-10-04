import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Minimal qty adalah 1"]
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  {
    timestamps: true,
  }
);

const ProductsModel = mongoose.model("Products", ProductsSchema);

export default ProductsModel;
