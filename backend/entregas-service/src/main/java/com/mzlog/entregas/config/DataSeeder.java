package com.mzlog.entregas.config;

import com.mzlog.entregas.model.Entrega;
import com.mzlog.entregas.model.Veiculo;
import com.mzlog.entregas.repository.EntregaRepository;
import com.mzlog.entregas.repository.VeiculoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final VeiculoRepository veiculoRepository;
    private final EntregaRepository entregaRepository;

    public DataSeeder(VeiculoRepository veiculoRepository, EntregaRepository entregaRepository) {
        this.veiculoRepository = veiculoRepository;
        this.entregaRepository = entregaRepository;
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
}
