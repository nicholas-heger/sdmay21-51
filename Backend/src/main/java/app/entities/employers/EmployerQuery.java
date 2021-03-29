package app.entities.employers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployerQuery implements GraphQLQueryResolver {

    @Autowired
    public EmployerRepository employerRepository;

    public List<Employer> findByFirstName(String firstName){
        return employerRepository.findByFirstName(firstName);
    }

    public List<Employer> getEmployers (){
        return employerRepository.findAll();
    }
}
