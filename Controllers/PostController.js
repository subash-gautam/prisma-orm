import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
	const { user_id, title, description } = req.body;

	const newPost = await prisma.post.create({
		data: {
			user_id: parseInt(user_id),
			title,
			description,
		},
	});

	return res.json({
		status: 200,
		data: newPost,
		message: "Post Created Successfully ..",
	});
};

export const getPosts = async (req, res) => {
	const posts = await prisma.post.findMany({
		include: {
			_count: {
				select: {
					Comments: true,
				},
			},
		},
	});

	return res.json({
		status: 200,
		data: posts,
		message: "All posts are fetched.",
	});
};

export const getPostsByUser = async (req, res) => {
	const { user_id } = req.params;

	const posts = await prisma.post.findMany({
		where: {
			user_id: parseInt(user_id),
		},
	});

	return res.json({
		status: 200,
		data: posts,
		message: "All posts by the user are fetched.",
	});
};

// Get a post by its ID.
export const getPostById = async (req, res) => {
	const { id } = req.params;

	const post = await prisma.post.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			Comments: true,
		},
	});

	return res.json({
		status: 200,
		data: post,
		message: "Post fetched successfully.",
	});
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	const updatedPost = await prisma.post.update({
		where: {
			id: parseInt(id),
		},
		data: {
			title,
			description,
		},
	});

	return res.json({
		status: 200,
		data: updatedPost,
		message: "Post updated successfully.",
	});
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	const post = await prisma.post.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!post) {
		return res.json({
			status: 404,
			message: "Post not found.",
		});
	}

	const deletedPost = await prisma.post.delete({
		where: {
			id: parseInt(id),
		},
	});

	return res.json({
		status: 200,
		data: deletedPost,
		message: "Post deleted successfully.",
	});
};
