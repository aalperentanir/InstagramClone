package com.insta.instagram.modal;

import com.insta.instagram.details.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.*;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String username;
	private String bio;
	private String email;
	private String gender;
	private String image;
	private String password;
	private String mobile;
	private String website;
	private String profileImage;
	
	@Embedded
	@ElementCollection
	private Set<UserDetails> following = new HashSet<>();
	
	@Embedded
	@ElementCollection
	private Set<UserDetails> follower= new HashSet<>();
	
	@ManyToMany
	private List<Post> savedPost = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Story> stories = new ArrayList<>();
	
	
	
	public User() {

	}

	public User(int id, String name, String username, String bio, String email, String gender, String image,
			String password, String mobile, String website, Set<UserDetails> follower, Set<UserDetails> following,
			List<Story> stories, List<Post> savedPost,String profileImage) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
		this.bio = bio;
		this.email = email;
		this.gender = gender;
		this.image = image;
		this.password = password;
		this.mobile = mobile;
		this.website = website;
		this.follower = follower;
		this.following = following;
		this.stories = stories;
		this.savedPost = savedPost;
		this.profileImage=profileImage;
	}
	
	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public Set<UserDetails> getFollower() {
		return follower;
	}
	public void setFollower(Set<UserDetails> follower) {
		this.follower = follower;
	}
	public Set<UserDetails> getFollowing() {
		return following;
	}
	public void setFollowing(Set<UserDetails> following) {
		this.following = following;
	}
	public List<Story> getStories() {
		return stories;
	}
	public void setStories(List<Story> stories) {
		this.stories = stories;
	}
	public List<Post> getSavedPost() {
		return savedPost;
	}
	public void setSavedPost(List<Post> savedPost) {
		this.savedPost = savedPost;
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", username=" + username + ", bio=" + bio + ", email=" + email
				+ ", gender=" + gender + ", image=" + image + ", password=" + password + ", mobile=" + mobile
				+ ", website=" + website + ", follower=" + follower + ", following=" + following + "]";
	}


	
	
	
	
	
	
	
	
	
	

}
