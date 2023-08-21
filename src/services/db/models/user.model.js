import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    password: String,
    loggedBy: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "premiun", "admin"],
    },
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
    last_session: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// schema.pre("findOne", function () {
//   this.populate("carts.cart");
// });

schema.plugin(mongoosePaginate);
const userModel = mongoose.model(collection, schema);
export default userModel;
