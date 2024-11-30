import AdminLayout from '@/components/layouts/AdminLayout';
import styles from './Dashboard.module.scss';
import { useSession } from 'next-auth/react';

const DashboardAdminView = () => {
	const { data }: any = useSession();
	return (
		<AdminLayout>
			<h1>Welcome, {data.user.fullname}!</h1>
		</AdminLayout>
	);
};

export default DashboardAdminView;
