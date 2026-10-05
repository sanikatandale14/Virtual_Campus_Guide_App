package com.example.campusguide.service

import com.example.campusguide.entity.Announcement
import com.example.campusguide.repository.AnnouncementRepository
import org.springframework.stereotype.Service

@Service
class AnnouncementService(private val announcementRepository: AnnouncementRepository) {

    fun getAllAnnouncements(): List<Announcement> = announcementRepository.findAll()

    fun getAnnouncementById(id: Long): Announcement? = announcementRepository.findById(id).orElse(null)

    fun createAnnouncement(announcement: Announcement): Announcement = announcementRepository.save(announcement)

    fun updateAnnouncement(id: Long, updated: Announcement): Announcement? {
        val existing = announcementRepository.findById(id).orElse(null) ?: return null
        existing.title = updated.title
        existing.message = updated.message
        existing.date = updated.date
        existing.author = updated.author
        return announcementRepository.save(existing)
    }

    fun deleteAnnouncement(id: Long): Boolean {
        if (!announcementRepository.existsById(id)) return false
        announcementRepository.deleteById(id)
        return true
    }
}
