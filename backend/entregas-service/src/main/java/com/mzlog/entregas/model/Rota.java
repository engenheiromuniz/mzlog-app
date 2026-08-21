package com.mzlog.entregas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rotas")
@Getter
@Setter
@NoArgsConstructor
public class Rota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String origem;

    @NotBlank
    private String destino;

    @NotNull
    private Long clienteId;

    @NotBlank
    private String clienteNome;

    @NotNull
    private Long motoristaId;

    @NotBlank
    private String motoristaNome;

    @NotBlank
    private String status;
}
