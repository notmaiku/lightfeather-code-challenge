package io.lightfeather.springtemplate;

import jakarta.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NotificationController {

  @CrossOrigin(origins = "*")
  @PostMapping("/submit")
  public ResponseEntity<Map<String, Object>> submitNotification(
    @RequestBody @Valid NotificationRequest request,
    BindingResult bindingResult
  ) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity
        .badRequest()
        .body(Collections.singletonMap("error", "Invalid request"));
    }
    if (
      Stream
        .of(
          request.getFirstName(),
          request.getLastName(),
          request.getEmail(),
          request.getPhoneNumber(),
          request.getSupervisor()
        )
        .anyMatch(StringUtils::isEmpty)
    ) {
      return ResponseEntity
        .badRequest()
        .body(
          Collections.singletonMap("error", "One or more fields are empty")
        );
    }
    System.out.println(request);
    Map<String, Object> response = new HashMap<>();
    response.put("message", "Notification request submitted successfully");
    response.put("data", request);
    return ResponseEntity.ok(response);
  }
}
