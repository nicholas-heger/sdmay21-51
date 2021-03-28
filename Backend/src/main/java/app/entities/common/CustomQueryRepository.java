package app.entities.common;

import app.entities.employers.EmployerRepository;
import app.entities.jobs.Job;
import app.entities.jobs.JobRepository;
import app.entities.workers.Worker;
import app.entities.workers.WorkerRepository;

import java.util.ArrayList;
import java.util.List;

public class CustomQueryRepository {
    private JobRepository jobRepository;
    private EmployerRepository employerRepository;
    private WorkerRepository workerRepository;

    public CustomQueryRepository(JobRepository jobRepository, EmployerRepository employerRepository, WorkerRepository workerRepository) {
        this.jobRepository = jobRepository;
        this.employerRepository = employerRepository;
        this.workerRepository = workerRepository;
    }

    public List<Worker> findWorkersByDesiredSkills(List<Skill> desiredSkills) {
        List<Job> allJobs = jobRepository.findAll();
        List<Worker> allWorkers = workerRepository.findAll();

        List<Worker> output = new ArrayList<>();

        for (Worker worker : allWorkers) {
            List<Skill> workerSkills = worker.getSkills();
            int skillsSatisfied = 0;

            for (Skill workerSkill : workerSkills) {
                for (Skill desiredSkill : desiredSkills) {
                    if (workerSkill.getName().equals(desiredSkill.getName()) && workerSkill.getRating() >= desiredSkill.getRating()) {
                        skillsSatisfied++;
                    }
                }
            }
            if (skillsSatisfied == desiredSkills.size()) {
                output.add(worker);
            }
        }
        return output;
    }

    public List<Job> findJobsByDesiredSkills(List<Skill> desiredSkills) {
        List<Job> allJobs = jobRepository.findAll();
        List<Job> output = new ArrayList<>();

        for (Job job : allJobs) {
            List<Skill> jobSkills = job.getDesiredSkills();
            int skillsSatisfied = 0;

            for (Skill jobSkill : jobSkills) {
                for (Skill desiredSkill : desiredSkills) {
                    if (jobSkill.getName().equals(desiredSkill.getName()) && jobSkill.getRating() >= desiredSkill.getRating()) {
                        skillsSatisfied++;
                    }
                }
            }
            if (skillsSatisfied == desiredSkills.size()) {
                output.add(job);
            }
        }
        return output;
    }
}
