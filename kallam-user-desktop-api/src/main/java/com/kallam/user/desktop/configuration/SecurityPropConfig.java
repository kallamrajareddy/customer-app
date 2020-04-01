package com.kallam.user.desktop.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
//PropertySource({"classpath:config001.properties", "classpath:config002.properties"})
@Component
public class SecurityPropConfig {

	@Value("${client.api.clientId}")
	private String clientId;
	
	@Value("${client.api.clientSecret}")
	private String clientSecret;
	
	@Value("${client.api.authorizedGrantTypes}")
	private String authorizedGrantTypes;
	
	@Value("${client.api.oauthTokenUrl}")
	private String oauthTokenUrl;
	
	@Value("${client.api.oauthuserRoles}")
	private String oauthuserRoles;
	
	@Value("${client.api.policySearchUrl}")
	private String policySearchUrl;

	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	public String getClientSecret() {
		return clientSecret;
	}
	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}
	public String getAuthorizedGrantTypes() {
		return authorizedGrantTypes;
	}
	public void setAuthorizedGrantTypes(String authorizedGrantTypes) {
		this.authorizedGrantTypes = authorizedGrantTypes;
	}
	public String getOauthTokenUrl() {
		return oauthTokenUrl;
	}
	public void setOauthTokenUrl(String oauthTokenUrl) {
		this.oauthTokenUrl = oauthTokenUrl;
	}
	public String getOauthuserRoles() {
		return oauthuserRoles;
	}
	public void setOauthuserRoles(String oauthuserRoles) {
		this.oauthuserRoles = oauthuserRoles;
	}
	public String getPolicySearchUrl() {
		return policySearchUrl;
	}
	public void setPolicySearchUrl(String policySearchUrl) {
		this.policySearchUrl = policySearchUrl;
	}
	}
