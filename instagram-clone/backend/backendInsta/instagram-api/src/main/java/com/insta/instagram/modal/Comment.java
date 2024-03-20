package com.insta.instagram.modal;

import com.insta.instagram.details.UserDetails;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Set;
import java.time.LocalDateTime;
import java.util.HashSet;

@Entity
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name="id",column=@Column(name="user_id")),
		@AttributeOverride(name="email",column=@Column(name="user_email"))
	})
	private UserDetails user;
	
	private String content;
	private LocalDateTime createdAt;
	
	@Embedded
	@ElementCollection
	private Set<UserDetails> likedByUsers = new HashSet<>();

	public Comment(int id, UserDetails user, String content, LocalDateTime createdAt, Set<UserDetails> likedByUsers) {
		super();
		this.id = id;
		this.user = user;
		this.content = content;
		this.createdAt = createdAt;
		this.likedByUsers = likedByUsers;
	}
	
    public Comment() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserDetails getUser() {
		return user;
	}

	public void setUser(UserDetails user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Set<UserDetails> getLikedByUsers() {
		return likedByUsers;
	}

	public void setLikedByUsers(Set<UserDetails> likedByUsers) {
		this.likedByUsers = likedByUsers;
	}
	
	
	

}
