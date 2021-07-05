import app from './app';
import './database';

// Starting Server
app.listen(app.get('port'), () =>
	console.log('Server listenign on port: ', app.get('port'))
);
