package com.mzlog.entregas.repository;

import com.mzlog.entregas.model.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {
}
