package com.example.complain.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.complain.entity.User;
import com.example.complain.repository.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public void setRepository(UserRepository repository) {
        this.userRepository = repository;
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<User> findAll() throws Exception {
        List<User> userList = userRepository.findAll();
        return userList;
    }

    public User updateById(Long id, User user) throws Exception {
        User foundedUser = userRepository.findById(id).orElseThrow(Exception::new);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setId(foundedUser.getId());
        return userRepository.save(user);
    }

    public void delete(Long id) throws Exception {
        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("Failed to delete User");
        }
    }
}
