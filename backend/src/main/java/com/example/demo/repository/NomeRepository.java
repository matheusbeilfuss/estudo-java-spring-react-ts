package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Nome;

@Repository
public interface NomeRepository extends JpaRepository<Nome, Long> {
}
