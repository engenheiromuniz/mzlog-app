package com.mzlog.clientes.config;

import com.mzlog.clientes.model.Cliente;
import com.mzlog.clientes.repository.ClienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ClienteRepository clienteRepository;

    public DataSeeder(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public void run(String... args) {
        if (clienteRepository.count() > 0) {
            return;
        }
        clienteRepository.saveAll(java.util.List.of(
                cliente("Comercial Silva Ltda", "Sao Paulo", "(11) 98888-1111"),
                cliente("Distribuidora Andrade", "Campinas", "(19) 97777-2222"),
                cliente("Mercado Boa Vista", "Ribeirao Preto", "(16) 96666-3333")
        ));
    }

    private Cliente cliente(String nome, String cidade, String telefone) {
        Cliente c = new Cliente();
        c.setNome(nome);
        c.setCidade(cidade);
        c.setTelefone(telefone);
        return c;
    }
}
