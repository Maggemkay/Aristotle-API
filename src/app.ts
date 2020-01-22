import dotenv from 'dotenv';
import express from 'express';

import loginRouter from './routers/loginRouter';
import usersRouter from './routers/usersRouter';

import { createConnection } from 'typeorm';

const hostname = '127.0.0.1';
const port = 8080;

const app = express();

(async () => {
	await dotenv.config();

	await createConnection({
		name: 'default',
		type: 'mysql',
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT!, 10),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: true,
		entities:
			process.env.NODE_ENV === 'dev'
				? ['./src/models/*.ts']
				: ['./dist/models/*.js'],
	}).then(() => console.log('Connected to db'));

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(loginRouter);
	app.use(usersRouter);

	app.listen(port, hostname, error => {
		if (error) {
			return console.log(error);
		}
		return console.log(
			'Server is listening on http://' + hostname + ':' + port + '/'
		);
	});
})();
