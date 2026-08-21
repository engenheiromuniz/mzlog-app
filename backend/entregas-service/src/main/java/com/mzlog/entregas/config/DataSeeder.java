package com.mzlog.entregas.config;

import com.mzlog.entregas.model.Encomenda;
import com.mzlog.entregas.model.Entrega;
import com.mzlog.entregas.model.Rota;
import com.mzlog.entregas.model.Veiculo;
import com.mzlog.entregas.repository.EncomendaRepository;
import com.mzlog.entregas.repository.EntregaRepository;
import com.mzlog.entregas.repository.RotaRepository;
import com.mzlog.entregas.repository.VeiculoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final VeiculoRepository veiculoRepository;
    private final EntregaRepository entregaRepository;
    private final RotaRepository rotaRepository;
    private final EncomendaRepository encomendaRepository;

    public DataSeeder(VeiculoRepository veiculoRepository, EntregaRepository entregaRepository,
                       RotaRepository rotaRepository, EncomendaRepository encomendaRepository) {
        this.veiculoRepository = veiculoRepository;
        this.entregaRepository = entregaRepository;
        this.rotaRepository = rotaRepository;
        this.encomendaRepository = encomendaRepository;
    }

    @Override
    public void run(String... args) {
        if (veiculoRepository.count() == 0) {
            veiculoRepository.saveAll(java.util.List.of(
                    veiculo("FLA1A23", "Volkswagen Delivery", "Caminhao"),
                    veiculo("FLB2B34", "Mercedes Sprinter", "Van"),
                    veiculo("FLC3C45", "Iveco Daily", "Caminhao")
            ));
        }
        if (entregaRepository.count() == 0) {
            entregaRepository.saveAll(java.util.List.of(
                    entrega("Sao Paulo - Centro", LocalDate.now(), "Em rota"),
                    entrega("Campinas - Industrial", LocalDate.now(), "Pendente"),
                    entrega("Santos - Porto", LocalDate.now().minusDays(1), "Entregue")
            ));
        }
        if (rotaRepository.count() == 0) {
            rotaRepository.save(rota("Sao Paulo", "Campinas", 1L, "Comercial Silva Ltda", 1L, "Carlos Menezes", "Planejada"));
        }
        if (encomendaRepository.count() == 0) {
            encomendaRepository.save(encomenda("Caixa Media", "Medio", 8.5, 0.12, 45.90, 1L, "Comercial Silva Ltda"));
        }
    }

    private Veiculo veiculo(String placa, String modelo, String tipo) {
        Veiculo v = new Veiculo();
        v.setPlaca(placa);
        v.setModelo(modelo);
        v.setTipo(tipo);
        return v;
    }

    private Entrega entrega(String destino, LocalDate data, String status) {
        Entrega e = new Entrega();
        e.setDestino(destino);
        e.setDataEntrega(data);
        e.setStatus(status);
        return e;
    }

    private Rota rota(String origem, String destino, Long clienteId, String clienteNome,
                       Long motoristaId, String motoristaNome, String status) {
        Rota r = new Rota();
        r.setOrigem(origem);
        r.setDestino(destino);
        r.setClienteId(clienteId);
        r.setClienteNome(clienteNome);
        r.setMotoristaId(motoristaId);
        r.setMotoristaNome(motoristaNome);
        r.setStatus(status);
        return r;
    }

    private Encomenda encomenda(String tipo, String tamanho, Double peso, Double volume, Double preco,
                                 Long clienteId, String clienteNome) {
        Encomenda e = new Encomenda();
        e.setTipo(tipo);
        e.setTamanho(tamanho);
        e.setPeso(peso);
        e.setVolume(volume);
        e.setPreco(preco);
        e.setClienteId(clienteId);
        e.setClienteNome(clienteNome);
        return e;
    }
}
