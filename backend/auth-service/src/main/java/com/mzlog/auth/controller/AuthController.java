package com.mzlog.auth.controller;

import com.mzlog.auth.client.FuncionarioClient;
import com.mzlog.auth.dto.FuncionarioDto;
import com.mzlog.auth.dto.LoginRequest;
import com.mzlog.auth.dto.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.text.Normalizer;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String ADMIN_USERNAME = "muniz";
    private static final String SENHA_PADRAO = "muniz";
    private static final String CARGO_ADMINISTRATIVO = "administrativo";

    private final FuncionarioClient funcionarioClient;

    public AuthController(FuncionarioClient funcionarioClient) {
        this.funcionarioClient = funcionarioClient;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        String username = request.getUsername().trim().toLowerCase();

        if (!SENHA_PADRAO.equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario ou senha invalidos");
        }

        if (ADMIN_USERNAME.equals(username)) {
            return ResponseEntity.ok(new LoginResponse(
                    UUID.randomUUID().toString(), username, "Administrador", "Administrador", true));
        }

        FuncionarioDto funcionario = buscarFuncionarioPorLogin(username);
        if (funcionario == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario ou senha invalidos");
        }

        boolean admin = ehCategoriaAdministrativa(funcionario.getCargo());
        return ResponseEntity.ok(new LoginResponse(
                UUID.randomUUID().toString(), username, funcionario.getNome(), funcionario.getCargo(), admin));
    }

    private FuncionarioDto buscarFuncionarioPorLogin(String username) {
        List<FuncionarioDto> funcionarios;
        try {
            funcionarios = funcionarioClient.listar();
        } catch (Exception e) {
            return null;
        }
        return funcionarios.stream()
                .filter(f -> gerarLogin(f.getNome()).equals(username))
                .findFirst()
                .orElse(null);
    }

    private boolean ehCategoriaAdministrativa(String cargo) {
        if (cargo == null) {
            return false;
        }
        return normalizar(cargo).equals(CARGO_ADMINISTRATIVO);
    }

    private String gerarLogin(String nomeCompleto) {
        String normalizado = normalizar(nomeCompleto);
        String[] partes = normalizado.split("\\s+");
        if (partes.length == 1) {
            return partes[0];
        }
        return partes[0] + "." + partes[partes.length - 1];
    }

    private String normalizar(String texto) {
        return Normalizer.normalize(texto.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase();
    }
}
