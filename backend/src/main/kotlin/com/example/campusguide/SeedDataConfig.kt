package com.example.campusguide

import com.example.campusguide.entity.User
import com.example.campusguide.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Configuration
class SeedDataConfig {

    @Bean
    fun seedUsers(userRepository: UserRepository) = CommandLineRunner {
        val encoder = BCryptPasswordEncoder()
        if (!userRepository.existsByEmail("admin@college.com")) {
            userRepository.save(User(name = "Admin", email = "admin@college.com",
                passwordHash = encoder.encode("admin123"), role = "ADMIN"))
        }
        if (!userRepository.existsByEmail("student@college.com")) {
            userRepository.save(User(name = "Test Student", email = "student@college.com",
                passwordHash = encoder.encode("student123"), role = "STUDENT"))
        }
    }
}
