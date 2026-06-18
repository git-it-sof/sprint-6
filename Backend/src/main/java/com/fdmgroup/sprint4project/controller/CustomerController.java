package com.fdmgroup.sprint4project.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fdmgroup.sprint4project.dto.CreateCustomerDTO;
import com.fdmgroup.sprint4project.dto.UpdateCustomerDTO;
import com.fdmgroup.sprint4project.model.Customer;
import com.fdmgroup.sprint4project.service.CustomerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

	private CustomerService cusService;
	
	@Autowired
	public CustomerController(CustomerService cusService) {
		super();
		this.cusService = cusService;
	}
	
	
	@Operation(summary = "Retrieve all customers")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			}, 		description = "Retrived all customers successfully")	
	})
	@GetMapping
	public ResponseEntity<List<Customer>> getCustomers(){
		List<Customer> customers = cusService.findCustomers();
		
		return ResponseEntity.ok(customers);
		
	}
	
	
	@Operation(summary = "Retrieve customer by customer ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			}, 		description = "Customer found"),
			
			@ApiResponse(responseCode = "404", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			},		description = "Customer not found"
			)	
	})
	@GetMapping("/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable Long id){
		Customer customer = cusService.findCustomerById(id);
		
		return ResponseEntity.ok(customer);
		
	}
	
	
	@Operation(summary = "Add a new customer")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			}, 		description = "Customer added successfully"),
			@ApiResponse(responseCode = "400", description = "Invalid request body")
	})
	@PostMapping
	public ResponseEntity<Customer> createCustomer(@Valid @RequestBody CreateCustomerDTO dto){
		
		Customer createdCustomer = cusService.addNewCustomer(dto);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(createdCustomer.getCustomerId())
				.toUri();
		
		return ResponseEntity.created(location).body(createdCustomer);
		
	}
	
	
	@Operation(summary = "Update existing customer by customer ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			}, 		description = "Customer found and updated successfully"),
			
			@ApiResponse(responseCode = "404", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			},		description = "Customer not found"),
			@ApiResponse(responseCode = "400", description = "Invalid request body")
	})
	@PutMapping("/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody UpdateCustomerDTO dto){
		
		Customer updatedCustomer = cusService.updateCustomer(id , dto);
		
		return ResponseEntity.ok(updatedCustomer);
		
	}
	
	
	@Operation(summary = "Delete customer by customer ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			}, 		description = "Customer deleted successfully"),
			@ApiResponse(responseCode = "404", content = {
					@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
			},		description = "Customer with id cannot be found"
			)	
	})
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteCustomer(@PathVariable Long id) {
		cusService.deleteCustomer(id);
		
	    Map<String, String> response = new HashMap<>();
	    response.put("message", "Successfully deleted.");

	    return ResponseEntity.ok(response);
	}
	
	
}
