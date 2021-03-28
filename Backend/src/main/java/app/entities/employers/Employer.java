package app.entities.employers;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employers")
public class Employer {

    @Id
    private String id;

    private String firstName;
    private String lastName;

    public Employer() {
    }

    public Employer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.employers.Employer[id=%s, firstName=%s, lastName=%s]",
                id, firstName, lastName);
    }

}