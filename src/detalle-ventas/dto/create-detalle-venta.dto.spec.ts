import 'reflect-metadata';

import { validate } from "class-validator";
import { CreateDetalleVentaDto } from "./create-detalle-venta.dto";

describe('CreateDetalleVentaDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateDetalleVentaDto();
        dto.venta_id = 1;
        dto.inventario_id = 2;
        dto.cantidad = 10;
        dto.total = 199;

        const errors = await validate(dto);
        console.log(errors);

        expect(errors.length).toBe(1); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateDetalleVentaDto();

        dto.inventario_id = 2;
        dto.cantidad = 10;
        dto.total = 199.99;

        const errors = await validate(dto);
        console.log(errors);

        expect(errors.length).toBe(2); // Esperamos 2 errores de validación
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateDetalleVentaDto();

        dto.venta_id = true; // Error aquí
        dto.inventario_id = '2'; // Error aquí
        dto.cantidad = '100'; // Error aquí
        dto.total = null; // Error aquí

        const errors = await validate(dto);

        expect(errors.length).toBe(4); // Esperamos 4 errores de validación
        expect(errors[0].property).toBe('venta_id');
        expect(errors[1].property).toBe('inventario_id');
        expect(errors[2].property).toBe('cantidad');
        expect(errors[3].property).toBe('total');
    });

    it('should invalidate with out of range values', async() => {

        const dto = new CreateDetalleVentaDto();
        dto.venta_id = -1; // Error aquí
        dto.inventario_id = 2;
        dto.cantidad = 10000; // Error aquí
        dto.total = 100000000; // Error aquí
        const errors = await validate(dto);

        expect(errors.length).toBe(3); // Esperamos 3 errores de validación
        expect(errors[0].property).toBe('venta_id');
        expect(errors[1].property).toBe('cantidad');
        expect(errors[2].property).toBe('total');
    });

    it('should invalidate with negative total', async() => {
        const dto = new CreateDetalleVentaDto();
        dto.venta_id = 1;
        dto.inventario_id = 2;
        dto.cantidad = 10;
        dto.total = -50.00; // Error aquí
        const errors = await validate(dto);

        expect(errors.length).toBe(1); // Esperamos 1 error de validación
        expect(errors[0].property).toBe('total');
    });

});


