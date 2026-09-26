document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);

function procesarSimulacion() {
    const nombreInput = document.getElementById('nombre').value.trim();
    const montoInput = parseFloat(document.getElementById('monto').value);
    const tasaAnualInput = parseFloat(document.getElementById('tasa').value) / 100;
    const plazoMeses = parseInt(document.getElementById('plazo').value);
    const IVA_VALOR = 0.16;

    if (!nombreInput) {
        alert("Por favor, ingrese el nombre del solicitante.");
        return;
    }

    if (isNaN(montoInput) || isNaN(tasaAnualInput) || montoInput <= 0) {
        alert("Ingrese parámetros numéricos válidos e intente nuevamente.");
        return;
    }

    document.getElementById('titulo-amortizacion').textContent = `Tabla de Amortización - Solicitante: ${nombreInput}`;

    const amortizacionCapital = montoInput / plazoMeses;
    const tasaMensualEquivalente = tasaAnualInput / 12;
    let saldoInsoluto = montoInput;

    const tablaBody = document.querySelector('#tabla-amortizacion tbody');
    tablaBody.innerHTML = '';

    for (let periodo = 1; periodo <= plazoMeses; periodo++) {
        const interesDelPeriodo = saldoInsoluto * tasaMensualEquivalente;
        const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
        const pagoMensualTotal = amortizacionCapital + interesDelPeriodo + ivaSobreInteres;
        
        saldoInsoluto -= amortizacionCapital;
        if (saldoInsoluto < 0) saldoInsoluto = 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${periodo}</td>
            <td>$${amortizacionCapital.toFixed(2)}</td>
            <td>$${interesDelPeriodo.toFixed(2)}</td>
            <td>$${ivaSobreInteres.toFixed(2)}</td>
            <td>$${pagoMensualTotal.toFixed(2)}</td>
            <td>$${saldoInsoluto.toFixed(2)}</td>
        `;
        tablaBody.appendChild(tr);
    }
}