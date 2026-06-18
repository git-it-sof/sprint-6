package com.fdmgroup.sprint4project.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.sprint4project.dto.CreateAccountDTO;
import com.fdmgroup.sprint4project.dto.GetAccountDTO;
import com.fdmgroup.sprint4project.model.Account;
import com.fdmgroup.sprint4project.service.AccountService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1")
public class AccountController {

	private AccountService as;
	
	AccountController(AccountService as){
		this.as = as;
	}
	
	
	@GetMapping("/customers/{customerId}/accounts")
	public ResponseEntity<List<GetAccountDTO>> getCustomerAccounts(@PathVariable Long customerId) {
	    return ResponseEntity.ok(as.getAccountsById(customerId));
	}

	@PostMapping("/customers/{customerId}/accounts")
	public ResponseEntity<Account> createAccount(@PathVariable Long customerId, @RequestBody CreateAccountDTO dto) {

	    Account createdAccount = as.createAccount(customerId, dto);
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
	}

	@DeleteMapping("/customers/{customerId}/accounts/{accountId}")
	public ResponseEntity<Void> deleteAccount(
	        @PathVariable Long customerId,
	        @PathVariable Long accountId) {

	    as.deleteAccount(accountId);
	    return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/accounts")
	public ResponseEntity<List<GetAccountDTO>> getAllAccounts(){
		return ResponseEntity.ok(as.getAllAccounts());
	}

	@GetMapping(value = "/accounts", params = "city")
	public ResponseEntity<List<GetAccountDTO>> getAccountsByCity(@RequestParam String city) {
	    return ResponseEntity.ok(as.getAccountsByCity(city));
	}
	
	@PutMapping("/customers/{customerId}/accounts/{accountId}")
	public void updateAccountBalance(@PathVariable Long customerId, @PathVariable Long accountId, @RequestParam double amount) {
		as.updateBalance(accountId, amount);
	}
	
	
}
