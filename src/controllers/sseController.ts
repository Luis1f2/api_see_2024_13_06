import { Response, Request } from 'express';
import Producto from '../models/producModels';

let clients: Response[] = [];

export const eventosProductos = async (req: Request, res: Response): Promise<void> => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  
  await sendAllProducts();

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
    res.end();
  });
};

export const notifyClients = async (data: any) => {
  try {
    const productos = await Producto.find();
    clients.forEach(client => {
      client.write(`data: ${JSON.stringify({ type: data.type, productos })}\n\n`);
    });
  } catch (error) {
    console.error('Error en notificar a los clientes:', error);
  }
};

export const sendAllProducts = async () => {
  try {
    const productos = await Producto.find();
    clients.forEach(client => {
      client.write(`data: ${JSON.stringify({ type: 'OBTENER_TODOS', productos })}\n\n`);
    });
  } catch (error) {
    console.error('Error en enviar todos los productos:', error);
  }
};
