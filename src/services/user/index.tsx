import { instance } from '@/libs/axios/axiosInstance';

const userServices = {
	getAllUsers: () => instance.get('/users'),
	updateUser: (id: string, data: any, token: string) =>
		instance.put(
			`/users/${id}`,
			{ data },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		),
	deleteUser: (id: string, token: string) =>
		instance.delete(`/users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getProfile: (token: string) =>
		instance.get(`/users/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	updateProfile: (id: string, data: any, token: string) =>
		instance.put(
			`/users/profile/${id}`,
			{ data },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		),
};

export default userServices;
