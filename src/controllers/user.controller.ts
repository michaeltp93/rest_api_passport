import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import config from '../config/config';

import { IUser } from '../models/User';

function createToken(user: IUser) {
	return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
		expiresIn: 86400,
	});
}

export const signUp = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ menssage: 'Please, send your email and password' });
	}

	const user = await User.findOne({ email });

	if (user) {
		return res.status(400).json({ messange: 'This user already exists' });
	}

	const newUser = new User({
		email,
		password,
	});

	const userSaved = await newUser.save();
	console.log(userSaved);

	return res.status(201).json(newUser);
};

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ menssage: 'Please, send your email and password' });
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({ menssage: 'This user does not exist' });
	}

	const isMatch = await user.comparePassword(password);

	if (isMatch) {
		return res.status(200).json({ token: createToken(user) });
	}

	return res
		.status(400)
		.json({ mensage: 'The email or password are incorrect' });
};
