import UserAdminView from '@/components/views/admin/Users';
import userServices from '@/services/user';
import { useEffect, useState } from 'react';

const AdminUsersPage = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const getAllUsers = async () => {
			const { data } = await userServices.getAllUsers();

			if (data.status !== 404) {
				setUsers(data.data);
			} else {
				setUsers([]);
				console.log('No users found.');
			}
		};
		getAllUsers();
	}, []);

	return (
		<>
			<UserAdminView users={users} />
		</>
	);
};

export default AdminUsersPage;
