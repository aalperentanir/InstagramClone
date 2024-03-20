package com.insta.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.insta.instagram.modal.Story;

public interface StoryRepository extends JpaRepository<Story, Integer> {
	
	@Query("SELECT s FROM Story s WHERE s.user.id= :userId")
	List<Story> findAllStoryByUserId(@Param("userId") int userId);
}
