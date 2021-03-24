package app;

import app.entities.common.Location;
import app.entities.customers.Customer;
import app.entities.customers.CustomerRepository;
import app.entities.workers.Skill;
import app.entities.workers.Worker;
import app.entities.workers.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication()
public class RunApplication implements CommandLineRunner {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private WorkerRepository workerRepository;

    public static void main(String[] args) {
        SpringApplication.run(RunApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        customerRepository.deleteAll();
        workerRepository.deleteAll();

        workerRepository.save(new Worker("Steven", "Sheets", "smsheets@iastate.edu", Arrays.asList(
                new Skill("Java", 5),
                new Skill("C", 4)),
                new Location(42.022160, -93.642873)));

        // save a couple of customers
        customerRepository.save(new Customer("Alice", "Smith"));
        customerRepository.save(new Customer("Bob", "Smith"));

        // fetch all customers
        /*
        System.out.println("Customers found with findAll():");
        System.out.println("-------------------------------");
        for (Customer customer : customerRepogsitory.findAll()) {
            System.out.println(customer);
        }
        System.out.println();

        // fetch an individual customer
        System.out.println("app.entities.customers.Customer found with findByFirstName('Alice'):");
        System.out.println("--------------------------------");
        System.out.println(customerRepository.findByFirstName("Alice"));

        System.out.println("Customers found with findByLastName('Smith'):");
        System.out.println("--------------------------------");
        for (Customer customer : customerRepository.findByLastName("Smith")) {
            System.out.println(customer);
        }
        */

    }

}
