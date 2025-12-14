import { validate } from "class-validator";
import { CreateInventarioDto } from "./create-inventario.dto";

describe('CreateInventarioDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateInventarioDto();
        dto.producto_id = 1;
        dto.talla = "25";
        dto.cantidad = 50;
        dto.precio_venta = 150.75;
        dto.precio_compra = 100.50;

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateInventarioDto();

        dto.talla = "M";
        dto.cantidad = 20;
        dto.precio_venta = 200.00;
        // Faltan producto_id y precio_compra

        const errors = await validate(dto);

        expect(errors.length).toBe(2); // Esperamos 2 errores de validación
        expect(errors[0].property).toBe('producto_id');
        expect(errors[1].property).toBe('precio_compra');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateInventarioDto();

        dto.producto_id = "invalid" as any; // Tipo inválido
        dto.talla = 123 as any; // Tipo inválido
        dto.cantidad = -10; // Valor inválido
        dto.precio_venta = "free" as any; // Tipo inválido
        dto.precio_compra = 50.00;

        const errors = await validate(dto);

        expect(errors.length).toBe(3); // Esperamos 3 errores de validación
        expect(errors[0].property).toBe('producto_id');
        expect(errors[1].property).toBe('talla');
        expect(errors[2].property).toBe('precio_venta');
    });

});


