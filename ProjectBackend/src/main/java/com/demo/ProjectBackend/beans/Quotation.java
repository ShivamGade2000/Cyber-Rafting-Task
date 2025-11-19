package com.demo.ProjectBackend.beans;

import java.time.LocalDate;


import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Quotation {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int qId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="r_id")
	private Request request;
	
	@ManyToOne
	@JoinColumn(name="c_id")
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name="v_id")
	private Vendor vendor;
	
	//@NotBlank(message="Required field!")
	private double price;
	
	@OneToOne(mappedBy = "quotation", cascade = CascadeType.ALL, orphanRemoval = true)
	private Orders order;
	
	 @DateTimeFormat(pattern = "yyyy-MM-dd")
	//@NotBlank(message="Required field!")
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate deliverydate;
	
	
	public Quotation() {
		super();
	}


	public Quotation(int qId, Request request, Customer customer, Vendor vendor,double price,
		 LocalDate deliverydate) {
		super();
		this.qId = qId;
		this.request = request;
		this.customer = customer;
		this.vendor = vendor;
		this.price = price;
		this.deliverydate = deliverydate;
	}


	public int getqId() {
		return qId;
	}


	public void setqId(int qId) {
		this.qId = qId;
	}


	public Request getRequest() {
		return request;
	}


	public void setRequest(Request request) {
		this.request = request;
	}


	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}


	public Vendor getVendor() {
		return vendor;
	}


	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public LocalDate getDeliverydate() {
		return deliverydate;
	}


	public void setDeliverydate(LocalDate deliverydate) {
		this.deliverydate = deliverydate;
	}


	@Override
	public String toString() {
		return "Quotation [qId=" + qId + ", request=" + request + ", customer=" + customer + ", vendor=" + vendor
				+ ", price=" + price + ", deliverydate=" + deliverydate + "]";
	}
	
	
	
	
	
	

}
