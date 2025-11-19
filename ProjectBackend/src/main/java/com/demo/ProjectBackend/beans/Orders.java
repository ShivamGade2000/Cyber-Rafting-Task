package com.demo.ProjectBackend.beans;

import java.time.LocalDate;


import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;


@Entity
public class Orders {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int oId;
	
	
	private String  orderStatus;
	
	private String paymentStatus;
	@OneToOne()
	private Quotation quotation;
	
	private String orderDate;
	@ManyToOne
	@JoinColumn(name="c_id")
	private Customer customer;
	@ManyToOne
	@JoinColumn(name="v_id")
	private Vendor vendor;
	
	
	public Orders(String orderStatus, String paymentStatus, Quotation quotation, String orderDate, Customer customer,
			Vendor vendor) {
		super();
		this.orderStatus = orderStatus;
		this.paymentStatus = paymentStatus;
		this.quotation = quotation;
		this.orderDate = orderDate;
		this.customer = customer;
		this.vendor = vendor;
	}


	public Orders() {
		super();
	}


	public int getoId() {
		return oId;
	}


	public void setoId(int oId) {
		this.oId = oId;
	}


	public String getOrderStatus() {
		return orderStatus;
	}


	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}


	public String getPaymentStatus() {
		return paymentStatus;
	}


	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}


	public Quotation getQuotation() {
		return quotation;
	}


	public void setQuotation(Quotation quotation) {
		this.quotation = quotation;
	}


	public String getOrderDate() {
		return orderDate;
	}


	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
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


	@Override
	public String toString() {
		return "Orders [oId=" + oId + ", orderStatus=" + orderStatus + ", paymentStatus=" + paymentStatus
				+ ", quotation=" + quotation + ", orderDate=" + orderDate + ", customer=" + customer + ", vendor="
				+ vendor + "]";
	}

	
	

	

	

}
