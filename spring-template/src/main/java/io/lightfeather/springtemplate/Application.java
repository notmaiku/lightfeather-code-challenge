package io.lightfeather.springtemplate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application {

  @RequestMapping("/")
  public String home() {
    return "Hello World";
  }

  @GetMapping("/hello")
  public String sayHello() {
    return "Hello, world!";
  }

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
