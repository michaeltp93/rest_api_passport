import mongoose, { ConnectOptions } from 'mongoose';
import config from './config/config';

// Datebase connection
(async () => {
	const dtOptions: ConnectOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	};
	await mongoose.connect(config.DB.URI, dtOptions);
})();

const conection = mongoose.connection;
conection.once('open', () => {
	console.log('Data base connected');
});

conection.on('error', error => {
	console.error(error);
	process.exit(0);
});
