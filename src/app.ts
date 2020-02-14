import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import loginRouter from './routers/loginRouter';
import usersRouter from './routers/usersRouter';

import { createConnection } from 'typeorm';

const app = express();

const hostname = process.env.API_HOST as string;
const port = (process.env.API_PORT as unknown) as number;

(async () => {
	await createConnection({
		name: 'default',
		type: 'mysql',
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT!, 10),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: false,
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
