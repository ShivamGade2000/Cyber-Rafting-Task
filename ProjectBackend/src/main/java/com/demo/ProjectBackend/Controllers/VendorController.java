
package com.demo.ProjectBackend.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
import com.demo.ProjectBackend.Dto.VendorDto;
import com.demo.ProjectBackend.Service.CustomUserDetailsService;
import com.demo.ProjectBackend.Service.VendorService;
import com.demo.ProjectBackend.beans.Customer;
import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Request;
import com.demo.ProjectBackend.beans.User;
import com.demo.ProjectBackend.beans.Vendor;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/vendor")
public class VendorController {
	
	@Autowired
	private VendorService vservice;
	@Autowired
	private CustomUserDetailsService uservice;
	
	
	@PostMapping("/submitquote/{rid}")
	public String submitQuote(@RequestBody Quotation quotation, @PathVariable("rid") int id) {
		
		User user = uservice.getLoggedInUser();
		Vendor vendor = user.getVendor();
		System.out.println("vendor: "+vendor);
		System.out.println(id);
		Optional<Request> req = vservice.getRequest(id);
		Request request = req.get();
		Customer customer = request.getCustomer();
		quotation.setCustomer(customer);
		quotation.setVendor(vendor);
		quotation.setRequest(request);
		System.out.println("quotation: "+quotation.getqId()+quotation.getPrice());
		System.out.println("request: "+request);
		vservice.addQuote(quotation);
		return "vdashboard";
	}
	
	@GetMapping("/deletequote/{id}")
	public String deleteQuote(@PathVariable("id") int id) {
		vservice.deleteQuote(id);
		return "dashboard";
	}
	
	@GetMapping("/finishorder/{id}")
	public String finishOrder(@PathVariable("id") int id) {
		Vendor vendor = uservice.getLoggedInUser().getVendor();
		Orders order = vservice.getOrder(id).get();
		order.setOrderStatus("Completed");
		order.setPaymentStatus("Requested");
		vservice.updateOrder(order);
		return "vdashboard";
	}
	
	@GetMapping("/vdashboard")	
	public ResponseEntity<ResponseDTO> cdashboard(){
		Vendor vendor = uservice.getLoggedInUser().getVendor();
		List<Request> rlist = vservice.getAll();
		List<Quotation> qlist = vservice.getQuotationByVendorId(vendor.getVId());
		List<Orders> olist = vservice.getOrderByVendorId(vendor.getVId());
		ResponseDTO rdto = new ResponseDTO(rlist, qlist, olist);
		return new ResponseEntity<>(rdto,HttpStatus.OK);
		
	}
	
	@GetMapping("/getVendor")
	public ResponseEntity<Vendor> getVendor(){
		User user = uservice.getLoggedInUser();
	    Vendor vendor = user.getVendor();
		return new ResponseEntity<>(vendor,HttpStatus.OK);
		}
	
	@GetMapping("/getrequests")
	public ResponseEntity<List<Request>> getRequest(){
		User user = uservice.getLoggedInUser();
		Vendor vendor = user.getVendor();
		List<Request> rlist = vservice.getAll();
		return new ResponseEntity<>(rlist,HttpStatus.OK);
	}
	
	@GetMapping("/getquotes")
	public ResponseEntity<List<Quotation>> getQuotes(){
		User user = uservice.getLoggedInUser();
		Vendor vendor = user.getVendor();
		List<Quotation> qlist = vservice.getQuotationByVendorId(vendor.getVId());
		return new ResponseEntity<>(qlist,HttpStatus.OK);
	}
	
	@GetMapping("/getorders")
	public ResponseEntity<List<Orders>> getOrders(){
		User user = uservice.getLoggedInUser();
		Vendor vendor = user.getVendor();
		List<Orders> olist = vservice.getOrderByVendorId(vendor.getVId());
		return new ResponseEntity<>(olist,HttpStatus.OK);
	}

}