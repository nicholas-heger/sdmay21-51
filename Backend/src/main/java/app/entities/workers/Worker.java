package app.entities.workers;

import app.entities.common.Location;
import app.entities.common.Skill;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workers")
public class Worker {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String email;

    private List<Skill> skills;
    private Location location;

    public Worker() {}

    public Worker(String firstName, String lastName, String email, List<Skill> skills, Location location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.skills = skills;
        this.location = location;
    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.workers.Worker[id=%s, firstName=%s, lastName=%s, email=%s, skills=%s, location=%s]",
                id, firstName, lastName, email, skills, location);
    }

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

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

}
