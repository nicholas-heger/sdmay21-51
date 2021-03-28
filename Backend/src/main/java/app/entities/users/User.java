package app.entities.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.security.crypto.password.PasswordEncoder;

public abstract class User {
    @Id
    protected String id;

    protected String firstName;
    protected String lastName;

    protected String email;

    protected String password;

}