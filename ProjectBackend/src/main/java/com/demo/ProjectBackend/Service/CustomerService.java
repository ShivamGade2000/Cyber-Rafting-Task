package com.demo.ProjectBackend.Service;

import java.util.List;
import java.util.Optional;


import com.demo.ProjectBackend.Dto.CustomerDto;
import com.demo.ProjectBackend.beans.Customer;
import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Request;

import jakarta.validation.Valid;

public interface CustomerService {
	
	Customer convertFromDto(CustomerDto cdto);
	
	CustomerDto convertToDto(Customer cust);

	void add(Customer customer);


	void add(Request req);

	Optional<Customer> getCust(int id);

	void deleteRequest(int id);

	Optional<Request> getRequest(int id);

	void addUser(CustomerDto cdto, Customer customer);

	Optional<Quotation> getQuote(int id);

	void add(Orders order);

	Optional<Orders> getOrder(int id);

	List<Request> getRequestsByCustomerId(int cId);

	List<Quotation> getQuotationByCustomerId(int cId);

	List<Orders> getOrderById(int cId);

	

}
