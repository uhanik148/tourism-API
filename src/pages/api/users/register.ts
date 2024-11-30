import { signUp } from '@/libs/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { email, fullname, password } = req.body;
			if (!email) {
				throw Error('email is required');
			}

			if (!fullname) {
				throw Error('fullname is required');
			}

			if (!password) {
				throw Error('password is required');
			}

			const register = await signUp({
				email: req.body.email,
				fullname: req.body.fullname,
				password: req.body.password,
			});

			res.status(200).json({
				status: true,
				message: 'register successfully',
				data: register,
			});
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';

			console.log(error);
			res.status(400).json({
				status: false,
				message: errorMessage,
			});
		}
	} else {
		res.status(405).json({ status: false, message: `Method ${req.method} is not allowed` });
	}
}
