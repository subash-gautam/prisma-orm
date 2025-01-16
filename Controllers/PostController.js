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
		orderBy: {
			created_at: "desc",
		},
		where: {
			comment_count: {
				gt: 0,
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

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: parseInt(id),
			},
			include: {
				Comments: {
					include: {
						user: {
							select: {
								name: true,
								email: true,
							},
						},
					},
				},
			},
		});

		if (!post) {
			return res.status(404).json({
				status: 404,
				message: "Post not found.",
			});
		}

		return res.status(200).json({
			status: 200,
			data: post,
			message: "Post fetched successfully.",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			message: "An error occurred while fetching the post.",
		});
	}
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
