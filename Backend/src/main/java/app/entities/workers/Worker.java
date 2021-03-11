package app.entities.workers;

import app.entities.common.Location;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workers")
public class Worker {

    @Id
    private String id;

    private String firstName;
    private String lastName;

    private List<Skill> skills;
    private Location location;

    public Worker() {
    }

    public Worker(String firstName, String lastName, List<Skill> skills, Location location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.skills = skills;
        this.location = location;
    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.workers.Worker[id=%s, firstName='%s', lastName='%s']",
                id, firstName, lastName);
    }

}
