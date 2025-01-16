import { skip } from "@prisma/client/runtime/library";
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
	page = Number(req.query.page) || 1;
	limit = Number(req.query.limit) || 3;

	if (page <= 0) {
		page = 1;
	}
	if (limit <= 0 || limit > 10) {
		limit = 10;
	}

	skip = (page - 1) * limit;

	const posts = await prisma.post.findMany({
		skip: 0,
		take: 2,
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

export const searchPost = async (req, res) => {
	const { query } = req.query.q;

	const posts = await prisma.post.findMany({
		where: {
			description: {
				search: query,
			},
		},
	});

	return res.json({
		status: 200,
		data: posts,
		message: "Posts fetched successfully.",
	});
};
