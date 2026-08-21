package com.mzlog.entregas.controller;

import com.mzlog.entregas.model.Rota;
import com.mzlog.entregas.repository.RotaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/rotas")
public class RotaController {

    private final RotaRepository rotaRepository;

    public RotaController(RotaRepository rotaRepository) {
        this.rotaRepository = rotaRepository;
    }

    @GetMapping
    public List<Rota> listar() {
        return rotaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rota buscar(@PathVariable Long id) {
        return rotaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rota nao encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Rota criar(@Valid @RequestBody Rota rota) {
        rota.setId(null);
        return rotaRepository.save(rota);
    }

    @PutMapping("/{id}")
    public Rota atualizar(@PathVariable Long id, @Valid @RequestBody Rota dados) {
        Rota rota = rotaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rota nao encontrada"));
        rota.setOrigem(dados.getOrigem());
        rota.setDestino(dados.getDestino());
        rota.setMotoristaId(dados.getMotoristaId());
        rota.setMotoristaNome(dados.getMotoristaNome());
        rota.setStatus(dados.getStatus());
        return rotaRepository.save(rota);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        if (!rotaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Rota nao encontrada");
        }
        rotaRepository.deleteById(id);
    }
}
