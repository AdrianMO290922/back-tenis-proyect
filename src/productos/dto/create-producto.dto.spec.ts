import { validate } from "class-validator";
import { CreateProductoDto } from "./create-producto.dto";

describe('CreateProductoDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateProductoDto();
        dto.nombre = "Air Force 1";
        dto.color = "Rojo";
        dto.categoria_id = 10;
        dto.marca_id = 20;

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateProductoDto();

        dto.nombre = "";
        dto.color = "Rojo";
        // dto.categoria_id falta
        dto.marca_id = 20;

        const errors = await validate(dto);

        expect(errors.length).toBe(2); // Esperamos 2 errores de validación
        expect(errors[0].property).toBe('nombre');
        expect(errors[1].property).toBe('categoria_id');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateProductoDto();

        dto.nombre = true;
        dto.color = 2;
        dto.categoria_id = '100'; // Error aquí
        dto.marca_id = null; // Error aquí

        const errors = await validate(dto);

        expect(errors.length).toBe(4); // Esperamos 4 errores de validación
        expect(errors[0].property).toBe('nombre');
        expect(errors[1].property).toBe('color');
        expect(errors[2].property).toBe('categoria_id');
        expect(errors[3].property).toBe('marca_id');
    });

});


