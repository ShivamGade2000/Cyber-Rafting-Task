package com.demo.ProjectBackend.beans;

import java.util.Collection;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;


@Entity

public class User implements UserDetails{
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int uId;
	
	private String email;
	
	private String password;
	
	private String role;
	
	@OneToOne
	private Customer customer;
	
	@OneToOne
	private Vendor vendor;

	public User(String email, String password, String role, Customer customer) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
		this.customer = customer;
	}

	public User(String email, String password, String role, Vendor vendor) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
		this.vendor = vendor;
	}
	
	public String getRole() {
		return role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return email;
	}
	
	 @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

		public User(int uId, String email, String password, String role, Customer customer, Vendor vendor) {
			super();
			this.uId = uId;
			this.email = email;
			this.password = password;
			this.role = role;
			this.customer = customer;
			this.vendor = vendor;
		}

		public User() {
			super();
		}

		public int getuId() {
			return uId;
		}

		public void setuId(int uId) {
			this.uId = uId;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
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

		public void setRole(String role) {
			this.role = role;
		}

		@Override
		public String toString() {
			return "User [uId=" + uId + ", email=" + email + ", password=" + password + ", role=" + role + ", customer="
					+ customer + ", vendor=" + vendor + "]";
		}
	
	    
	
	
	

}
