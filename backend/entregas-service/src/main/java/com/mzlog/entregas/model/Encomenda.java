package com.mzlog.entregas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "encomendas")
@Getter
@Setter
@NoArgsConstructor
public class Encomenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String tipo;

    @NotBlank
    private String tamanho;

    @NotNull
    @Positive
    private Double peso;

    @NotNull
    @Positive
    private Double volume;

    @NotNull
    @PositiveOrZero
    private Double preco;

    @NotNull
    private Long clienteId;

    @NotBlank
    private String clienteNome;
}
