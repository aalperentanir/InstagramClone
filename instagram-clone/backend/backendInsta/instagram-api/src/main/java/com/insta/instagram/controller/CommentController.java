package com.insta.instagram.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.insta.instagram.exceptions.CommentException;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.*;
import com.insta.instagram.service.*;

@RestController
@CrossOrigin()
@RequestMapping("/api/comments")
public class CommentController {
	@Autowired
	private CommentService commentService;
	@Autowired
	private UserService userService;
	
	@PostMapping("/create/{postId}")
	public ResponseEntity<Comment> createCommentHandler(@RequestBody Comment comment, @PathVariable int postId, @RequestHeader("Authorization") String token) throws UserException, PostException{
		User user = userService.findUserProfile(token);
		Comment createdComment = commentService.createComment(comment,postId,user.getId());
		return new ResponseEntity<Comment>(createdComment,HttpStatus.OK);
	}
	
	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comment> likeCommentHandler(@RequestHeader("Authorization") String token, @PathVariable int commentId) throws UserException, CommentException{
		User user = userService.findUserProfile(token);
		Comment comment = commentService.likeComment(commentId, user.getId());
		
		return new ResponseEntity<Comment>(comment,HttpStatus.OK);
	}
	
	@GetMapping("/{commentId}")
	public ResponseEntity<Comment> findCommentByIdHandler(@PathVariable int commentId) throws CommentException,UserException{
		Comment comment = commentService.findCommentById(commentId);
		return new ResponseEntity<Comment>(comment,HttpStatus.OK);
	}
	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<Comment> unlikeCommentHandler(@RequestHeader("Authorization") String token, @PathVariable int commentId) throws UserException, CommentException{
		User user = userService.findUserProfile(token);
		Comment comment = commentService.unlikeComment(commentId, user.getId());
		
		return new ResponseEntity<Comment>(comment,HttpStatus.OK);
	}
	
	

}
