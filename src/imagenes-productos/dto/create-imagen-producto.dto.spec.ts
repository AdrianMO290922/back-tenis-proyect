import { validate } from "class-validator";
import { CreateImagenProductoDto } from "./create-imagen-producto.dto";

describe('CreateImagenProductoDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateImagenProductoDto();
        dto.producto_id = 1;
        dto.url = "https://example.com/image.jpg";
        dto.es_principal = true;

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateImagenProductoDto();

        dto.producto_id = null;
        dto.url = "";
        // dto.es_principal falta

        const errors = await validate(dto);

        expect(errors.length).toBe(2); // Esperamos 2 errores de validación
        expect(errors[0].property).toBe('producto_id');
        expect(errors[1].property).toBe('url');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateImagenProductoDto();

        dto.producto_id = "not-a-number" as any;
        dto.url = "not-a-url";
        dto.es_principal = "not-a-boolean" as any;

        const errors = await validate(dto);

        expect(errors.length).toBe(3); // Esperamos 3 errores de validación
        expect(errors[0].property).toBe('producto_id');
        expect(errors[1].property).toBe('url');
        expect(errors[2].property).toBe('es_principal');
    });

});


