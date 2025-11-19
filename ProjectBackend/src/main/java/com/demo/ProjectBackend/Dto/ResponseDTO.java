package com.demo.ProjectBackend.Dto;

import java.util.List;


import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Request;



public class ResponseDTO {
	
	private List<Request> requests;
	private List<Quotation> quotations;
	private List<Orders> orders;
	public ResponseDTO(List<Request> requests, List<Quotation> quotations, List<Orders> orders) {
		super();
		this.requests = requests;
		this.quotations = quotations;
		this.orders = orders;
	}
	public ResponseDTO() {
		super();
	}
	public List<Request> getRequests() {
		return requests;
	}
	public void setRequests(List<Request> requests) {
		this.requests = requests;
	}
	public List<Quotation> getQuotations() {
		return quotations;
	}
	public void setQuotations(List<Quotation> quotations) {
		this.quotations = quotations;
	}
	public List<Orders> getOrders() {
		return orders;
	}
	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}
	@Override
	public String toString() {
		return "ResponseDTO [requests=" + requests + ", quotations=" + quotations + ", orders=" + orders + "]";
	}
	
	

}
