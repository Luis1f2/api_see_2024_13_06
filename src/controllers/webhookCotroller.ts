import { Request, Response } from 'express';
import axios from 'axios';

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Webhook recibido:', req.body);

    const { url } = req.body;

    if (!url) {
      res.status(400).json({ message: 'Falta el dato requerido: url' });
      return;
    }

    let responseData;
    try {
      const response = await axios.get(url);
      responseData = response.data;
    } catch (error) {
      console.error('Error al acceder a la URL proporcionada:', error);
      res.status(500).json({ message: 'Error al acceder a la URL proporcionada' });
      return;
    }

    res.status(200).json({
      message: 'Webhook procesado exitosamente',
      data: responseData
    });
  } catch (error: unknown) {
    console.error('Error en handleWebhook:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};
