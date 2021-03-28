package app.entities.employers;

import app.entities.users.User;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employers")
public class Employer extends User {

    public Employer() {
    }

    public Employer(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.employers.User[id=%s, firstName=%s, lastName=%s]",
                id, firstName, lastName);
    }

}