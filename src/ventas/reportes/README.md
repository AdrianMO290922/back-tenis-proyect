# 📊 Servicio de Reportes de Ventas en PDF

## Descripción
Este servicio genera reportes de ventas en formato PDF usando la librería `pdfmake`. Los reportes incluyen información detallada de todas las transacciones de ventas dentro de un rango de fechas especificado.

## Datos que se incluyen en el reporte

### Por Venta Principal:
- **ID** de la venta
- **Fecha** de la venta (formato: DD/MM/YYYY)
- **Cliente** (nombre completo si existe, o "Cliente General")
- **Empleado** responsable de la venta (nombre completo)
- **Tipo de venta** (Presencial/Online)
- **Tipo de pago** (Efectivo/Tarjeta/Transferencia)
- **Subtotal** de la venta
- **Descuento** aplicado
- **Total** de la venta

### Por Item (Detalle de Productos):
- **Nombre del producto**
- **Talla** del producto
- **Cantidad** vendida
- **Precio unitario** de venta
- **Total** del item

### Totales del Reporte:
- **Subtotal general** de todas las ventas
- **Total de descuentos** aplicados
- **Total general** del período
- **Cantidad total** de ventas registradas

## Estructura de datos mapeada

El servicio mapea correctamente los datos desde la estructura de Prisma:

```typescript
{
  id: number,
  fecha: DateTime,
  tipo_venta: "Presencial" | "Online",
  tipo_pago: "Efectivo" | "Tarjeta" | "Transferencia",
  cliente_id: number | null,
  empleado_id: number,
  subtotal: Decimal,
  descuento: Decimal,
  total: Decimal,
  
  // Relaciones incluidas
  clientes?: {
    nombres: string,
    apellido_p: string,
    apellido_m?: string
  },
  empleados?: {
    nombre: string,
    apellido_p: string,
    apellido_m?: string
  },
  detalleventas?: [{
    id: number,
    cantidad: number,
    total: Decimal,
    inventarios?: {
      talla: string,
      precio_venta: Decimal,
      productos?: {
        nombre: string
      }
    }
  }]
}
```

## Cómo usar

### Endpoint del Controlador

```bash
GET /ventas/reporte/pdf?fechaInicio=2025-01-01&fechaFin=2025-01-31
```

#### Parámetros Query:
- `fechaInicio` (string, requerido): Fecha inicial del rango (formato: YYYY-MM-DD)
- `fechaFin` (string, requerido): Fecha final del rango (formato: YYYY-MM-DD)

#### Respuesta:
- **Content-Type**: `application/pdf`
- **Body**: Buffer PDF para descargar

#### Ejemplo con cURL:
```bash
curl "http://localhost:3000/ventas/reporte/pdf?fechaInicio=2025-01-01&fechaFin=2025-01-31" \
  -o reporte-ventas.pdf
```

### Uso directo del servicio en TypeScript

```typescript
import { VentasReportService } from './reportes/ventas-report.service';

constructor(private reportService: VentasReportService) {}

async generarReporte() {
  const ventas = await this.ventasService.findAll();
  
  const pdfBuffer = await this.reportService.generarReporteVentas(
    ventas,
    '2025-01-01',
    '2025-01-31'
  );
  
  // Guardar o descargar el archivo
  fs.writeFileSync('reporte.pdf', pdfBuffer);
}
```

## Verificación de Datos

✅ **Datos de Ventas Verificados:**
- ID de venta
- Fecha formateada correctamente
- Información del cliente (con fallback a "Cliente General")
- Información del empleado
- Tipo de venta y pago
- Subtotal, descuento y total con formato decimal
- Detalles de productos con cantidad, precio y total

✅ **Formato de salida:**
- Tabla con colores alternados
- Headers destacados en azul
- Totales en tabla separada
- Fechas en formato localizado (es-MX)
- Números con 2 decimales y símbolo de moneda

## Mejoras Implementadas

1. **Mapeo correcto de datos**: Ahora extrae datos de todas las relaciones disponibles
2. **Detalles de productos**: Incluye información de cada producto vendido con cantidad y precio
3. **Información del cliente**: Muestra nombre completo del cliente si existe
4. **Información del empleado**: Muestra quién realizó la venta
5. **Formateo de fechas**: Convierte fechas a formato legible
6. **Totales agregados**: Calcula subtotal, descuentos y total general
7. **Validación de datos**: Maneja valores null/undefined correctamente
8. **Estilos profesionales**: Tabla con colores, alineación y bordes

## Dependencias Requeridas

```json
{
  "pdfmake": "^0.2.0"
}
```

## Notas Importantes

- El rango de fechas se evalúa de manera inclusiva (fechaInicio a 00:00:00 hasta fechaFin a 23:59:59)
- Los valores decimales se formatean automáticamente a 2 dígitos
- Si un cliente no está registrado, se muestra "Cliente General"
- El PDF se genera en memoria sin necesidad de archivos temporales
- El nombre del archivo descargado incluye el rango de fechas del reporte
