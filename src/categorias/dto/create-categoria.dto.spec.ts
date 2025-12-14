import { validate } from "class-validator";
import { CreateCategoriaDto } from "./create-categoria.dto";

describe('CreateCategoriaDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateCategoriaDto();
        dto.nombre = "Ropa";

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateCategoriaDto();

        dto.nombre = "";

        const errors = await validate(dto);

        expect(errors.length).toBe(1); // Esperamos 1 error de validación
        expect(errors[0].property).toBe('nombre');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateCategoriaDto();

        dto.nombre = true;

        const errors = await validate(dto);

        expect(errors.length).toBe(1); // Esperamos 1 error de validación
        expect(errors[0].property).toBe('nombre');
    });

    it('should invalidate with exceeding max length', async() => {

        const dto = new CreateCategoriaDto();
        dto.nombre = "A".repeat(46); // 46 caracteres, excede el máximo de 45

        const errors = await validate(dto);
        expect(errors.length).toBe(1); // Esperamos 1 error de validación
        expect(errors[0].property).toBe('nombre');
    });

});


