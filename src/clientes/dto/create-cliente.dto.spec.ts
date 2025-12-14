import { validate } from "class-validator";
import { CrearteClienteDto } from "./create-cliente.dto";

describe('CreateClienteDto', () => {

    it('should validate a valid DTO', async() => {

        const dto = new CrearteClienteDto();
        dto.nombres = "Air Force 1";
        dto.apellido_p = "Blanco";
        dto.apellido_m = "Nike";
        dto.telefono = "1234567890";
        dto.email = "example@example.com";
        dto.fecha_nacimiento = new Date('2000-01-01');
        dto.password = "securePassword123";

        const errors = await validate(dto);

        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should validate a valid DTO without optional fields', async() => {

        const dto = new CrearteClienteDto();
        dto.nombres = "Air Force 1";
        dto.apellido_p = "Blanco";
        dto.telefono = "1234567890";
        dto.email = "example@example.com";
        dto.password = "securePassword123";

        const errors = await validate(dto);
        expect(errors.length).toBe(0); // No esperamos errores de validación
    });

    it('should invalidate missing required fields', async() => {

        const dto = new CrearteClienteDto();
        // No asignamos ningun valor a los campos requeridos   
        const errors = await validate(dto);

        expect(errors.length).toBe(5); // Esperamos 5 errores de validación
        const propertiesWithErrors = errors.map(error => error.property);
        expect(propertiesWithErrors).toContain('nombres');
        expect(propertiesWithErrors).toContain('apellido_p');
        expect(propertiesWithErrors).toContain('telefono');
        expect(propertiesWithErrors).toContain('email');
        expect(propertiesWithErrors).toContain('password');
    });

    it('should invalidate with invalid types', async() => {

        const dto = new CrearteClienteDto();

        dto.nombres = 12345;
        dto.apellido_p = true;
        dto.telefono = { number: "1234567890" };
        dto.email = ["invalid", "email"];
        dto.password = true;

        const errors = await validate(dto);

        expect(errors.length).toBe(5); // Esperamos 5 errores de validación
        expect(errors[0].property).toBe('nombres');
        expect(errors[1].property).toBe('apellido_p');
        expect(errors[2].property).toBe('telefono');
        expect(errors[3].property).toBe('email');
        expect(errors[4].property).toBe('password');
    });

});


