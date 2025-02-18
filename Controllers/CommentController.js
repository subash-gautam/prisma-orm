import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
	const { user_id, post_id, comment } = req.body;

	const newComment = await prisma.comment.create({
		data: {
			user_id: parseInt(user_id),
			post_id: parseInt(post_id),
			comment,
		},
	});

	// Update the comment count of the related post
	await prisma.post.update({
		where: { id: post_id },
		data: {
			comment_count: {
				increment: 1,
			},
		},
	});

	return res.json({
		status: 200,
		data: newComment,
		message: "Comment Created Successfully ..",
	});
};

// Get all comments of a post.
export const getComments = async (req, res) => {
	const { post_id } = req.params;

	const comments = await prisma.comment.findMany({
		where: {
			post_id: parseInt(post_id),
		},
	});

	return res.json({
		status: 200,
		data: comments,
		message: "All Comments of the post ..",
	});
};

// Update a comment.
export const updateComment = async (req, res) => {
	const { comment_id } = req.params;
	const { comment } = req.body;

	const existingComment = await prisma.comment.findUnique({
		where: {
			id: comment_id,
		},
	});

	if (!existingComment) {
		return res.status(404).json({
			status: 404,
			message: "Comment not found.",
		});
	}

	const updatedComment = await prisma.comment.update({
		where: {
			id: comment_id,
		},
		data: {
			comment,
		},
	});

	return res.json({
		status: 200,
		data: updatedComment,
		message: "Comment Updated Successfully ..",
	});
};

// Delete a comment.
export const deleteComment = async (req, res) => {
	const { comment_id } = req.params;

	const existingComment = await prisma.comment.findUnique({
		where: {
			id: comment_id,
		},
	});

	if (!existingComment) {
		return res.status(404).json({
			status: 404,
			message: "Comment not found.",
		});
	}

	const deletedComment = await prisma.comment.delete({
		where: {
			id: comment_id,
		},
	});

	// Decrease the comment counter
	await prisma.post.update({
		where: {
			id: Number(post_id),
		},
		data: {
			comment_count: {
				decrement: 1,
			},
		},
	});

	return res.json({
		status: 200,
		data: deletedComment,
		message: "Comment Deleted Successfully ..",
	});
};
