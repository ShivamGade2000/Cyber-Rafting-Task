package com.demo.ProjectBackend.beans;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity

public class Request {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int rId;
	
	@ManyToOne
	@JoinColumn(name="c_id")
	private Customer customer;
	
	@OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quotation> quotations = new ArrayList<>();
	
	//@NotBlank(message="Required field!")
	private String propertyType;
	
	
	//@NotBlank(message="Required field!")
	private String address;
	
	@NotNull(message = "Electricity Bill cannot be null")
    @DecimalMin(value = "0.0", inclusive = true, message = "Electricity Bill must be a positive number")
	//@NotBlank(message="Required field!")
	@JsonProperty("electricityBill")
	private float ebill;
	
	@NotNull(message = "Electricity Consumption cannot be null")
    @DecimalMin(value = "0.0", inclusive = true, message = "Electricity Consumption must be a positive number")
	@JsonProperty("electricityConsumption")
	//@NotBlank(message="Required field!")
	private float econsum;
	

	public Request(Customer customer, String propertyType, String address, float ebill, float econsum) {
		super();
		this.customer = customer;
		this.propertyType = propertyType;
		this.address = address;
		this.ebill = ebill;
		this.econsum = econsum;
	}


	public Request() {
		super();
	}


	public int getrId() {
		return rId;
	}


	public void setrId(int rId) {
		this.rId = rId;
	}


	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}


	public String getPropertyType() {
		return propertyType;
	}


	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public float getEbill() {
		return ebill;
	}


	public void setEbill(float ebill) {
		this.ebill = ebill;
	}


	public float getEconsum() {
		return econsum;
	}


	public void setEconsum(float econsum) {
		this.econsum = econsum;
	}


	@Override
	public String toString() {
		return "Request [rId=" + rId + ", customer=" + customer + ", propertyType=" + propertyType + ", address="
				+ address + ", ebill=" + ebill + ", econsum=" + econsum + "]";
	}

	

	
	

}
