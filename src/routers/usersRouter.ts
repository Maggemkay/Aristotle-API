import express from 'express';
import { getRepository, Table } from 'typeorm';
import { User } from '../models/User';
import {} from 'typeorm';
import { isAuthorized } from '../authentication';

const usersRouter = express.Router();

usersRouter.get('/users', async (req, res) => {
	const token = isAuthorized(req, res);

	if (!token) {
		return;
	}

	try {
		const users = await getRepository(User).find();

		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json('Something went wrong!');
	}
});

usersRouter.post('/users', async (req, res) => {
	const token = isAuthorized(req, res);

	if (!token) {
		return;
	}

	// CHANGE ID LATER
	const newUser = new User(
		req.body.id,
		req.body.firstName,
		req.body.lastName,
		req.body.username,
		req.body.email,
		req.body.password
	);

	try {
		const repo = getRepository(User);
		repo.save(newUser);

		return res.status(200).send('New user created!');
	} catch (error) {
		return res.status(500).json('Something went wrong!');
	}
});

usersRouter.patch('/users/:id', async (req, res) => {
	const token = isAuthorized(req, res);

	if (!token) {
		return;
	}

	const editedId = req.params.id;
	const changedParameters = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	};

	const validParameters = Object.entries(changedParameters).reduce(
		(previous, current) => {
			const key = current[0];
			const value = current[1];
			if (value) {
				previous[key] = value;
			}
			return previous;
		},
		// tslint:disable-next-line:no-any
		{} as { [key: string]: any }
	);

	try {
		const repo = getRepository(User);

		if (repo.findOneOrFail(editedId)) {
			await repo.update(editedId, validParameters);

			const found = await repo.findOne(editedId);

			return res.status(200).send(found);
		} else {
			return res.status(400).send('Could not find user!');
		}
	} catch (error) {
		return res.status(500).json('Something went wrong!');
	}
});

usersRouter.delete('/users/:id', async (req, res) => {
	const token = isAuthorized(req, res);

	if (!token) {
		return;
	}

	const deleteId = req.params.id;

	try {
		const repo = getRepository(User);

		if (repo.findOneOrFail(deleteId)) {
			await repo.delete(deleteId);

			return res.status(200).send('User deleted!');
		} else {
			return res.status(400).send('Could not find user!');
		}
	} catch (error) {
		return res.status(500).json('Something went wrong!');
	}
});

export default usersRouter;
