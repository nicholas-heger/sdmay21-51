package app.entities.jobs;

import app.entities.common.Location;
import app.entities.common.Skill;
import app.entities.employers.Employer;
import app.entities.workers.Worker;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "jobs")
public class Job {

    @Id
    private String id;

    @DBRef
    private Employer poster;
    @DBRef
    private Worker assignee;

    private Location location;
    private String description;
    private List<Skill> desiredSkills;

    public Job() {
    }

    public Job(Employer poster, Worker assignee, Location location, String description, List<Skill> desiredSkills) {
        this.poster = poster;
        this.assignee = assignee;
        this.location = location;
        this.description = description;
        this.desiredSkills = desiredSkills;
    }

    @Override
    public String toString() {
        return String.format(
                "app.entities.employers.Job[id=%s, poster=%s, assignee=%s, location=%s, " +
                        "description=%s, desiredSkills=%s]", id, poster, assignee, location, description, desiredSkills);
    }

    public Employer getPoster() {
        return poster;
    }

    public void setPoster(Employer poster) {
        this.poster = poster;
    }

    public Worker getAssignee() {
        return assignee;
    }

    public void setAssignee(Worker assignee) {
        this.assignee = assignee;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Skill> getDesiredSkills() {
        return desiredSkills;
    }

    public void setDesiredSkills(List<Skill> desiredSkills) {
        this.desiredSkills = desiredSkills;
    }
}