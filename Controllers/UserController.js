import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	const findUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (findUser) {
		return res.status(400).json({ message: "User already exists" });
	}

	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password,
		},
	});

	return res.json({
		status: 200,
		data: newUser,
		message: "User Created Successfully ..",
	});
};

export const getUsers = async (req, res) => {
	const users = await prisma.user.findMany();

	return res.json({
		status: 200,
		data: users,
	});
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	const updatedUser = await prisma.user.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name,
			email,
			password,
		},
	});

	return res.json({
		status: 200,
		data: updatedUser,
		message: "User Updated Successfully ..",
	});
};

export const getUserById = async (req, res) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	return res.json({
		status: 200,
		data: user,
	});
};
