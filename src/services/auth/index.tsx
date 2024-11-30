import { instance } from '@/libs/axios/axiosInstance';

const authServices = {
	registerAccount: (data: any) => instance.post('/api/users/register', data),
};

export default authServices;
