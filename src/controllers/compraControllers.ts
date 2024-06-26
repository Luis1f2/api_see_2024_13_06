import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Producto from '../models/producModels';
import Compra from '../models/compraModels';
import { notifyClients } from './sseController'; // Importar la función notifyClients

const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ message });
};

export const createCompra = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const purchases = req.body.purchases;
    console.log('Datos recibidos:', purchases);

    const compraDocuments = [];

    for (const compraData of purchases) {
      const { productId, cantidad } = compraData;

      const productObjectId = new mongoose.Types.ObjectId(productId);
      const producto = await Producto.findById(productObjectId).session(session);

      if (!producto) {
        sendErrorResponse(res, 404,`Producto con ID ${productId} no encontrado`) ;
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (producto.cantidad < cantidad) {
        sendErrorResponse(res, 400, `No hay suficiente cantidad del producto con ID ${productId}`);
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const compra = new Compra({
        productId: productObjectId,
        cantidad,
      });
      await compra.save({ session });

      producto.cantidad -= cantidad;
      await producto.save({ session });

      compraDocuments.push(compra);
    }
    
    await session.commitTransaction();
    session.endSession();
    
    // Notificar a los clientes sobre la nueva compra y la actualización de productos
    await notifyClients({ type: 'NUEVA_COMPRA' });
    
    res.status(201).json(compraDocuments);
  } catch (error: unknown) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error en createCompra:', error);
    if (error instanceof Error) {
      sendErrorResponse(res, 500, error.message);
    } else {
      sendErrorResponse(res, 500, 'Error inesperado');
    }
  }
};

export const getAllCompra = async (req: Request, res: Response): Promise<void> => {
  try {
    const compras = await Compra.find().populate('productId');
    res.status(200).json(compras);
  } catch (error: unknown) {
    console.error('Error en getAllcompras:', error);
    if (error instanceof Error) {
      sendErrorResponse(res, 500, error.message);
    } else {
      sendErrorResponse(res, 500, 'error inesperado');
    }
  }
};