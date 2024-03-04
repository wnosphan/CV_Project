package com.example.demo.services;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KeycloakService {

    private String url;
    private String clientSecret;
    private String clientId;
    private RestTemplate restTemplate;

    @Value("${keycloak.base-url}")
    public void setUrl(String url) {
        this.url = url;
    }

    @Value("${keycloak.client-secret}")
    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    @Value("${keycloak.client-id}")
    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    @Autowired
    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Boolean introspectToken(String token) throws Exception {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("token", token);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response.getBody());
        boolean active = jsonNode.get("active").asBoolean();

        return active;
    }
}
