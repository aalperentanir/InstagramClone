package com.insta.instagram.modal;

import java.time.LocalDateTime;

import com.insta.instagram.details.UserDetails;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;

@Entity
@Table(name="Stories")
public class Story {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name="id",column=@Column(name="user_id")),
		@AttributeOverride(name="email",column=@Column(name="user_email"))
	})
	private UserDetails user;
	private String caption;
	private LocalDateTime timeStamp;
	@NotNull
	private String image;

	public Story(int id, UserDetails user, String caption, LocalDateTime timeStamp, String image) {
		super();
		this.id = id;
		this.user = user;
		this.caption = caption;
		this.timeStamp = timeStamp;
		this.image = image;
	}
	
	public Story() {
		
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

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	

}
