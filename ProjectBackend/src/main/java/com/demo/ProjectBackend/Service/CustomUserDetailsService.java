package com.demo.ProjectBackend.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.demo.ProjectBackend.Dao.UserRepository;
import com.demo.ProjectBackend.beans.User;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository urepo;
	
	private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);
	
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = urepo.findByEmail(username).orElseThrow(()-> new RuntimeException());
//		System.out.println(user);
//		return user;
//	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    logger.info("Attempting to load user by username: {}", username);
	    return urepo.findByEmail(username)
	            .orElseThrow(() -> {
	                logger.error("User not found with username: {}", username);
	                return new UsernameNotFoundException("User not found with username: " + username);
	            });
	}
	
	public User getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return (User) principal;
        } else {
            return null; // Handle the case where the principal is not an instance of UserDetails
        }
    }


}
