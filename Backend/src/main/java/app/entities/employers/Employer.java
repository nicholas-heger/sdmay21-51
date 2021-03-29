package app.entities.employers;

import app.entities.users.User;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employers")
public class Employer extends User {
    public Employer(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.employers.User[id=%s, firstName=%s, lastName=%s]",
                this, this.getFirstName(), this.getLastName());
    }

}