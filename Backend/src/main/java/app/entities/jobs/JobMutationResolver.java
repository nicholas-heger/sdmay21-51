package app.entities.jobs;

import app.entities.common.Location;
import app.entities.common.Skill;
import app.entities.employers.Employer;
import app.entities.employers.EmployerRepository;
import app.entities.workers.Worker;
import app.entities.workers.WorkerRepository;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class JobMutationResolver implements GraphQLMutationResolver {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private WorkerRepository workerRepository;

    private List<Skill> skillListInputToList(List<Skill.SkillInput> skillInputList) {
        List<Skill> skillList = new ArrayList<>();
        skillInputList.forEach((x) -> skillList.add(x.toSkill()));
        return skillList;
    }

    public Job createJob(String employerId, Optional<String> workerId, Location.LocationInput locationInput, String description, List<Skill.SkillInput> skillInputList) {
        try {
            Employer employer = employerRepository.findById(employerId).get();
            Worker worker = null;
            if (workerId.isPresent()) {
                worker = workerRepository.findById(workerId.get()).get();
            }
            Job job = new Job(employer, worker, locationInput.toLocation(), description, skillListInputToList(skillInputList));
            return jobRepository.save(job);
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    public Job updateJob(String id, Optional<String> employerId, Optional<String> workerId, Optional<Location.LocationInput> locationInput, Optional<String> description, List<Skill.SkillInput> skillInputList) {
        Optional<Worker> workerOptional = workerRepository.findById(id);
        try {
            Job job = jobRepository.findById(id).get();

            if (workerId.isPresent()) {
                job.setWorker(workerRepository.findById(workerId.get()).get());
            }
            if (employerId.isPresent()) {
                job.setEmployer(employerRepository.findById(employerId.get()).get());
            }

            locationInput.ifPresent(j -> job.setLocation(j.toLocation()));
            description.ifPresent(job::setDescription);
            if (skillInputList != null) {
                job.setDesiredSkills(skillListInputToList(skillInputList));
            }
            return jobRepository.save(job);
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    public Boolean deleteJob(String jobId) {
        try {
            jobRepository.delete(jobRepository.findById(jobId).get());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
