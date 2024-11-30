import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { userRoutes } from './routes/userRoutes';
import { wisataRoutes } from './routes/wisataRoutes';

// Inisialisasi Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Rute untuk User
app.use('/user', userRoutes);

// Rute untuk Wisata
app.use('/wisata', wisataRoutes);

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Selamat datang di API Pengelolaan Wisata!');
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(Server berjalan di http://localhost:${port});
});
