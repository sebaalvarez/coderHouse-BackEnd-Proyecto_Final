import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "products";

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};

const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
};

const productSchema = new mongoose.Schema(
  {
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    price: stringTypeSchemaNonUniqueRequired,
    thumbnails: stringTypeSchemaNonUniqueRequired,
    code: stringTypeSchemaUniqueRequired,
    stock: stringTypeSchemaNonUniqueRequired,
    status: { type: Boolean, default: true },
    category: { type: String, required: true, default: "Sin  Categoria" },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

/**
 * Middleware para agregar dentro del método 'find' un llamado a una función, en este
 * caso llamamos al metodo populate.
 */
productSchema.pre("findOne", function () {
  this.populate("owner_id");
});

productSchema.pre("findById", function () {
  this.populate("owner_id");
});

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collectionName, productSchema);
export default productsModel;
