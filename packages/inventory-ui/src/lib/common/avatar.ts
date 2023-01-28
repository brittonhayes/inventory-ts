import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

export const avatar = async (employee: string) => {
	return createAvatar(initials, {
		seed: employee
	}).toDataUri();
};
