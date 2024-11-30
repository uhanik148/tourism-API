import type { NextApiRequest, NextApiResponse } from 'next';
import { getData } from '@/libs/firebase/service';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const users = await getData('users');
		const data = users.map((user: any) => {
			delete user.password;
			return user;
		});
		res.status(200).json({ status: true, statusCode: 200, message: 'success', data: users });
	}
}
