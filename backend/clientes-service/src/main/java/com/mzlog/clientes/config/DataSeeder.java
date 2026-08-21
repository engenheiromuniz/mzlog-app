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
                cliente("Comercial Silva Ltda", "01310-100", "Av. Paulista, Bela Vista", "Sao Paulo", "SP", "(11) 98888-1111"),
                cliente("Distribuidora Andrade", "13010-141", "Rua Barao de Jaguara, Centro", "Campinas", "SP", "(19) 97777-2222"),
                cliente("Mercado Boa Vista", "14010-100", "Rua General Osorio, Centro", "Ribeirao Preto", "SP", "(16) 96666-3333")
        ));
    }

    private Cliente cliente(String nome, String cep, String endereco, String cidade, String estado, String telefone) {
        Cliente c = new Cliente();
        c.setNome(nome);
        c.setCep(cep);
        c.setEndereco(endereco);
        c.setCidade(cidade);
        c.setEstado(estado);
        c.setTelefone(telefone);
        return c;
    }
}
