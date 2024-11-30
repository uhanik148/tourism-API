import { AuthLayout } from '@/components/layouts/AuthLayout';
import { instance } from '@/libs/axios/axiosInstance';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const RegisterView = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { push } = useRouter();
	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			setError('');
			setIsLoading(true);
			const data = {
				email: event.target.email.value,
				fullname: event.target.fullname.value,
				password: event.target.password.value,
			};

			await instance.post('/users/register', data);
			setIsLoading(false);
			push('/auth/login');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.message);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				setError('An unexpected error occurred');
			}
		}
	};

	return (
		<AuthLayout
			error={error}
			title='Register'
			link='/auth/login'
			linkText='Have an account? Sign In '
		>
			<form
				className='flex flex-col gap-3'
				onSubmit={handleSubmit}
			>
				<label
					htmlFor='email'
					className='block'
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='email@example.com'
					className='border p-1.5 rounded'
				/>
				<label htmlFor='fullname'>Full Name</label>
				<input
					type='text'
					id='fullname'
					name='fullname'
					placeholder='fullname'
					className='border p-1.5 rounded'
				/>
				<label htmlFor='password'>Password</label>

				<input
					type='password'
					id='password'
					name='password'
					placeholder='***'
					className='border p-1.5 rounded'
				/>
				<button
					type='submit'
					className='bg-slate-800 text-white py-1.5 rounded shadow'
				>
					{isLoading ? 'Loading..' : 'Register'}
				</button>
			</form>
		</AuthLayout>
	);
};

export default RegisterView;
