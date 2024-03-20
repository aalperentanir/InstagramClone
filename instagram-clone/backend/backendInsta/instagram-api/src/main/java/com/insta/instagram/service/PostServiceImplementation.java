package com.insta.instagram.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insta.instagram.details.UserDetails;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Post;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.PostRepository;
import com.insta.instagram.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService{
	
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;

	@Override
	public Post createPost(Post post,int userId) throws UserException {
		User user = userService.findUserById(userId);
		UserDetails userDt = new UserDetails();
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUserImage(user.getImage());
		userDt.setUsername(user.getUsername());
		
		post.setUser(userDt);
		
		Post createdPost = postRepository.save(post);
		
		return createdPost;
	}

	@Override
	public String deletePost(int postId, int userId) throws UserException, PostException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getUser().getId() == user.getId()) {
			postRepository.deleteById(post.getId());
			return "Post deleted successfully";
	  }
		throw new PostException("You can't delete other user's posts");
	}
	
	@Override
	public List<Post> findPostByUserId(int userId) throws UserException {
		List<Post> posts = postRepository.findByUserId(userId);
		
		if(posts.size() == 0) {
			throw new UserException("This user doesn't have any post");
		}
		return posts;
	}

	@Override
	public Post findPostById(int postId) throws PostException {
		Optional<Post> opt = postRepository.findById(postId);
		
		if(opt.isPresent()) {
			return opt.get();		
			}
		throw new PostException("Post not found with id :" + postId);
	}
	
	@Override
	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException {
		List<Post> posts = postRepository.findAllPostByUserIds(userIds);
		
		if(posts.size()==0) {
			throw new PostException("No post available");
		}
		return posts;
	}

	@Override
	public String savedPost(int postId, int userId) throws PostException, UserException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(!user.getSavedPost().contains(post)) {
			user.getSavedPost().add(post);
			userRepository.save(user);
			
		}
		
		return "Post saved successfully";
	}

	@Override
	public String unSavedPost(int postId, int userId) throws PostException, UserException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
			userRepository.save(user);
			
		}
		
		return "Post remove successfully";
	}

	@Override
	public Post likePost(int postId, int userId) throws UserException, PostException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		UserDetails userDt = new UserDetails();
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUserImage(user.getImage());
		userDt.setUsername(user.getUsername());
		
		post.getLikedByUser().add(userDt);
		
		return postRepository.save(post);
	}

	@Override
	public Post unlikePost(int postId, int userId) throws UserException, PostException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		UserDetails userDt = new UserDetails();
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUserImage(user.getImage());
		userDt.setUsername(user.getUsername());
		
		post.getLikedByUser().remove(userDt);
		
		return postRepository.save(post);
	}

}
