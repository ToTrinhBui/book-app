package book.service;


import book.entity.User;

public interface UserService {
	public User register(User user);
	public User checkForLogin(User user);
	public User getUserByEmail(String email);
}
