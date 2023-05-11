package io.lightfeather.springtemplate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class NotificationRequest {
    @NotEmpty(message = "First name is required")
    @Pattern(regexp = "^[a-zA-Z]*$", message = "First name must only contain letters")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    @Pattern(regexp = "^[a-zA-Z]*$", message = "Last name must only contain letters")
    private String lastName;

    @Email(message = "Invalid email")
    private String email;

    @Pattern(regexp = "\\d{3}-\\d{3}-\\d{4}", message = "Invalid phone number")
    private String phoneNumber;

    @NotEmpty(message = "Supervisor is required")
    private String supervisor;

     public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
          this.supervisor = supervisor;
    }
}
