package com.insta.instagram.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insta.instagram.details.UserDetails;
import com.insta.instagram.exceptions.StoryException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Story;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.*;

@Service
public class StoryServiceImplementation implements StoryService {
	
	@Autowired
	private StoryRepository storyRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	

	@Override
	public Story createStory(Story story, int userId) throws UserException {
		User user = userService.findUserById(userId);
		
		UserDetails userDt = new UserDetails();
		
		userDt.setEmail(user.getEmail());
		userDt.setId(user.getId());
		userDt.setName(user.getName());
		userDt.setUsername(user.getUsername());
		userDt.setUserImage(user.getImage());
		
		story.setUser(userDt);
		story.setTimeStamp(LocalDateTime.now());
		
		user.getStories().add(story);
		return storyRepository.save(story);
	}

	@Override
	public List<Story> findStoryByUserId(int userId) throws UserException, StoryException {
		User user = userService.findUserById(userId);
		List<Story> stories = user.getStories();
		System.out.println("stories:"+stories);
		if(stories.size()== 0) {
			throw new StoryException("This user doesnt have any story");
		}
		return stories;
	}

}
