import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = mongoose.Schema({
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
  id_cart: { type: String },
  last_session: { type: Date },
});

schema.plugin(mongoosePaginate);
const userModel = mongoose.model(collection, schema);
export default userModel;
