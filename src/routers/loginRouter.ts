import express from 'express';
import { generateToken } from '../authentication';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
	const email: string = req.body.email;
	const password: string = req.body.password;

	if (!email || !password) {
		return res.status(400).json({ error: 'Missing parameters!' });
	}

	try {
		const repo = await getRepository(User);

		const loginUser = await repo.findOneOrFail({ where: { email } });

		// Add hash to password and then compare
		if (!loginUser || loginUser.password !== password) {
			return res.status(400).json({ error: 'Invalid email or password!' });
		}

		const token = await generateToken(loginUser.id);
		res.send(token);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Internal server error!' });
	}
});

export default loginRouter;
