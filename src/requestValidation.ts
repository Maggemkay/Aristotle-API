import { User } from './models/User';
import { type } from 'os';

export function userValidation(user: User): boolean {
	if (user.firstName.length > 64) {
		return false;
	}
	if (user.lastName.length > 64) {
		return false;
	}
	if (user.username.length > 64) {
		return false;
	}
	if (user.email.length > 256) {
		return false;
	}
	if (user.password.length > 64) {
		return false;
	}
	return true;
}
