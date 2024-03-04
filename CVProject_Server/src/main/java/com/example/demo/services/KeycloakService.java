package com.example.demo.services;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@AllArgsConstructor
@Service
public class KeycloakService {

    @Autowired
    private final RestTemplate restTemplate;

    public Boolean introspectToken(String token) throws Exception {

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();


        //ENV!!!!!!!!!!!!
        body.add("client_id", "test");
        body.add("client_secret", "6AxzOF92ephN5G7P15QQGG4hCG8bfPNI");
        body.add("token", token);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

//        headers.add("client_id", clientId);
//        headers.add("client_secret", clientSecret);
//        headers.add("token", token);

        //ENV!!!!!!!!!!!!
        String url = "http://localhost:8080/realms/v1/protocol/openid-connect/token/introspect";

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);


            // Parse JSON string to JsonNode
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response.getBody());

            // Get the value of "active"
            boolean active = jsonNode.get("active").asBoolean();

            return active;

    }
}
