package book.service;


import org.mindrot.jbcrypt.BCrypt;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import book.entity.User;
import book.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
    private UserRepository userRepository;

    @Override
    public User register(User user) {
    	User existUser = userRepository.findByEmail(user.getEmail());
        // validate input
        if (existUser != null) {
            throw new RuntimeException("Account with this email: " + user.getEmail() + " already exists");
        }
        // encrypt password
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));
        // save user
        return userRepository.save(user);
    }

    @Override
    public User checkForLogin(User user) {
    	User existUser = userRepository.findByEmail(user.getEmail());
    	String password = user.getPassword();
    	if(existUser == null) {
    		throw new RuntimeException("Not Found");
    	}
    	if(!BCrypt.checkpw(password, existUser.getPassword())) {
    		throw new RuntimeException("Wrong password");
    	}
    	return user;
    }
    
    @Override
    public User getUserByEmail(String email) {
    	return userRepository.findByEmail(email);
    }
}
