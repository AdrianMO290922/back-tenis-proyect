import { validate } from "class-validator";
import { CreateEmpleadoDto, Rol } from "./create-empleado.dto";

describe('CreateEmpleadoDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CreateEmpleadoDto();
        dto.nombre = "Juan";
        dto.apellido_p = "Perez";
        dto.apellido_m = "Lopez";
        dto.telefono = "123456789";
        dto.email = "juan.perez@example.com";
        dto.password = "securePassword123";
        dto.rol = Rol.EMPLOYEE;

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate with missing fields', async() => {
        const dto = new CreateEmpleadoDto();

        dto.apellido_p = "Perez";
        dto.apellido_m = "";
        dto.telefono = "";
        dto.email = "juan.perez@example.com";
        dto.password = "securePassword123";
        dto.rol = Rol.ADMIN;
        const errors = await validate(dto);

        expect(errors.length).toBe(1); // Esperamos 1 errores de validación
        expect(errors[0].property).toBe('nombre');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CreateEmpleadoDto();

        dto.nombre = "Maria";
        dto.apellido_p = "Gomez";
        dto.apellido_m = "";
        dto.telefono = 123456789; // Tipo inválido
        dto.email = "juan.perez@example.com";
        dto.password = "securePassword123";
        // @ts-ignore
        dto.rol = "Manager"; // Valor inválido para el enum Rol

        const errors = await validate(dto);

        expect(errors.length).toBe(2); // Esperamos 2 errores de validación
        expect(errors[0].property).toBe('telefono');
        expect(errors[1].property).toBe('rol');
    });

});


