package com.demo.ProjectBackend.beans;

import com.fasterxml.jackson.annotation.JsonProperty;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Customer {
	
	public int getCId() {
		return CId;
	}

	public void setCId(int cId) {
		CId = cId;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int CId;
	@JsonProperty("firstName")
	private String fName;
	@JsonProperty("lastName")
	private String lName;
	private String mobile;
	@Column(unique=true)
	private String email;
	private String city;
	private String pincode;

	public Customer(String fName, String lName, String mobile, String email, String city, String pincode) {
		super();
		this.fName = fName;
		this.lName = lName;
		this.mobile = mobile;
		this.email = email;
		this.city = city;
		this.pincode = pincode;
	}

	public Customer() {
		super();
	}

	@Override
	public String toString() {
		return "Customer [CId=" + CId + ", fName=" + fName + ", lName=" + lName + ", mobile=" + mobile + ", email="
				+ email + ", city=" + city + ", pincode=" + pincode + "]";
	}




	
	
	
	

}
