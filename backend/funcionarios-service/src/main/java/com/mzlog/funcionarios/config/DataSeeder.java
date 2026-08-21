package com.mzlog.funcionarios.config;

import com.mzlog.funcionarios.model.Funcionario;
import com.mzlog.funcionarios.repository.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FuncionarioRepository funcionarioRepository;

    public DataSeeder(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    @Override
    public void run(String... args) {
        if (funcionarioRepository.count() > 0) {
            return;
        }
        funcionarioRepository.saveAll(java.util.List.of(
                funcionario("Carlos Menezes", "Motorista", "Ativo"),
                funcionario("Fernanda Lima", "Despachante", "Ativo"),
                funcionario("Joao Pereira", "Auxiliar de Logistica", "Ferias")
        ));
    }

    private Funcionario funcionario(String nome, String cargo, String status) {
        Funcionario f = new Funcionario();
        f.setNome(nome);
        f.setCargo(cargo);
        f.setStatus(status);
        return f;
    }
}
