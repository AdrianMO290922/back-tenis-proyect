import { validate } from "class-validator";
import { CreateMarcaDto } from "./create-marca.dto";

describe('CreateMarcaDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateMarcaDto();
        dto.nombre = "Nike";

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateMarcaDto();

        dto.nombre = "";

        const errors = await validate(dto);

        expect(errors.length).toBe(1); // Esperamos 1 error de validación
        expect(errors[0].property).toBe('nombre');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateMarcaDto();

        dto.nombre = true;

        const errors = await validate(dto);

        expect(errors.length).toBe(1); // Esperamos 1 error de validación
        expect(errors[0].property).toBe('nombre');
    });

});


