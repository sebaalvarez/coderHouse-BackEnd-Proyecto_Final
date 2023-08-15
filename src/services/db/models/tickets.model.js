import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  purchaser: {
    type: String,
    required: true,
    trim: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Middleware para agregar dentro del método 'find' un llamado a una función, en este
 * caso llamamos al metodo populate.
 */
// productSchema.pre("findOne", function () {
//   this.populate("courses.course");
// });
ticketSchema.plugin(mongoosePaginate);
const ticketsModel = mongoose.model(collectionName, ticketSchema);
export default ticketsModel;
