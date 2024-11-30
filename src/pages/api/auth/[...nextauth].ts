import { signIn, signInWithGoogle } from '@/libs/firebase/service';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

const authOption: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				const userData = credentials as {
					email: string;
					password: string;
				};

				const user = await signIn(userData);

				if (!user) {
					return null;
				}

				console.log(user);
				return user;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async jwt({ token, account, profile, user }: any) {
			if (account?.provider === 'credentials') {
				token.email = user.email;
				token.fullname = user.fullname;
				token.phone = user.phone;
				token.role = user.role;
			}
			if (account?.provider === 'google') {
				const data = {
					fullname: user.name,
					email: user.email,
					image: user.image,
					type: 'google',
				};
				await signInWithGoogle(data, (result: { status: boolean; message: string; data: any }) => {
					if (result.status) {
						token.email = result.data.email;
						token.fullname = result.data.fullname;
						token.type = result.data.type;
						token.image = result.data.image;
						token.role = result.data.role;
					}
				});
			}

			return token;
		},
		async session({ session, token }: any) {
			if ('email' in token) {
				session.user.email = token.email;
			}
			if ('fullname' in token) {
				session.user.fullname = token.fullname;
			}
			if ('image' in token) {
				session.user.image = token.image;
			}
			if ('role' in token) {
				session.user.role = token.role;
			}

			const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || '', {
				algorithm: 'HS256',
			});

			session.accessToken = accessToken;

			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
	},
};

export default NextAuth(authOption);
