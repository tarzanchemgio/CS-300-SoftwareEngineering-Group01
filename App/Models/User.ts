enum gender {
	male,
	female,
	custom,
}

class User {
	username: string = "";
	password: string = "";

	fullname?: string = "";
	dateOfBirth?: string = "";
	gender?: gender;
	email: string = "";
	phone: string = "";
}

export { User };
