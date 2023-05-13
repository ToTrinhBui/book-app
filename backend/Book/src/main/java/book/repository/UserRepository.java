package book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import book.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	@Query(value = "SELECT * FROM users u where u.email = :keyword", nativeQuery = true)
	public User findByEmail(String keyword);
}
