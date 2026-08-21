package com.mzlog.entregas.controller;

import com.mzlog.entregas.model.Encomenda;
import com.mzlog.entregas.repository.EncomendaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/encomendas")
public class EncomendaController {

    private final EncomendaRepository encomendaRepository;

    public EncomendaController(EncomendaRepository encomendaRepository) {
        this.encomendaRepository = encomendaRepository;
    }

    @GetMapping
    public List<Encomenda> listar() {
        return encomendaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Encomenda buscar(@PathVariable Long id) {
        return encomendaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Encomenda nao encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Encomenda criar(@Valid @RequestBody Encomenda encomenda) {
        encomenda.setId(null);
        return encomendaRepository.save(encomenda);
    }

    @PutMapping("/{id}")
    public Encomenda atualizar(@PathVariable Long id, @Valid @RequestBody Encomenda dados) {
        Encomenda encomenda = encomendaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Encomenda nao encontrada"));
        encomenda.setTipo(dados.getTipo());
        encomenda.setTamanho(dados.getTamanho());
        encomenda.setPeso(dados.getPeso());
        encomenda.setVolume(dados.getVolume());
        encomenda.setPreco(dados.getPreco());
        encomenda.setClienteId(dados.getClienteId());
        encomenda.setClienteNome(dados.getClienteNome());
        return encomendaRepository.save(encomenda);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        if (!encomendaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Encomenda nao encontrada");
        }
        encomendaRepository.deleteById(id);
    }
}
