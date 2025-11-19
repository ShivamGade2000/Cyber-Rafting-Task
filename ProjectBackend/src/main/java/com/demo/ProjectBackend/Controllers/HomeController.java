 package com.demo.ProjectBackend.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.ProjectBackend.Dao.OrderRepository;
import com.demo.ProjectBackend.Dao.QuotationRepository;
import com.demo.ProjectBackend.Dao.RequestRepository;
import com.demo.ProjectBackend.Dao.UserRepository;
import com.demo.ProjectBackend.Dao.VendorRepository;
import com.demo.ProjectBackend.Dto.CustomerDto;
import com.demo.ProjectBackend.Dto.ResponseDTO;
import com.demo.ProjectBackend.Dto.VendorDto;
import com.demo.ProjectBackend.Service.CustomerService;
import com.demo.ProjectBackend.Service.VendorService;
import com.demo.ProjectBackend.beans.Customer;
import com.demo.ProjectBackend.beans.JWTRequest;
import com.demo.ProjectBackend.beans.JWTResponse;
import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Request;
import com.demo.ProjectBackend.beans.User;
import com.demo.ProjectBackend.beans.Vendor;
import com.demo.ProjectBackend.security.JWTHelper;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
public class HomeController {
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;


	@Autowired
	private JWTHelper helper;

	private Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private VendorRepository vrepo;
	@Autowired
	private UserRepository urepo;
	@Autowired
	private QuotationRepository qrepo;
	@Autowired
	private RequestRepository rrepo;
	@Autowired
	private OrderRepository orepo;
	

	@Autowired
	private CustomerService cservice;
	
	@Autowired
	private VendorService vservice;

	
	@GetMapping("/register")
	public String register() {
		return "chooseregister";
	}
	
	@GetMapping("/cregister")
	public String cregister() {
		return "cregisterform";
	}
	
	@GetMapping("vregister")
	public String vregister() {
		return "vregisterform";
	}
	
	@GetMapping("about")
	public String about() {
		return "about";
	}
	
	@PostMapping("/csubmit")
	public String submitcregister(@Valid@RequestBody CustomerDto cdto, BindingResult result) {
		
		System.out.println(cdto);
		if(result.hasErrors()) {
			return "cregister";
		}
		
		Customer customer = cservice.convertFromDto(cdto);
		cservice.add(customer);
		cservice.addUser(cdto, customer);
		return "home";
	}
	
	
	@PostMapping("/vsubmit")
	public String submitvregister(@Valid@RequestBody VendorDto vdto, BindingResult result) {
		if(result.hasErrors()) {
			return "vregister";
		}
		Vendor vendor = vservice.convertFromDto(vdto);
		vservice.add(vendor);
		vservice.addUser(vdto, vendor);
		return "home";
	}
	
	 @PostMapping("/login")
	    public ResponseEntity<JWTResponse> login(@RequestBody JWTRequest request) {

	        this.doAuthenticate(request.getEmail(), request.getPassword());

	        System.out.println(request);
	        User user = (User) userDetailsService.loadUserByUsername(request.getEmail());
	        String token = this.helper.generateToken(user);
	        System.out.println(user);
	        
	        JWTResponse response = new JWTResponse.Builder()
	                .setToken(token)
	                .setUsername(user.getUsername())
	                .setRole(user.getRole())
	                .build();
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }

	    private void doAuthenticate(String email, String password) {
	    	System.out.println(email+password);
	        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
	        try {
	            manager.authenticate(authentication);


	        } catch (BadCredentialsException e) {
	            throw new BadCredentialsException(" Invalid Username or Password  !!");
	        }

	    }

	    @ExceptionHandler(BadCredentialsException.class)
	    public String exceptionHandler() {
	        return "Credentials Invalid !!";
	    }
	
}
