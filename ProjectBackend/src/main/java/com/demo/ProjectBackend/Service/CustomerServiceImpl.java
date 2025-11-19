package com.demo.ProjectBackend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.demo.ProjectBackend.Dao.CustomerRepository;
import com.demo.ProjectBackend.Dao.OrderRepository;
import com.demo.ProjectBackend.Dao.QuotationRepository;
import com.demo.ProjectBackend.Dao.RequestRepository;
import com.demo.ProjectBackend.Dao.UserRepository;
import com.demo.ProjectBackend.Dto.CustomerDto;
import com.demo.ProjectBackend.beans.Customer;
import com.demo.ProjectBackend.beans.Orders;
import com.demo.ProjectBackend.beans.Quotation;
import com.demo.ProjectBackend.beans.Request;
import com.demo.ProjectBackend.beans.User;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerRepository crepo;
	@Autowired
	private RequestRepository rrepo;
	@Autowired
	private UserRepository urepo;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private QuotationRepository qrepo;
	@Autowired
	private OrderRepository orepo;
	
	@Override
	public Customer convertFromDto(CustomerDto cdto) {
		Customer customer = new Customer(cdto.getfName(),cdto.getlName(), cdto.getMobile(),cdto.getEmail(),cdto.getCity(),cdto.getPincode());
		return customer;
	}


	@Override
	public CustomerDto convertToDto(Customer cust) {
		CustomerDto cdto = new CustomerDto(cust.getfName(),cust.getlName(),cust.getMobile(),cust.getEmail(),cust.getCity(),cust.getPincode());
		return cdto;
	}


	@Override
	public void add(Customer customer) {
		
		crepo.save(customer);
	}


	@Override
	public void add(Request req) {
	
		rrepo.save(req);
	}


	@Override
	public Optional<Customer> getCust(int id) {
		
		return crepo.findById(id);
	}


	@Override
	public void deleteRequest(int id) {
		rrepo.deleteById(id);
	}


	@Override
	public Optional<Request> getRequest(int id) {
		Optional<Request> req = rrepo.findById(id);
		return req;
	}


	@Override
	public void addUser(CustomerDto cdto, Customer customer) {
		User user = new User(cdto.getEmail(),passwordEncoder.encode(cdto.getPassword()),"customer",customer);
		urepo.save(user);
	}


	@Override
	public Optional<Quotation> getQuote(int id) {
		Optional<Quotation> quote = qrepo.findById(id);
		return quote;
	}


	@Override
	public void add(Orders order) {
		
		orepo.save(order);
	}


	@Override
	public Optional<Orders> getOrder(int id) {
		Optional<Orders> order = orepo.findById(id);
		return order;
	}


	@Override
	public List<Request> getRequestsByCustomerId(int cId) {
		List<Request> rlist = rrepo.findByCustomer_CId(cId);
		return rlist;
	}


	@Override
	public List<Quotation> getQuotationByCustomerId(int cId) {
		List<Quotation> qlist = qrepo.findByCustomer_CId(cId);
		return qlist;
	}


	@Override
	public List<Orders> getOrderById(int cId) {
		List<Orders> olist = orepo.findByCustomer_CId(cId);
		return olist;
	}


	
	
	
	
	
	

	
	

}
