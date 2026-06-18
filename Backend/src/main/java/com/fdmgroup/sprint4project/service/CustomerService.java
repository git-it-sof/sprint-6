package com.fdmgroup.sprint4project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.sprint4project.dto.CreateCustomerDTO;
import com.fdmgroup.sprint4project.dto.UpdateCustomerDTO;
import com.fdmgroup.sprint4project.exception.CustomerNotFoundException;
import com.fdmgroup.sprint4project.model.Address;
import com.fdmgroup.sprint4project.model.Company;
import com.fdmgroup.sprint4project.model.Customer;
import com.fdmgroup.sprint4project.model.GeocoderResponse;
import com.fdmgroup.sprint4project.model.Person;
import com.fdmgroup.sprint4project.repository.AddressRepository;
import com.fdmgroup.sprint4project.repository.CustomerRepository;
import jakarta.transaction.Transactional;

@Service
public class CustomerService {
	
	CustomerRepository cr;
	AddressRepository ar;
	GeocoderService gs;
	
	@Autowired
	CustomerService(CustomerRepository cr, AddressRepository ar, GeocoderService gs){
		this.cr = cr;
		this.gs = gs;
		this.ar = ar;
	}
	
	public Customer findCustomerById(Long id) {
		Optional<Customer> foundCustomer = cr.findById(id);
		
		if(!foundCustomer.isPresent()) {
			throw new CustomerNotFoundException("Could not find customer with id " + id);
		}
		
		return foundCustomer.get();
	}
	
	
	public List<Customer> findCustomers(){
		return cr.findAll();
	}
	
	
	public Customer addNewCustomer(CreateCustomerDTO dto) {
		
		GeocoderResponse.Standard location = gs.getLocationFromPostalCode(dto.getPostalCode());
		
		Address address = new Address();
        address.setStreetNumber(dto.getStreetNumber());
        address.setPostalCode(dto.getPostalCode());
        address.setCity(location.getCity());
        address.setProvince(location.getProv());
        
        ar.save(address);
        
        Customer customer;

        if(dto.getType().equals("PERSON")) {
            customer = new Person();
        } else {
            customer = new Company();
        }
        
        customer.setName(dto.getName());
        customer.setAddress(address);

        return cr.save(customer);
	}
	
	
	@Transactional
	public Customer updateCustomer(Long id, UpdateCustomerDTO dto) {
		Optional<Customer> found = cr.findById(id);
		
		if(!found.isPresent()) {
			throw new CustomerNotFoundException("Could not find customer with id " + id);
		}
		
		Customer cust = found.get();
		cust.setName(dto.getName());
		
		GeocoderResponse.Standard location = gs.getLocationFromPostalCode(dto.getPostalCode());
		
		Address address = cust.getAddress();
        address.setStreetNumber(dto.getStreetNumber());
        address.setPostalCode(dto.getPostalCode());
        address.setCity(location.getCity());
        address.setProvince(location.getProv());
		
		ar.save(address);
		
		cr.save(cust);
		
		return cust;
		
	}
	
	public void deleteCustomer(Long id) {
		
		cr.findById(id).orElseThrow(() -> new CustomerNotFoundException("Could not find customer with id " + id));
		
		cr.deleteById(id);
	}

}
