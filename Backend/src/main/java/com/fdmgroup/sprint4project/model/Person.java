package com.fdmgroup.sprint4project.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PERSON")
public class Person extends Customer {

}
