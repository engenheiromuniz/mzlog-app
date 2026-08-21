package com.mzlog.entregas.controller;

import com.mzlog.entregas.model.Entrega;
import com.mzlog.entregas.repository.EntregaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/entregas")
public class EntregaController {

    private final EntregaRepository entregaRepository;

    public EntregaController(EntregaRepository entregaRepository) {
        this.entregaRepository = entregaRepository;
    }

    @GetMapping
    public List<Entrega> listar() {
        return entregaRepository.findAll();
    }

    @GetMapping("/count-hoje")
    public long contarHoje() {
        return entregaRepository.countByDataEntrega(LocalDate.now());
    }

    @GetMapping("/{id}")
    public Entrega buscar(@PathVariable Long id) {
        return entregaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entrega nao encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Entrega criar(@Valid @RequestBody Entrega entrega) {
        entrega.setId(null);
        return entregaRepository.save(entrega);
    }

    @PutMapping("/{id}")
    public Entrega atualizar(@PathVariable Long id, @Valid @RequestBody Entrega dados) {
        Entrega entrega = entregaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entrega nao encontrada"));
        entrega.setDestino(dados.getDestino());
        entrega.setDataEntrega(dados.getDataEntrega());
        entrega.setStatus(dados.getStatus());
        return entregaRepository.save(entrega);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        if (!entregaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entrega nao encontrada");
        }
        entregaRepository.deleteById(id);
    }
}
