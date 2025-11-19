 package com.demo.ProjectBackend.Controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.ProjectBackend.Dto.CustomerDto;
import com.demo.ProjectBackend.Dto.ResponseDTO;
import com.demo.ProjectBackend.Service.CustomUserDetailsService;
import com.demo.ProjectBackend.Service.CustomerService;
import com.demo.ProjectBackend.beans.Customer;
import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Request;
import com.demo.ProjectBackend.beans.User;
import com.demo.ProjectBackend.beans.Vendor;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/customer")
public class CustomerController {

	private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);
	@Autowired
	private CustomerService cservice;
	@Autowired
	private CustomUserDetailsService uservice;

	@GetMapping("/addrequest")
	public String requestForm() {
		return "request";
	}

	@PostMapping("/submitrequest")
	public String submitRequest(@RequestBody Request req) {
		User user = uservice.getLoggedInUser();
		Customer customer = user.getCustomer();
		System.out.println(customer);
		req.setCustomer(customer);
		cservice.add(req);
		return "cdashboard";
	}

	@DeleteMapping("/deleterequest/{id}")
	public ResponseEntity<String> deleteRequest(@PathVariable("id") int id) {
		 logger.info("Delete request received with ID: {}", id);
		Customer customer = uservice.getLoggedInUser().getCustomer();
		System.out.println(customer);
		if (customer != null) {
			Optional<Request> request = cservice.getRequest(id); 
			if (request.isPresent()) {
				cservice.deleteRequest(id);
				return ResponseEntity.ok("Request deleted successfully");
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
	}
	
	@GetMapping("/placeorder/{id}")
	public String placeOrder(@PathVariable("id") int id) {
		Customer customer = uservice.getLoggedInUser().getCustomer();
		Optional<Quotation> quotation = cservice.getQuote(id);
		Quotation quote = quotation.get();
		Vendor vendor = quote.getVendor();
		// Get today's date
        LocalDate today = LocalDate.now();
        // Define a formatter with the desired pattern
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        // Format today's date
        String formattedDate = today.format(formatter);
		Orders order = new Orders("Initiated", "Pending", quote, formattedDate, customer, vendor);
		cservice.add(order);
		return "cdashboard";
	}
	
	@GetMapping("/completepayment/{id}")
	public String completePayment(@PathVariable("id") int id) {
		Customer customer = uservice.getLoggedInUser().getCustomer();
		Orders order = cservice.getOrder(id).get();
		order.setPaymentStatus("Completed");
		cservice.add(order);
		return "cdashboard";
	}
	
	@GetMapping("/cdashboard")	
	public ResponseEntity<ResponseDTO> cdashboard(){
		User user = uservice.getLoggedInUser();
		System.out.println(user);
		Customer customer = uservice.getLoggedInUser().getCustomer();
		List<Request> rlist = cservice.getRequestsByCustomerId(customer.getCId());
		List<Quotation> qlist = cservice.getQuotationByCustomerId(customer.getCId());
		List<Orders> olist = cservice.getOrderById(customer.getCId());
		ResponseDTO rdto = new ResponseDTO(rlist, qlist, olist);
		return new ResponseEntity<>(rdto,HttpStatus.OK);
		
	}
	
	@GetMapping("/getcustomer")
	public ResponseEntity<Customer> getCustomer(){
		User user = uservice.getLoggedInUser();
		Customer customer = user.getCustomer();
		return new ResponseEntity<>(customer,HttpStatus.OK);
		}
	
	@GetMapping("/getrequests")
	public ResponseEntity<List<Request>> getRequest(){
		User user = uservice.getLoggedInUser();
		Customer customer = user.getCustomer();
		List<Request> rlist = cservice.getRequestsByCustomerId(customer.getCId());
		return new ResponseEntity<>(rlist,HttpStatus.OK);
	}
	
	@GetMapping("/getquotes")
	public ResponseEntity<List<Quotation>> getQuotes(){
		User user = uservice.getLoggedInUser();
		Customer customer = user.getCustomer();
		List<Quotation> qlist = cservice.getQuotationByCustomerId(customer.getCId());
		return new ResponseEntity<>(qlist,HttpStatus.OK);
	}
	
	@GetMapping("/getorders")
	public ResponseEntity<List<Orders>> getOrders(){
		User user = uservice.getLoggedInUser();
		Customer customer = user.getCustomer();
		List<Orders> olist = cservice.getOrderById(customer.getCId());
		return new ResponseEntity<>(olist,HttpStatus.OK);
	}

}