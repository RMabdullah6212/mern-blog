import { errorHandler } from "../utils/error.js"
import Post from '../models/post.model.js';

export const create =  async (req, res, next) => {
if (!req.body.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create post'));
}
if (!req.body.content || req.body.title) {
    return next(errorHandler(400, 'plese fill all required field'))
}
const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
};