package com.example.campusguide.service

import com.example.campusguide.entity.User
import com.example.campusguide.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

data class AuthResult(val token: String, val name: String, val email: String, val role: String)

@Service
class AuthService(private val userRepository: UserRepository) {

    private val passwordEncoder = BCryptPasswordEncoder()
    // token -> email (simple in-memory session store, enough for a college project)
    private val sessions = ConcurrentHashMap<String, String>()

    fun register(name: String, email: String, password: String, role: String): AuthResult {
        if (name.isBlank() || email.isBlank() || password.length < 6) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Name, email and a password of at least 6 characters are required")
        }
        if (userRepository.existsByEmail(email)) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already registered")
        }
        val safeRole = if (role.equals("VISITOR", true)) "VISITOR" else "STUDENT"
        val user = userRepository.save(
            User(name = name, email = email, passwordHash = passwordEncoder.encode(password), role = safeRole)
        )
        return login(email, password)
    }

    fun login(email: String, password: String): AuthResult {
        val user = userRepository.findByEmail(email)
            ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password")
        if (!passwordEncoder.matches(password, user.passwordHash)) {
            throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password")
        }
        val token = UUID.randomUUID().toString()
        sessions[token] = user.email
        return AuthResult(token, user.name, user.email, user.role)
    }

    fun logout(token: String?) {
        if (token != null) sessions.remove(token)
    }

    fun getUserByToken(token: String?): User? {
        if (token == null) return null
        val email = sessions[token] ?: return null
        return userRepository.findByEmail(email)
    }

    fun requireUser(authHeader: String?): User {
        return getUserByToken(extractToken(authHeader))
            ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login first")
    }

    fun requireAdmin(authHeader: String?): User {
        val user = requireUser(authHeader)
        if (user.role != "ADMIN") {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required")
        }
        return user
    }

    fun extractToken(authHeader: String?): String? {
        if (authHeader == null) return null
        return if (authHeader.startsWith("Bearer ")) authHeader.removePrefix("Bearer ") else authHeader
    }
}
