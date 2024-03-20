package com.insta.instagram.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.insta.instagram.modal.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	
	public Optional<User> findByUsername(String username);
	
	public Optional<User> findByEmail(String email);
	
	
	@Query("SELECT u FROM User u WHERE u.id IN :users")
	public List<User> findAllUsersByUserIds(@Param("users") List<Integer> userIds);
	
	@Query("SELECT DISTINCT u FROM User u WHERE u.username LIKE %:query% OR u.email LIKE %:query%")
	public List<User> findByQuery(@Param("query") String query);
	
		
	

}
