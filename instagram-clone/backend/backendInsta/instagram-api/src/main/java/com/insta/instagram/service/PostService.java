package com.insta.instagram.service;

import java.util.List;

import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Post;

public interface PostService{ 
	
	public Post createPost(Post post, int userId) throws UserException;
	public String deletePost(int postId, int userId) throws UserException,PostException;
	public List<Post> findPostByUserId(int userId) throws UserException;
	public Post findPostById(int postId) throws PostException;
	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException,UserException;
	public String savedPost(int postId,int userId) throws PostException,UserException;
	public String unSavedPost(int postId, int userId) throws PostException,UserException;
	public Post likePost(int postId,int userId) throws UserException,PostException;
	public Post unlikePost(int postId,int userId) throws UserException,PostException;
	

}
