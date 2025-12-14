import { validate } from "class-validator";
import { CreateDomicilioDto } from "./create-domicilio.dto";

describe('CreateDomicilioDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateDomicilioDto();
        dto.calle = "Av. Siempre Viva";
        dto.colonia = "Springfield";
        dto.numero = "742";
        dto.cp = "12345";
        dto.ciudad = "Springfield";
        dto.estado = "Estado Ficticio";
        dto.referencia = "Cerca del parque";

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateDomicilioDto();

        dto.calle = "";
        dto.colonia = "Springfield";
        dto.numero = "";
        dto.cp = "12345";
        dto.ciudad = "Springfield";
        // dto.estado is missing
        dto.referencia = "Cerca del parque";

        const errors = await validate(dto);

        expect(errors.length).toBe(3); // Esperamos 3 errores de validación
        expect(errors[0].property).toBe('calle');
        expect(errors[1].property).toBe('numero');
        expect(errors[2].property).toBe('estado');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateDomicilioDto();

        dto.calle = true; // Invalid type
        dto.colonia = 2; // Invalid type
        dto.numero = '100'; 
        dto.cp = false; // Invalid type
        dto.ciudad = "Springfield";
        dto.estado = "Estado Ficticio";
        dto.referencia = "Cerca del parque";

        const errors = await validate(dto);

        expect(errors.length).toBe(3); // Esperamos 3 errores de validación
        expect(errors[0].property).toBe('calle');
        expect(errors[1].property).toBe('colonia');
        expect(errors[2].property).toBe('cp');
    });

    it('should invalidate with exceeding max length', async() => {

        const dto = new CreateDomicilioDto();
        dto.calle = "A".repeat(46); // Exceeds max length
        dto.colonia = "B".repeat(46); // Exceeds max length
        dto.numero = "C".repeat(46); // Exceeds max length
        dto.cp = "1".repeat(11); // Exceeds max length
        dto.ciudad = "D".repeat(46); // Exceeds max length
        dto.estado = "E".repeat(46); // Exceeds max length
        dto.referencia = "F".repeat(46); // Exceeds max length
        const errors = await validate(dto);

        expect(errors.length).toBe(7); // Esperamos 7 errores de validación
        expect(errors[0].property).toBe('calle');
        expect(errors[1].property).toBe('colonia');
        expect(errors[2].property).toBe('numero');
        expect(errors[3].property).toBe('cp');
        expect(errors[4].property).toBe('ciudad');
        expect(errors[5].property).toBe('estado');
        expect(errors[6].property).toBe('referencia');
    });

});


