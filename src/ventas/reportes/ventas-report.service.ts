import PdfPrinter from "pdfmake"
import path from "path"
import * as fs from "fs"

export class VentasReportService {

    async generarReporteVentas(ventas: any[], fechaInicio: string, fechaFin: string): Promise<Buffer> {

        // 1️⃣ Definir las rutas de las fuentes
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
        const totalDescuentos = ventas.reduce((sum, v) => sum + parseFloat(v.descuento || 0), 0)

        // Formatear fechas en DD/MM/YYYY
        const fechaInioFormato = this.formatearFecha(fechaInicio)
        const fechaFinFormato = this.formatearFecha(fechaFin)

        // 3️⃣ Definimos el contenido del PDF
        const docDefinition: any = {
            content: [
                { text: "Reporte de Ventas", style: "header" },
                { text: `Período: ${fechaInioFormato} - ${fechaFinFormato}`, style: "subheader", margin: [0, 0, 0, 20] },
                this.crearTablaProductos(ventas),
                { text: "", margin: [0, 20, 0, 0] },
                this.crearTablaTotales(totalGeneral, totalDescuentos),
                { text: `Total de transacciones: ${ventas.length}`, margin: [0, 15, 0, 0], fontSize: 9, color: "#666666" },
            ],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 5],
                    alignment: "center",
                    color: "black",
                },
                subheader: {
                    fontSize: 10,
                    alignment: "center",
                    color: "#4b5563",
                },
            },
        }

        // 4️⃣ Generamos el PDF en memoria
        const pdfDoc = printer.createPdfKitDocument(docDefinition)

        return this.getBufferFromPdf(pdfDoc)
    }

    private crearTablaProductos(ventas: any[]) {
        const body: any[] = [
            [
                { text: "Producto", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
                { text: "Talla", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
                { text: "Cant.", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
                { text: "Fecha", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
                { text: "Precio", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
                { text: "Desc. de venta", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
                { text: "Total", bold: true, fillColor: "#3b82f6", color: "white", fontSize: 9 },
            ],
        ]

        ventas.forEach((venta, ventaIndex) => {
            const fechaFormato = this.formatearFecha(venta.fecha)

            // Agregar detalles de productos
            if (venta.detalleventas && venta.detalleventas.length > 0) {
                venta.detalleventas.forEach((detalle: any, detalleIndex: number) => {
                    const nombreProducto = detalle.inventarios?.productos?.nombre || "Producto N/A"
                    const talla = detalle.inventarios?.talla || "-"
                    const cantidad = detalle.cantidad || 0
                    const precioUnitario = detalle.inventarios?.precio_venta || 0
                    const totalItem = detalle.total || 0
                    // El descuento se muestra solo en la primera fila de cada venta
                    const descuentoMuestra = detalleIndex === 0 ? venta.descuento : 0

                    const isEvenRow = (ventaIndex + detalleIndex) % 2 === 0

                    body.push([
                        { text: nombreProducto, fillColor: isEvenRow ? "#f3f4f6" : "white", fontSize: 8 },
                        { text: talla, fillColor: isEvenRow ? "#f3f4f6" : "white", alignment: "center", fontSize: 8 },
                        { text: cantidad.toString(), fillColor: isEvenRow ? "#f3f4f6" : "white", alignment: "center", fontSize: 8 },
                        { text: fechaFormato, fillColor: isEvenRow ? "#f3f4f6" : "white", fontSize: 8 },
                        { text: `$${this.formatearDecimal(precioUnitario)}`, fillColor: isEvenRow ? "#f3f4f6" : "white", alignment: "right", fontSize: 8 },
                        { text: `$${this.formatearDecimal(descuentoMuestra)}`, fillColor: isEvenRow ? "#f3f4f6" : "white", alignment: "right", fontSize: 8 },
                        { text: `$${this.formatearDecimal(totalItem)}`, fillColor: isEvenRow ? "#f3f4f6" : "white", alignment: "right", bold: true, fontSize: 8 },
                    ])
                })
            } else {
                // Si no hay detalles, mostrar la venta sin productos
                body.push([
                    { text: "Sin productos", italics: true, color: "#999", fontSize: 8 },
                    { text: "-", alignment: "center", fontSize: 8 },
                    { text: "0", alignment: "center", fontSize: 8 },
                    { text: fechaFormato, fontSize: 8 },
                    { text: "$0.00", alignment: "right", fontSize: 8 },
                    { text: `$${this.formatearDecimal(venta.descuento)}`, alignment: "right", fontSize: 8 },
                    { text: `$${this.formatearDecimal(venta.total)}`, alignment: "right", bold: true, fontSize: 8 },
                ])
            }
        })

        return {
            table: {
                headerRows: 1,
                widths: ["28%", "9%", "8%", "12%", "12%", "11%", "12%"],
                body: body,
            },
            layout: {
                hLineColor: () => "#e5e7eb",
                vLineColor: () => "#e5e7eb",
                hLineWidth: () => 0.5,
                vLineWidth: () => 0.5,
            },
        }
    }

    private crearTablaTotales(total: number, totalDescuentos: number) {
        const subtotal = total + totalDescuentos
        
        return {
            table: {
                widths: ["70%", "30%"],
                body: [
                    [
                        { text: "Subtotal:", alignment: "right", fontSize: 9, color: "#666" },
                        { text: `$${this.formatearDecimal(subtotal)}`, alignment: "right", fontSize: 9 },
                    ],
                    [
                        { text: "Descuentos:", alignment: "right", fontSize: 9, bold: true },
                        { text: `$${this.formatearDecimal(totalDescuentos)}`, alignment: "right", fontSize: 9 },
                    ],
                    [
                        { text: "TOTAL GENERAL:", alignment: "right", fontSize: 11, bold: true, fillColor: "#3b82f6", color: "white" },
                        { text: `$${this.formatearDecimal(total)}`, alignment: "right", fontSize: 11, bold: true, fillColor: "#3b82f6", color: "white" },
                    ],
                ],
            },
            layout: "noBorders",
        }
    }

    private formatearFecha(fecha: Date | string): string {
        if (!fecha) return "-"
        const date = typeof fecha === "string" ? new Date(fecha) : fecha
        const dia = String(date.getDate()).padStart(2, "0")
        const mes = String(date.getMonth() + 1).padStart(2, "0")
        const año = date.getFullYear()
        return `${dia}/${mes}/${año}`
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
