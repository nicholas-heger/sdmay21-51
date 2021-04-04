package app.entities.workers;

import app.entities.common.Location;
import app.entities.common.Skill;
import app.entities.jobs.Job;
import app.entities.users.User;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workers")
public class Worker extends User {
    private List<Skill> skills;
    private Location location;
    @DBRef
    private Job currentJob;

    public Worker(String firstName, String lastName, String email, String password, List<Skill> skills, Location location) {
        super(firstName, lastName, email, password);
        this.skills = skills;
        this.location = location;

    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.workers.Worker[id=%s, firstName=%s, lastName=%s, email=%s, skills=%s, location=%s]",
                this.getId(), this.getFirstName(), this.getLastName(), this.getEmail(), skills, location);
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

    public Job getCurrentJob() {
        return currentJob;
    }

    public void setCurrentJob(Job currentJob) {
        this.currentJob = currentJob;
    }
}
