package com.kallam.user.desktop.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
	
	 @RequestMapping(value = "/getName", method=RequestMethod.GET)
	    public Map<String, String> getClaimsUrl() {
	    	Map<String, String> urls = new HashMap<>();
	    	urls.put("name", "Kallam");
	        return urls;
	    }
	 
	 @RequestMapping(value = "{_:^(?!index\\.html|api).$}")
	    public String redirectApi() {
	       // LOG.info("URL entered directly into the Browser, so we need to redirect...");
	        return "forward:/";
	    }

}
