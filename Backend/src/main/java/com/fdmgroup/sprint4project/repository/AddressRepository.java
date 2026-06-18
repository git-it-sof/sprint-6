package com.fdmgroup.sprint4project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.sprint4project.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
