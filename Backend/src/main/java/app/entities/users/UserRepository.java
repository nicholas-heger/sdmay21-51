package app.entities.users;

import app.JwtModel.JwtUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<JwtUser, String> {
    JwtUser findByUserName(String userName);
}
