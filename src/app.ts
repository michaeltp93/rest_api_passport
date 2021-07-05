import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import userRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';

// inicialitation
const app = express();

// settings
app.set('port', process.env.PORT || 3200);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

passport.use(passportMiddleware);

//routes
app.get('/', (_, res) => {
	res.send(`The API is at http://localhost: ${app.get('port')}`);
});

app.use(userRoutes);
app.use(specialRoutes);

export default app;
