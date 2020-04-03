import { User } from './models/User';

const isWhitespace = new RegExp('s');

export function userValidation(user: User): boolean {
	if (
		user.firstName === '' ||
		isWhitespace.test(user.firstName) ||
		user.firstName.length > 64
	) {
		return false;
	}
	if (
		user.lastName === '' ||
		isWhitespace.test(user.lastName) ||
		user.lastName.length > 64
	) {
		return false;
	}
	if (
		user.username === '' ||
		isWhitespace.test(user.username) ||
		user.username.length > 64
	) {
		return false;
	}
	if (
		user.email === '' ||
		isWhitespace.test(user.email) ||
		user.email.length > 256
	) {
		return false;
	}
	if (
		user.password === '' ||
		isWhitespace.test(user.password) ||
		user.password.length > 64
	) {
		return false;
	}
	return true;
}
