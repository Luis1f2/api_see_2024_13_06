import { Schema, model, Document, Types } from 'mongoose';

interface ICompra extends Document {
  productId: Types.ObjectId;
  cantidad: number;
  compraDato: Date;
}

const CompraSchema = new Schema<ICompra>({
  productId: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  compraDato: { type: Date, default: Date.now },
});

const Compra = model<ICompra>('Purchase', CompraSchema);

export default Compra;

