package com.demo.ProjectBackend.Service;

import java.util.List;
import java.util.Optional;

import com.demo.ProjectBackend.beans.Request;

import com.demo.ProjectBackend.Dto.CustomerDto;
import com.demo.ProjectBackend.Dto.VendorDto;
import com.demo.ProjectBackend.beans.Customer;
import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Vendor;


import jakarta.validation.Valid;

public interface VendorService {
	
	Vendor convertFromDto(VendorDto vdto);
	
	VendorDto convertToDto(Vendor vendor);

	void add(Vendor Vendor);

	Optional<Vendor> getVendor(int getvId);

	void addQuote(Quotation quotation);

	Optional<Request> getRequest(Integer attribute);

	void deleteQuote(int id);

	void addUser(@Valid VendorDto vdto, Vendor vendor);

	Optional<Orders> getOrder(int id);

	void updateOrder(Orders order);

	List<Request> getAll();

	List<Quotation> getQuotationByVendorId(int vId);

	List<Orders> getOrderByVendorId(int vId);


}
