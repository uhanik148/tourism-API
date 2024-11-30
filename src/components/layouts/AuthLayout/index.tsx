import Link from 'next/link';
import React from 'react';

type Proptypes = {
	error?: string;
	title?: string;
	children: React.ReactNode;
	link: string;
	linkText?: string;
};

export const AuthLayout = (props: Proptypes) => {
	const { error, title, children, link, linkText } = props;

	return (
		<div className='flex justify-center items-center flex-col pt-20'>
			<h1 className='font-semibold text-2xl'>{title}</h1>
			{error && <p className='text-red-500'>{error}</p>}
			<div className='w-96'>{children}</div>
			<p className='mt-8'>
				{linkText}
				<Link
					href={link}
					className='underline'
				>
					here
				</Link>
			</p>
		</div>
	);
};
