package com.insta.instagram.service;

import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.exceptions.CommentException;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.modal.Comment;

public interface CommentService {
	
	public Comment createComment(Comment comment, int postId, int userId) throws UserException, PostException;
	
	public Comment findCommentById(int commentId) throws CommentException;
	
	public Comment likeComment(int commentId, int userId) throws CommentException, UserException;
	
	public Comment unlikeComment(int commentId, int userId) throws CommentException, UserException;
}
