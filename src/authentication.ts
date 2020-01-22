import { verify, sign } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { stringify } from 'querystring';

interface IJwt {
	readonly sub: string;
	readonly iat: number;
	readonly exp: number;
}

export function isAuthorized(req: Request, res: Response) {
	const token = authenticateHeader(req.headers.authorization);

	if (!token) {
		return !res
			.status(401)
			.json({ error: 'Invalid authentication token format!' });
	}

	return token;
}

function authenticateHeader(authHeader?: string) {
	if (authHeader && authHeader.startsWith('Bearer ')) {
		const incomingJwt = authHeader.split(' ')[1];
		try {
			const verifiedJwt = verify(incomingJwt, process.env.AUTH_PRIVATEKEY!);
			return verifiedJwt as IJwt;
		} catch (err) {
			return;
		}
	}
	return undefined;
}

export async function generateToken(userId: string) {
	const obj = {
		sub: userId,
	};

	const token = await sign(obj, process.env.AUTH_PRIVATEKEY!, {
		algorithm: 'HS256',
		expiresIn: '10h',
	});

	return token;
}

export function getTokenId(token: IJwt) {
	return token.sub;
}
