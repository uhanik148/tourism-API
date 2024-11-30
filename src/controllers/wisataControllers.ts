import { Request, Response } from 'express';
import { Wisata } from '../models/wisataModel';

let wisataData: Wisata[] = [];

export const createWisata = (req: Request, res: Response) => {
  const { nama, deskripsi } = req.body;
  const id = wisataData.length + 1;
  const wisata = { id, nama, deskripsi };
  wisataData.push(wisata);
  res.status(201).json(wisata);
};

export const getAllWisata = (req: Request, res: Response) => {
  res.json(wisataData);
};

export const updateWisata = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, deskripsi } = req.body;
  const wisata = wisataData.find(w => w.id == parseInt(id));
  if (!wisata) return res.status(404).send('Wisata not found');

  wisata.nama = nama;
  wisata.deskripsi = deskripsi;
  res.json(wisata);
};

export const deleteWisata = (req: Request, res: Response) => {
  const { id } = req.params;
  wisataData = wisataData.filter(w => w.id != parseInt(id));
  res.status(204).send();
};
