import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import userServices from '@/services/user';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const ModalUpdateUser = (props: any) => {
	const { updatedUser, setUpdatedUser, setUsersData } = props;
	const [isLoading, setIsLoading] = useState(false);
	const session: any = useSession();

	const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		const form: any = event.target as HTMLFormElement;
		const data = {
			role: form.role.value,
		};

		console.log(updatedUser.id);
		const result = await userServices.updateUser(updatedUser.id, data, session.data?.accessToken);
		console.log('result');
		console.log(result);

		if (result.status === 200) {
			setUpdatedUser({});
			const { data } = await userServices.getAllUsers();
			setUsersData(data.data);
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	};
	return (
		<Modal onClose={() => setUpdatedUser({})}>
			<h1>Update User</h1>
			<form onSubmit={handleUpdateUser}>
				<Input
					label='Email'
					name='email'
					type='email'
					defaultValue={updatedUser.email}
					disabled
				/>
				<Input
					label='Fullname'
					name='fullname'
					type='text'
					defaultValue={updatedUser.fullname}
					disabled
				/>
				<Input
					label='Phone'
					name='phone'
					type='number'
					defaultValue={updatedUser.phone}
					disabled
				/>
				<Select
					label='Role'
					name='role'
					defaultValue={updatedUser.role}
					options={[
						{ label: 'Admin', value: 'admin' },
						{ label: 'Member', value: 'member' },
					]}
				/>
				<Button
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Updating...' : 'Update'}
				</Button>
			</form>
		</Modal>
	);
};

export default ModalUpdateUser;
