package com.insta.instagram.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

import com.insta.instagram.modal.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
	
}
