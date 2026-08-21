package com.mzlog.funcionarios.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CargoFuncionarioConverter implements AttributeConverter<CargoFuncionario, String> {

    @Override
    public String convertToDatabaseColumn(CargoFuncionario cargo) {
        return cargo == null ? null : cargo.getLabel();
    }

    @Override
    public CargoFuncionario convertToEntityAttribute(String dbValue) {
        return dbValue == null ? null : CargoFuncionario.fromLabel(dbValue);
    }
}
