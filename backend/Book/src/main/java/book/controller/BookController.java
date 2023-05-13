package book.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.entity.Book;
import book.repository.BookRepository;

@RestController
@RequestMapping(path = "/books", produces = "application/json")
@CrossOrigin(origins = "*")
public class BookController {
	private static final Logger logger = LoggerFactory.getLogger(BookController.class);

	@Autowired
	private BookRepository bookRepo;

	@PostMapping(path = "/add",consumes = "application/json")
	public ResponseEntity<Book> addBook(@RequestBody Book book) {
		Book newBook = bookRepo.save(book);
		return ResponseEntity.status(HttpStatus.CREATED).body(newBook);
	}

	@GetMapping
	public ResponseEntity<Iterable<Book>> getAllBooks() {
		Iterable<Book> books = bookRepo.findAll();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable("id") Integer id) {
		Optional<Book> optBook = bookRepo.findById(id);
		if (optBook.isPresent()) {
			return ResponseEntity.ok(optBook.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable("id") Integer id, @RequestBody Book book) {
		Optional<Book> optBook = bookRepo.findById(id);
		if (optBook.isPresent()) {
			book.setId(id);
			Book updatedBook = bookRepo.save(book);
			return ResponseEntity.ok(updatedBook);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable("id") Integer id) {
		try {
			bookRepo.deleteById(id);
			return ResponseEntity.noContent().build();
		} catch (EmptyResultDataAccessException ex) {
			logger.error("Error deleting book: {}", ex.getMessage(), ex);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
