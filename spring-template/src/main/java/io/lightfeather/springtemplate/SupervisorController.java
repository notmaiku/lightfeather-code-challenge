package io.lightfeather.springtemplate;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@RestController
public class SupervisorController {

  private final RestTemplate restTemplate = new RestTemplate();

    @CrossOrigin(origins = "*")
  @GetMapping("/api/supervisors")
  public List<String> getSupervisors() {
    
    ResponseEntity<List<Manager>> responseEntity = restTemplate.exchange(
        "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers",
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Manager>>() {}
    );
    List<Manager> managers = responseEntity.getBody();

    List<String> supervisors = managers.stream()
        .filter(manager -> !isNumeric(manager.getJurisdiction()))
        .sorted(Comparator
            .comparing(Manager::getJurisdiction)
            .thenComparing(Manager::getLastName)
            .thenComparing(Manager::getFirstName)
        )
        .map(manager -> String.format("%s - %s, %s", manager.getJurisdiction(), manager.getLastName(), manager.getFirstName()))
        .collect(Collectors.toList());
    return supervisors;
  }

  private boolean isNumeric(String str) {
    return str != null && str.matches("-?\\d+(\\.\\d+)?");
  }

}