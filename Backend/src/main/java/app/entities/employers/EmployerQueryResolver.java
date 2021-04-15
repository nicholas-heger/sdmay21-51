package app.entities.employers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class EmployerQueryResolver implements GraphQLQueryResolver {

    @Autowired
    public EmployerRepository employerRepository;

    public List<Employer> findByFirstName(String firstName) {
        return employerRepository.findByFirstName(firstName);
    }

    public List<Employer> getEmployers(Optional<String> email) {
        List<Employer> employerList = employerRepository.findAll();
        if (email.isPresent()) {
            employerList = employerList.stream().filter(employer -> employer.getEmail().equals(email.get())).collect(Collectors.toList());
        }
        return employerList;
    }
}
