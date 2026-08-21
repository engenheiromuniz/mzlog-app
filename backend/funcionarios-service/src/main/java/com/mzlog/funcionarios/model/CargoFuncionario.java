package com.mzlog.funcionarios.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CargoFuncionario {

    MOTORISTA("Motorista"),
    DESPACHANTE("Despachante"),
    AUXILIAR_LOGISTICA("Auxiliar de Logistica"),
    ADMINISTRATIVO("Administrativo"),
    DIRETOR("Diretor"),
    ADMIN("Admin");

    private final String label;

    CargoFuncionario(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static CargoFuncionario fromLabel(String label) {
        for (CargoFuncionario cargo : values()) {
            if (cargo.label.equalsIgnoreCase(label)) {
                return cargo;
            }
        }
        throw new IllegalArgumentException("Cargo invalido: " + label);
    }
}
