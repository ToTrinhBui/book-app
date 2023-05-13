package book.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.entity.User;
import book.service.UserService;

@RestController
@RequestMapping(path = "/auth", produces = "application/json")
@CrossOrigin(origins = "*")

public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserService userService;

	@PostMapping(path = "/register", consumes = "application/json")
	public ResponseEntity<User> register(@RequestBody User user) {
		try {
			User newuser = userService.register(user);
			return new ResponseEntity<>(newuser, HttpStatus.CREATED);
		} catch (Exception ex) {
			logger.error("Error", ex.getMessage(), ex);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PostMapping(path="/login", consumes = "application/json")
	public ResponseEntity<String> login(@RequestBody User user) {
		try {
			User check = userService.checkForLogin(user);
			return ResponseEntity.ok("Login successful");
		}catch(Exception ex) {
			logger.error("Error", ex.getMessage(), ex);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
    }
	
	@GetMapping("/{email}")
	public User getUserByEmail(@PathVariable("email") String email) {
		return userService.getUserByEmail(email);
	}
}
