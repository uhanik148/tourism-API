import { AuthLayout } from '@/components/layouts/AuthLayout';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginView = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { push, query } = useRouter();

	const callbackUrl: any = query.callbackUrl || '/';

	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			setError('');
			setIsLoading(true);

			const res = await signIn('credentials', {
				redirect: false,
				email: event.target.email.value,
				password: event.target.password.value,
				callbackUrl,
			});

			setIsLoading(false);
			if (!res?.error) {
				push(callbackUrl);
			} else {
				throw Error('wrong credential');
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.message);
				setIsLoading(false);
			} else if (error instanceof Error) {
				setIsLoading(false);
				setError(error.message);
			} else {
				setIsLoading(false);
				setError('error has an occured');
			}
		}
	};

	return (
		<AuthLayout
			error={error}
			title='Login'
			link='/auth/register'
			linkText="Don't have an account? Register "
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
					{isLoading ? 'Loading..' : 'Login'}
				</button>
			</form>
			<button
				className='mt-3 border-2 border-slate-800 w-full py-1.5 rounded shadow-sm'
				onClick={() => signIn('google', { callbackUrl, redirect: false })}
			>
				Sign In With Google
			</button>
		</AuthLayout>
	);
};

export default LoginView;
