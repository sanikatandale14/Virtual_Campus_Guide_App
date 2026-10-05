package com.example.campusguide.controller

import com.example.campusguide.entity.Announcement
import com.example.campusguide.service.AnnouncementService
import com.example.campusguide.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = ["*"])
class AnnouncementController(
    private val announcementService: AnnouncementService,
    private val authService: AuthService
) {

    @GetMapping
    fun getAllAnnouncements(): List<Announcement> = announcementService.getAllAnnouncements()

    @GetMapping("/{id}")
    fun getAnnouncementById(@PathVariable id: Long): ResponseEntity<Announcement> {
        val announcement = announcementService.getAnnouncementById(id)
        return if (announcement != null) ResponseEntity.ok(announcement)
        else ResponseEntity.notFound().build()
    }

    @PostMapping
    fun createAnnouncement(@RequestBody announcement: Announcement,
                           @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Announcement> {
        authService.requireAdmin(auth)
        return ResponseEntity.status(HttpStatus.CREATED).body(announcementService.createAnnouncement(announcement))
    }

    @PutMapping("/{id}")
    fun updateAnnouncement(@PathVariable id: Long, @RequestBody announcement: Announcement,
                           @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Announcement> {
        authService.requireAdmin(auth)
        val updated = announcementService.updateAnnouncement(id, announcement)
        return if (updated != null) ResponseEntity.ok(updated)
        else ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteAnnouncement(@PathVariable id: Long,
                           @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Void> {
        authService.requireAdmin(auth)
        return if (announcementService.deleteAnnouncement(id)) ResponseEntity.noContent().build()
        else ResponseEntity.notFound().build()
    }
}
