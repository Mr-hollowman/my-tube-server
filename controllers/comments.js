import Comment from "../models/Comment.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save()
    res.status(200).send(savedComment)
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
