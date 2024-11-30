import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { deleteData, updateData } from '@/libs/firebase/service';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'PUT') {
		const { id } = req.query as { id: string };
		const { data } = req.body;
		const token = req.headers.authorization?.split(' ')[1]!;
		jwt.verify(token, process.env.NEXTAUTH_SECRET!, async (err: any, decoded: any) => {
			if (decoded && decoded.role === 'admin') {
				await updateData('users', id, data, (result: boolean) => {
					if (result) {
						res.status(200).json({
							status: true,
							statusCode: 200,
							message: 'sucess',
						});
					} else {
						res.status(400).json({
							status: false,
							statusCode: 400,
							message: 'failed',
						});
					}
				});
			} else {
				res.status(403).json({
					status: false,
					statusCode: 403,
					message: 'Access Denied',
				});
			}
		});
	} else if (req.method === 'DELETE') {
		const { id } = req.query as { id: string };
		const token: string = req.headers.authorization?.split(' ')[1]!;
		jwt.verify(token, process.env.NEXTAUTH_SECRET!, async (err: any, decoded: any) => {
			if (decoded && decoded.role === 'admin') {
				await deleteData('users', id, (result: boolean) => {
					if (result) {
						res.status(200).json({
							status: true,
							statusCode: 200,
							message: 'sucess',
						});
					} else {
						res.status(400).json({
							status: false,
							statusCode: 400,
							message: 'failed',
						});
					}
				});
			} else {
				res.status(403).json({
					status: false,
					statusCode: 403,
					message: 'Access Denied',
				});
			}
		});
	}
}
