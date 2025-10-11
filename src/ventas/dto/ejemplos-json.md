# Ejemplos de JSON para Ventas y Detalle de Ventas

## 📋 Crear Venta (POST /ventas)

```json
{
  "fecha": "2024-01-15T10:30:00.000Z",
  "tipo_venta": "Presencial",
  "tipo_pago": "Efectivo",
  "cliente_id": 1,
  "empleado_id": 2,
  "subtotal": 150.00,
  "descuento": 10.00,
  "total": 140.00
}
```

### Campos opcionales:
- `fecha`: Si no se envía, se usa la fecha actual
- `cliente_id`: Para ventas sin cliente registrado (venta anónima)
- `subtotal`: Si no se envía, se asume 0
- `descuento`: Si no se envía, se asume 0

### Validaciones aplicadas:
- `tipo_venta`: Debe ser "Presencial" u "Online"
- `tipo_pago`: Debe ser "Efectivo", "Tarjeta" o "Transferencia"
- `empleado_id`: Número entero positivo (requerido)
- `total`: Decimal con máximo 2 decimales, mayor a 0 (requerido)

---

## 📋 Crear Detalle de Venta (POST /detalle-ventas)

```json
{
  "venta_id": 1,
  "inventario_id": 5,
  "cantidad": 2,
  "total": 280.00
}
```

### Todos los campos son requeridos:
- `venta_id`: ID de la venta existente
- `inventario_id`: ID del producto en inventario
- `cantidad`: Número entero entre 1 y 9999
- `total`: Decimal con máximo 2 decimales, mayor a 0

### Validaciones aplicadas:
- Verifica que la venta existe
- Verifica que el inventario existe
- Verifica que hay suficiente stock disponible
- La cantidad debe ser un número entero positivo

---

## 🚫 Ejemplos de JSON inválidos:

### Venta inválida:
```json
{
  "tipo_venta": "Invalido",
  "tipo_pago": "Efectivo",
  "empleado_id": "abc",
  "total": -10
}
```

### Detalle de venta inválido:
```json
{
  "venta_id": "no_es_numero",
  "inventario_id": 1,
  "cantidad": 0,
  "total": "texto"
}
```
