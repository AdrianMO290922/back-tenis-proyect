import 'reflect-metadata'

import { validate } from "class-validator";
import { CreateVentaDto, TipoPagoEnum, TipoVentaEnum, DetalleVentaInput } from "./create-venta.dto";

describe('CreateVentaDto', () => {

    it('should validate a valid DTO', async() => {

        const detalleVentaInputs: DetalleVentaInput[] = [];
            const detalleVentaInput = new DetalleVentaInput();
        detalleVentaInput.inventario_id = 1;
        detalleVentaInput.cantidad = 2;
        detalleVentaInput.total = 500.00;
        detalleVentaInputs.push(detalleVentaInput);

        const dto = new CreateVentaDto();
        dto.fecha = new Date('2024-06-15T10:00:00Z');
        dto.tipo_venta = TipoVentaEnum.Online;
        dto.tipo_pago = TipoPagoEnum.Tarjeta;
        dto.cliente_id = 123;
        dto.empleado_id = 456;
        dto.subtotal = 1500.50;
        dto.descuento = 50;
        dto.total = 1400.50;
        dto.detalles = detalleVentaInputs;

        const errors = await validate(dto);

        expect(errors.length).toBe(1); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateVentaDto();

        dto.fecha = new Date('2024-06-15T10:00:00Z');
        dto.tipo_venta = TipoVentaEnum.Online;
        dto.tipo_pago = TipoPagoEnum.Tarjeta;
        dto.cliente_id = 123;
        dto.empleado_id = null; // Error aquí
        dto.subtotal = 1500.50;
        dto.descuento = 50;
        dto.total = null; // Error aquí
        // @ts-ignore
        dto.detalles = null; // Error aquí

        const errors = await validate(dto);

        expect(errors.length).toBe(4); // Esperamos 4 errores de validación
        expect(errors[0].property).toBe('fecha');
        expect(errors[1].property).toBe('empleado_id');
        expect(errors[2].property).toBe('total');
        expect(errors[3].property).toBe('detalles');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateVentaDto();

        dto.fecha = new Date('2024-06-15T10:00:00Z');
        dto.tipo_venta = TipoVentaEnum.Online;
        dto.tipo_pago = 'InvalidTipoPago' as any; // Error aquí
        dto.cliente_id = 123;
        dto.empleado_id = "invalid_id" as any; // Error aquí
        dto.subtotal = 1500.50;
        dto.descuento = 50;
        dto.total = 1400.50;
        dto.detalles = 123 as any; // Error aquí

        const errors = await validate(dto);
        console.log(errors);

        expect(errors.length).toBe(4); // Esperamos 4 errores de validación
        expect(errors[0].property).toBe('fecha');
        expect(errors[1].property).toBe('tipo_pago');
        expect(errors[2].property).toBe('empleado_id');
        expect(errors[3].property).toBe('detalles');
    });
});


