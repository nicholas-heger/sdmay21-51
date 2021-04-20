package app.entities.users;

import java.util.List;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import app.JwtModel.JwtUser;
//import com.graphqlspringdemo.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/rest/graphql")
public class UserQuery implements GraphQLQueryResolver {

    public UserQuery(UserRepository userRepository) {
        super();
        this.userRepository=userRepository;
    }
    @Autowired
    private UserRepository userRepository;

    public JwtUser loginUser(String userName){
        JwtUser dbUser=userRepository.findByUserName(userName);
//		System.out.println(dbUser.getName());
        return dbUser;
    }

    public List<JwtUser> allUsers() {
        return userRepository.findAll();
    }
}
