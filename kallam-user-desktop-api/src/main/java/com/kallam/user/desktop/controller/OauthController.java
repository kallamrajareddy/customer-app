package com.kallam.user.desktop.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.kallam.user.desktop.configuration.SecurityPropConfig;
import com.kallam.user.desktop.formbean.LoginBean;


@RestController
public class OauthController {

	@Autowired
	SecurityPropConfig securityPropConfig;

	@PostMapping("/oauth/token")
	public ResponseEntity getOauth(@RequestBody LoginBean login) {
		ResponseEntity resp = null;
		try {
			resp = getToken(login.getUsername(), login.getPassword());
			System.out.println();
		}catch (HttpStatusCodeException e) {
			System.out.println(e.getStatusCode());
			ResponseEntity.status(e.getStatusCode());
			ResponseEntity.status(HttpStatus.BAD_REQUEST);
			return ResponseEntity.ok(e.getResponseBodyAsString());
		}

		return resp;

	}
	
	@PostMapping("/oauth/refresh")
	public ResponseEntity getRefreshToken(@RequestBody String refreshToken) {
		Object resp = null;
		try {
			resp = refreshToken(refreshToken);
		}catch (HttpStatusCodeException e) {
			ResponseEntity.status(e.getStatusCode());
			ResponseEntity.status(HttpStatus.BAD_REQUEST);
			return ResponseEntity.ok(e.getResponseBodyAsString());
		}

		return ResponseEntity.ok(resp);

	}
	
	@PostMapping("/oauth/getRoles")
	public ResponseEntity getRoles(@RequestBody String rolesToken) {
		ResponseEntity resp = null;
		try {
			resp = tokenRoles(rolesToken);
		}catch (HttpStatusCodeException e) {
			System.out.println(e);
			ResponseEntity.status(e.getStatusCode());
			ResponseEntity.status(HttpStatus.BAD_REQUEST);
			return ResponseEntity.ok(e.getResponseBodyAsString());
		}

		return ResponseEntity.ok(resp);

	}
	private ResponseEntity tokenRoles(String rolesToken) throws HttpStatusCodeException {
		 HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	     	headers.add("Authorization", "bearer "+rolesToken);
	        RestTemplate restTemplate = new RestTemplate();
	        HttpEntity requestEntity = new HttpEntity(headers);
	        System.out.println();
	        ResponseEntity response = restTemplate.exchange(securityPropConfig.getOauthuserRoles(), HttpMethod.GET, requestEntity,  Object.class);
        return response;
    }
	
	 private Object refreshToken(String refreshToken) throws HttpStatusCodeException {
	    	HttpHeaders headers = getHeaders();  
	        RestTemplate restTemplate = new RestTemplate();
		    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
	        map.add("client_id",securityPropConfig.getClientId());
	        map.add("grant_type", "refresh_token");
	        map.add("refresh_token", refreshToken);
	        HttpEntity requestEntity = new HttpEntity<MultiValueMap<String, String>>(map, headers);
	        Object response = null;
	        response = restTemplate.postForObject(securityPropConfig.getOauthTokenUrl(), requestEntity, Object.class);
	        return response;
	    }

    private ResponseEntity getToken(String uname, String pass) throws HttpStatusCodeException {
    	HttpHeaders headers = getHeaders();  
        RestTemplate restTemplate = new RestTemplate();
	    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("username", uname);
        map.add("password", pass);
        map.add("client_id",securityPropConfig.getClientId());
        map.add("grant_type",securityPropConfig.getAuthorizedGrantTypes());
        HttpEntity requestEntity = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        Map response = null;
        response = restTemplate.postForObject(securityPropConfig.getOauthTokenUrl(), requestEntity, HashMap.class);
        return ResponseEntity.ok(response);
    }
       
    private HttpHeaders getHeaders() {
    	String credential= securityPropConfig.getClientId() +":"+ securityPropConfig.getClientSecret();
    	String encodedCredential = new String(Base64.getEncoder().encodeToString(credential.getBytes()));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
     	headers.add("Authorization", "Basic " + encodedCredential);
    	return headers;
    }
}
