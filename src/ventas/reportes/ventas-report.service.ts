import PdfPrinter from "pdfmake"
import path from "path"
//import type { TDocumentDefinitions } from "pdfmake/interfaces"
import * as fs from "fs"

export class VentasReportService {

    async generarReporteVentas(ventas: any[], fechaInicio: string, fechaFin: string): Promise<Buffer> {

        // 1️⃣ Definir las rutas de las fuentes
        // Se usa Helvetica como fallback si las fuentes personalizadas no existen
        const fontsPath = path.join(process.cwd(), "src/common/fonts")
        
        const fonts = {
            Roboto: {
                normal: fs.existsSync(path.join(fontsPath, "Roboto-Regular.ttf"))
                    ? path.join(fontsPath, "Roboto-Regular.ttf")
                    : "Helvetica",
                bold: fs.existsSync(path.join(fontsPath, "Roboto-Medium.ttf"))
                    ? path.join(fontsPath, "Roboto-Medium.ttf")
                    : "Helvetica-Bold",
                italics: fs.existsSync(path.join(fontsPath, "Roboto-Italic.ttf"))
                    ? path.join(fontsPath, "Roboto-Italic.ttf")
                    : "Helvetica-Oblique",
                bolditalics: fs.existsSync(path.join(fontsPath, "Roboto-MediumItalic.ttf"))
                    ? path.join(fontsPath, "Roboto-MediumItalic.ttf")
                    : "Helvetica-BoldOblique",
            },
        }

        // 2️⃣ Crear la instancia de PdfPrinter
        const printer = new PdfPrinter(fonts)

        // Calcular totales
        const totalGeneral = ventas.reduce((sum, v) => sum + parseFloat(v.total || 0), 0)
        const totalSubtotal = ventas.reduce((sum, v) => sum + parseFloat(v.subtotal || 0), 0)
        const totalDescuento = ventas.reduce((sum, v) => sum + parseFloat(v.descuento || 0), 0)

        // 3️⃣ Definimos el contenido del PDF
        const docDefinition: any = {
            content: [
                { text: "Reporte de Ventas", style: "header" },
                { text: `Período: ${fechaInicio} - ${fechaFin}`, style: "subheader", margin: [0, 0, 0, 15] },
                this.crearTablaVentasDetallada(ventas),
                { text: "", margin: [0, 15, 0, 0] },
                this.crearTablaTotales(totalSubtotal, totalDescuento, totalGeneral),
                { text: `Total de ventas: ${ventas.length}`, margin: [0, 15, 0, 0], fontSize: 10 },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 0, 0, 5],
                    alignment: "center",
                },
                subheader: {
                    fontSize: 12,
                    alignment: "center",
                    color: "#666666",
                },
                tableHeader: {
                    bold: true,
                    fillColor: "#4472C4",
                    color: "white",
                    fontSize: 10,
                },
                tableRow: {
                    fontSize: 9,
                },
            },
        }

        // 3️⃣ Generamos el PDF en memoria
        const pdfDoc = printer.createPdfKitDocument(docDefinition)

        return this.getBufferFromPdf(pdfDoc)
    }

    private crearTablaVentasDetallada(ventas: any[]) {
        const body = [
            ["ID", "Fecha", "Cliente/Concepto", "Empleado", "Tipo", "Pago", "Subtotal", "Descuento", "Total"],
        ]

        ventas.forEach(venta => {
            const clienteNombre = venta.clientes 
                ? `${venta.clientes.nombres} ${venta.clientes.apellido_p}`.trim()
                : "Cliente General"
            
            const empleadoNombre = venta.empleados 
                ? `${venta.empleados.nombre} ${venta.empleados.apellido_p}`.trim()
                : "N/A"

            body.push([
                venta.id?.toString() || "-",
                this.formatearFecha(venta.fecha),
                clienteNombre,
                empleadoNombre,
                venta.tipo_venta || "-",
                venta.tipo_pago || "-",
                `$${this.formatearDecimal(venta.subtotal)}`,
                `$${this.formatearDecimal(venta.descuento)}`,
                `$${this.formatearDecimal(venta.total)}`,
            ])

            // Agregar detalles de productos si existen
            if (venta.detalleventas && venta.detalleventas.length > 0) {
                venta.detalleventas.forEach(detalle => {
                    const nombreProducto = detalle.inventarios?.productos?.nombre || "Producto N/A"
                    const talla = detalle.inventarios?.talla || "-"
                    const cantidad = detalle.cantidad || 0
                    const precioUnitario = detalle.inventarios?.precio_venta || 0
                    const totalItem = detalle.total || 0

                    body.push([
                        `  └─ ${nombreProducto}`,
                        `Talla: ${talla}`,
                        `Cant: ${cantidad} x $${this.formatearDecimal(precioUnitario)}`,
                        "",
                        "",
                        "",
                        "",
                        "",
                        `$${this.formatearDecimal(totalItem)}`,
                    ])
                })
            }
        })

        return {
            style: "tableRow",
            table: {
                headerRows: 1,
                widths: ["6%", "10%", "18%", "15%", "10%", "12%", "8%", "8%", "10%"],
                body: body,
            },
            layout: {
                fillColor: (rowIndex: number) => {
                    if (rowIndex === 0) return "#4472C4"
                    return rowIndex % 2 === 0 ? "#f0f0f0" : "white"
                },
                hLineColor: () => "#cccccc",
                vLineColor: () => "#cccccc",
            },
        }
    }

    private crearTablaTotales(subtotal: number, descuento: number, total: number) {
        return {
            table: {
                widths: ["70%", "15%", "15%"],
                body: [
                    [
                        { text: "Subtotal:", bold: true, alignment: "right" },
                        { text: `$${this.formatearDecimal(subtotal)}`, alignment: "right" },
                        "",
                    ],
                    [
                        { text: "Total Descuentos:", bold: true, alignment: "right" },
                        { text: `$${this.formatearDecimal(descuento)}`, alignment: "right" },
                        "",
                    ],
                    [
                        { text: "TOTAL GENERAL:", bold: true, fontSize: 12, alignment: "right" },
                        { text: `$${this.formatearDecimal(total)}`, bold: true, fontSize: 12, alignment: "right" },
                        "",
                    ],
                ],
            },
            layout: "noBorders",
        }
    }

    private formatearFecha(fecha: Date | string): string {
        if (!fecha) return "-"
        const date = typeof fecha === "string" ? new Date(fecha) : fecha
        return date.toLocaleDateString("es-MX", { 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit" 
        })
    }

    private formatearDecimal(valor: number | string): string {
        const num = typeof valor === "string" ? parseFloat(valor) : valor
        return isNaN(num) ? "0.00" : num.toFixed(2)
    }

    private getBufferFromPdf(pdfDoc: any): Promise<Buffer> {
        return new Promise((resolve) => {
            const chunks: Buffer[] = []
            pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk))
            pdfDoc.on("end", () => resolve(Buffer.concat(chunks)))
            pdfDoc.end()
        })
    }
}
