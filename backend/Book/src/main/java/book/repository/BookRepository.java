package book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import book.entity.Book;

public interface BookRepository extends JpaRepository <Book, Integer>{

}
