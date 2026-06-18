package com.fdmgroup.sprint4project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.sprint4project.dto.CreateAccountDTO;
import com.fdmgroup.sprint4project.dto.GetAccountDTO;
import com.fdmgroup.sprint4project.exception.CustomerNotFoundException;
import com.fdmgroup.sprint4project.exception.InvalidAccountTypeException;
import com.fdmgroup.sprint4project.model.Account;
import com.fdmgroup.sprint4project.model.AccountType;
import com.fdmgroup.sprint4project.model.Address;
import com.fdmgroup.sprint4project.model.CheckingAccount;
import com.fdmgroup.sprint4project.model.Customer;
import com.fdmgroup.sprint4project.model.GeocoderResponse;
import com.fdmgroup.sprint4project.model.SavingsAccount;
import com.fdmgroup.sprint4project.repository.AccountRepository;
import com.fdmgroup.sprint4project.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountService {
	
	private final AccountRepository ar;
	private final CustomerRepository cr;
	
	@Autowired
	AccountService(AccountRepository ar, CustomerRepository cr){
		this.ar = ar;
		this.cr = cr;
	}
	
	public Account createAccount(Long customerId, CreateAccountDTO dto) {
		Customer customer = cr.findById(customerId).orElseThrow(() -> new CustomerNotFoundException("Customer could not be found."));
		
		Account account;
		
		if (dto.getType() == AccountType.SAVINGS) {
		    SavingsAccount savingsAccount = new SavingsAccount();

		    if (dto.getInterestRate() != null) {
		        savingsAccount.setInterestRate(dto.getInterestRate());
		    }

		    account = savingsAccount;
		    
		} else if (dto.getType() == AccountType.CHECKING) {
		    account = new CheckingAccount();
		} else {
		    throw new InvalidAccountTypeException("Account type must be SAVINGS or CHECKING");
		}
	    
	    account.setCustomer(customer);
	    account.setBalance(dto.getBalance());
	    
	    customer.getAccounts().add(account);
	    
	    return ar.save(account);
		
		
	}
	
	//update is not implemented here since it is not part of the requirements but eventually there should be so that balance etc can be updated
	@Transactional
	public void updateBalance(Long accountId, double amount) {
		Account found = ar.findById(accountId).orElseThrow(() -> new CustomerNotFoundException("Could not find customer with id " + accountId));
		
		found.setBalance(found.getBalance()+amount);
		
		ar.save(found);
	}
	
	public List<GetAccountDTO> getAllAccounts() {
	    List<Account> accounts = ar.findAll();

	    return accounts.stream()
	            .map(account -> convertToGetAccountDTO(account))
	            .toList();
	}
	
	public List<GetAccountDTO> getAccountsById(Long customerId){
	    List<Account> accounts = ar.findByCustomerCustomerId(customerId);

	    return accounts.stream().map(account -> convertToGetAccountDTO(account)).toList();
	}
	
	public void deleteAccount(Long accountId) {
		ar.deleteById(accountId);
	}
	
	public List<GetAccountDTO> getAccountsByCity(String city) {
	    List<Account> accounts = ar.findByCustomerAddressCityIgnoreCase(city);

	    return accounts.stream()
	            .map(account -> convertToGetAccountDTO(account))
	            .toList();
	}
	
	//helpers
	
	private GetAccountDTO convertToGetAccountDTO(Account account) {
	    GetAccountDTO dto = new GetAccountDTO();

	    dto.setAccountId(account.getAccountId());
	    dto.setBalance(account.getBalance());

	    dto.setCustomerId(account.getCustomer().getCustomerId());
	    dto.setCustomerName(account.getCustomer().getName());

	    if (account instanceof SavingsAccount) {
	        dto.setAccountType("SAVINGS");
	    } else if (account instanceof CheckingAccount) {
	        dto.setAccountType("CHECKING");
	    }

	    return dto;
	}

}
