import { collection, getFirestore, getDocs, doc, getDoc, where, query, addDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { app, auth } from './init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import * as argon from 'argon2';

const storage = getStorage(app);
const firestore = getFirestore(app);

export async function getData(collectionName: string) {
	const snapShot = await getDocs(collection(firestore, collectionName));

	const data = snapShot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
}

export async function getDataByID(collectionName: string, id: string) {
	const snapshot = await getDoc(doc(firestore, collectionName, id));
	const data = snapshot.data();
	return data;
}

export async function getDataByField(collectionName: string, field: string, value: string) {
	const q = query(collection(firestore, collectionName), where(field, '==', value));

	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return data;
}

export async function addData(collectionName: string, data: any, callback: Function) {
	await addDoc(collection(firestore, collectionName), data)
		.then((res) => {
			callback(true, res);
		})
		.catch((error) => {
			callback(false);
		});
}

export async function updateData(collectionName: string, id: string, data: any, callback: Function) {
	const docRef = doc(firestore, collectionName, id);
	await updateDoc(docRef, data)
		.then(() => {
			callback(true);
		})
		.catch(() => {
			callback(false);
		});
}

export async function deleteData(collectionName: string, id: string, callback: Function) {
	const docRef = doc(firestore, collectionName, id);
	await deleteDoc(docRef)
		.then(() => {
			callback(true);
		})
		.catch(() => {
			callback(false);
		});
}

export async function uploadFile(userid: string, file: any, callback: Function) {
	if (file) {
		if (file.size < 1048576) {
			const newName = 'profile.' + file.name.split('.')[1];
			const storageRef = ref(storage, `images/users/${userid}/${newName}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log("Upload is " + progress + "% done");
					// switch (snapshot.state) {
					//   case "paused":
					//     console.log("Upload is paused");
					//     break;
					//   case "running":
					//     console.log("Upload is running");
					//     break;
					//   default:
					//     break;
					// }
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
						callback(true, downloadURL);
					});
				}
			);
		} else {
			return callback(false);
		}
	}

	return true;
}

export async function signIn(userData: { email: string; password: string }) {
	try {
		const userQuery = query(collection(firestore, 'users'), where('email', '==', userData.email));

		const usersSnapshot = await getDocs(userQuery);

		const users = usersSnapshot.docs.map((user) => ({
			id: user.id,
			...user.data(),
		}));

		const user = users[0] as { id: string; email: string; password: string };

		if (!user) {
			throw Error(`user with email address: ${userData.email} is not registered`);
		}

		const checkPassword = await argon.verify(user.password, userData.password);

		if (checkPassword === false) {
			throw Error('wrong credential');
		}

		return user;
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			throw Error(error.code);
		} else if (error instanceof Error) {
			throw Error(error.message);
		} else {
			throw Error('Unknown error occurred');
		}
	}
}

export async function signUp(userData: { email: string; fullname: string; password: string; role?: string }) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

		const user = userCredential.user;

		await setDoc(doc(firestore, 'users', user.uid), {
			email: userData.email,
			fullname: userData.fullname,
			password: await argon.hash(userData.password),
			role: userData.role || 'member',
			auth_id: user.uid,
		});

		return userData;
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			throw Error(error.code);
		} else if (error instanceof Error) {
			throw Error(error.message);
		} else {
			throw Error('Unknown error occurred');
		}
	}
}

export async function signInWithGoogle(userData: any, callback: Function) {
	const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
	const snapshot = await getDocs(q);
	const data: any = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	if (data.length > 0) {
		userData.role = data[0].role;
		await updateDoc(doc(firestore, 'users', data[0].id), userData)
			.then(() => {
				callback({
					status: true,
					message: 'sign in with google success',
					data: userData,
				});
			})
			.catch(() => {
				callback({ status: false, message: 'sign in with google failed' });
			});
	} else {
		userData.role = 'member';
		await addDoc(collection(firestore, 'users'), userData)
			.then(() => {
				callback({
					status: true,
					message: 'sign in with google success',
					data: userData,
				});
			})
			.catch(() => {
				callback({ status: false, message: 'sign in with google failed' });
			});
	}
}
