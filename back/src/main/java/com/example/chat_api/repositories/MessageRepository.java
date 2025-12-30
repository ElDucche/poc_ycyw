package com.example.chat_api.repositories;

import com.example.chat_api.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByUserIdOrderBySentAtAsc(Long userId);
}
