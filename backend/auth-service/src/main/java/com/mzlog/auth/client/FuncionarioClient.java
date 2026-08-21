package com.mzlog.auth.client;

import com.mzlog.auth.dto.FuncionarioDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
public class FuncionarioClient {

    private final RestClient restClient;

    public FuncionarioClient(@Value("${funcionarios.service.url}") String baseUrl) {
        this.restClient = RestClient.create(baseUrl);
    }

    public List<FuncionarioDto> listar() {
        return restClient.get()
                .uri("/api/funcionarios")
                .retrieve()
                .body(new ParameterizedTypeReference<List<FuncionarioDto>>() {
                });
    }
}
