package com.fdmgroup.sprint4project.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fdmgroup.sprint4project.exception.InvalidPostalCodeException;
import com.fdmgroup.sprint4project.model.GeocoderResponse;

@Service
public class GeocoderService {

    private final RestTemplate restTemplate;

    @Value("${geocoder.auth}")
    private String authCode;

    public GeocoderService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public GeocoderResponse.Standard getLocationFromPostalCode(String postalCode) {

        String url = UriComponentsBuilder
                .fromUriString("https://geocoder.ca/")
                .queryParam("postal", postalCode)
                .queryParam("json", "1")
                .queryParam("auth", authCode)
                .toUriString();

        GeocoderResponse response = restTemplate.getForObject(url, GeocoderResponse.class);

        if (response == null || response.getStandard() == null) {
            throw new InvalidPostalCodeException("Invalid postal code");
        }

        return response.getStandard();
    }
}