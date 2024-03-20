	package com.insta.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insta.instagram.service.UserService;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.User;
import com.insta.instagram.response.MessageResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/id/{id}")
	public ResponseEntity<User> findUserByIdHandler(@PathVariable Integer id) throws UserException{
		
		User user = userService.findUserById(id);
		
		return new ResponseEntity<User>(user,HttpStatus.OK);
		
	}
	
	@GetMapping("/username/{username}")
	public ResponseEntity<User> findUserByUsernameHandler(@PathVariable String username) throws UserException{
		User user = userService.findUserByUsername(username);
		 
		return new ResponseEntity<User>(user,HttpStatus.OK);
		
	}
	
	@PutMapping(value= "/follow/{followUserId}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<MessageResponse> followUserHandler(@PathVariable Integer followUserId,@RequestHeader("Authorization") String token) throws UserException{
		
		User user = userService.findUserProfile(token);
		String message = userService.followUser(user.getId(),followUserId);
		MessageResponse res = new MessageResponse(message);
		
	
		return new ResponseEntity<MessageResponse>(res,HttpStatus.OK);
	}
	
	@PutMapping(value = "/unfollow/{userId}",produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<MessageResponse> unfollowUserHandler(@PathVariable Integer userId,@RequestHeader("Authorization") String token) throws UserException{
		User user = userService.findUserProfile(token);
		String message = userService.unfollowUser(user.getId(),userId);
		MessageResponse res = new MessageResponse(message);
		return new ResponseEntity<MessageResponse>(res,HttpStatus.OK);
	}
	
	@GetMapping("/req")
	public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException{
		
		User user = userService.findUserProfile(token);
		
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	@GetMapping("/m/{userIds}")
	public ResponseEntity<List<User>> findUserByUserIdsnHandler(@PathVariable List<Integer> userIds) throws UserException{
		List<User> users = userService.findUserByIds(userIds);
		return new ResponseEntity<List<User>>(users,HttpStatus.OK);
		
	}
	
	// http://localhost:5454/api/users/search?q=AA2peren
	@GetMapping("/search")
	public ResponseEntity<List<User>> searchUserHandler(@RequestParam("q") String query) throws UserException{
		List<User> users = userService.searchUser(query);
		return new ResponseEntity<List<User>>(users,HttpStatus.OK);
	}
	
	@PutMapping(value="/account/edit", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<User> updateUserHandler(@RequestHeader("Authorization") String token, @RequestBody User user) throws UserException{
		User requser = userService.findUserProfile(token);
		
		User updatedUser = userService.updateUserDetails(user, requser);
		
		return new ResponseEntity<User>(updatedUser,HttpStatus.OK);
	}
	
	 @GetMapping("/suggestions")
	    public ResponseEntity<List<User>> getRecommendations() throws UserException {
	        List<User> recommendations = userService.recommendUsers();
	        return ResponseEntity.ok(recommendations);
	    }
}
