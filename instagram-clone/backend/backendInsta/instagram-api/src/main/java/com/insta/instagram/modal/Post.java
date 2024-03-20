package com.insta.instagram.modal;

import java.time.LocalDateTime;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.*;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name="Posts")
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String caption;
	private String image;
	private String location;
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name="id",column=@Column(name="user_id")),
		@AttributeOverride(name="email",column=@Column(name="user_email"))
	})
	private UserDetails user;
	private LocalDateTime createdAt;
	
	@Embedded
	@ElementCollection
	@JoinTable(name="likedByUsers", joinColumns = @JoinColumn(name="user_id"))
	private Set<UserDetails> likedByUser = new HashSet<>();
	@OneToMany
	private List<Comment> comments= new ArrayList<>();
	
	public Post(int id, String caption, String image, String location, UserDetails user, LocalDateTime createdAt,
			Set<UserDetails> likedByUser, List<Comment> comments) {
		super();
		this.id = id;
		this.caption = caption;
		this.image = image;
		this.location = location;
		this.user = user;
		this.createdAt = createdAt;
		this.likedByUser = likedByUser;
		this.comments = comments;
	}
	
	public Post() {
		
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCaption() {
		return caption;
	}
	public void setCaption(String caption) {
		this.caption = caption;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public UserDetails getUser() {
		return user;
	}
	public void setUser(UserDetails user) {
		this.user = user;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public Set<UserDetails> getLikedByUser() {
		return likedByUser;
	}
	public void setLikedByUser(Set<UserDetails> likedByUser) {
		this.likedByUser = likedByUser;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	
	
	
}
