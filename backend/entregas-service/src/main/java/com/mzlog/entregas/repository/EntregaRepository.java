package com.mzlog.entregas.repository;

import com.mzlog.entregas.model.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {

    long countByDataEntrega(LocalDate dataEntrega);
}
