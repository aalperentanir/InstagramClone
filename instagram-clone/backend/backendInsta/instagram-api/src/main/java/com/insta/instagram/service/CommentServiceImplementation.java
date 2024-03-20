package com.insta.instagram.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.insta.instagram.details.*;
import com.insta.instagram.exceptions.CommentException;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.*;
import com.insta.instagram.repository.CommentRepository;
import com.insta.instagram.repository.PostRepository;

@Service
public class CommentServiceImplementation implements CommentService{
	
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private PostService postService;
	@Autowired
	private PostRepository postRepository;

	@Override
	public Comment createComment(Comment comment, int postId, int userId) throws UserException, PostException {
		User user = userService.findUserById(userId);
		
		Post post = postService.findPostById(postId);
		
		UserDetails userDt = new UserDetails();
		
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUsername(user.getUsername());
		userDt.setUserImage(user.getImage());
		
		comment.setUser(userDt);
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment createdComment = commentRepository.save(comment);
		
		post.getComments().add(createdComment);
		
		postRepository.save(post);
		
		return createdComment;
	}

	@Override
	public Comment findCommentById(int commentId) throws CommentException {
		Optional<Comment> opt = commentRepository.findById(commentId);
		if(opt.isPresent()) {
			return opt.get();
		}else{
			throw new CommentException("Comment is not exist with id " + commentId);
		}	
	}

	@Override
	public Comment likeComment(int commentId, int userId) throws CommentException, UserException {
		User user = userService.findUserById(userId);
		Comment comment = findCommentById(commentId);
		
		UserDetails userDt = new UserDetails();
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUsername(user.getUsername());
		userDt.setUserImage(user.getImage());
		
		comment.getLikedByUsers().add(userDt);
		
		return commentRepository.save(comment);
	}

	@Override
	public Comment unlikeComment(int commentId, int userId) throws CommentException, UserException {
		User user = userService.findUserById(userId);
		Comment comment = findCommentById(commentId);
		
		UserDetails userDt = new UserDetails();
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUsername(user.getUsername());
		userDt.setUserImage(user.getImage());
		
		comment.getLikedByUsers().remove(userDt);
		
		return commentRepository.save(comment);
	}
	
	

}
