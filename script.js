
const formulario = document.querySelector('#form-contacto');
const btnLimpiar = document.querySelector('#btn-limpiar');

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");

//guarda los modelos en listas
const modelosPorMarca = {
    samsung: [
        "Galaxy A03 Core",
        "Galaxy A05s",
        "Galaxy A12",
        "Galaxy A23",
        "Galaxy S21"
    ],

    motorola: [
        "Moto G09 Power",
        "Moto G20",
        "Moto G32",
        "Moto E13",
        "Moto G54"
    ]
};

marca.addEventListener("change", () => {
    modelo.innerHTML = '<option value="">Modelos</option>';

    const seleccion = marca.value;

    if (seleccion === "") return;

    modelosPorMarca[seleccion].forEach(m => {
        const option = document.createElement("option");
        option.textContent = m;
        option.value = m;
        modelo.appendChild(option);
    });
});

// Array donde se guardan los servicios agregados
let servicios = [];

// Precios según modelo y servicio
const precios = {
    "Galaxy A03 Core": {
        Modulo: 22000,
        Pin: 7000,
        Bateria: 9000,
        Software: 6000
    },
    "Galaxy A05s": {
        Modulo: 26000,
        Pin: 8000,
        Bateria: 11000,
        Software: 7000
    },
    "Galaxy A12": {
        Modulo: 25000,
        Pin: 8000,
        Bateria: 10000,
        Software: 7000
    },
    "Galaxy A23": {
        Modulo: 30000,
        Pin: 9000,
        Bateria: 13000,
        Software: 8000
    },
    "Galaxy S21": {
        Modulo: 65000,
        Pin: 12000,
        Bateria: 18000,
        Software: 10000
    },
    "Moto G09 Power": {
        Modulo: 24000,
        Pin: 7500,
        Bateria: 10500,
        Software: 6500
    },
    "Moto G20": {
        Modulo: 28000,
        Pin: 9000,
        Bateria: 12000,
        Software: 7500
    },
    "Moto G32": {
        Modulo: 32000,
        Pin: 10000,
        Bateria: 14000,
        Software: 8500
    },
    "Moto E13": {
        Modulo: 20000,
        Pin: 6500,
        Bateria: 9000,
        Software: 6000
    },
    "Moto G54": {
        Modulo: 36000,
        Pin: 11000,
        Bateria: 16000,
        Software: 9000
    }
};

// Elementos del DOM
const btnAgregar = document.querySelector("#agregar");
console.log(btnAgregar);
const lista = document.querySelector("#lista-servicios");
const totalSpan = document.querySelector("#total");

// Evento del botón
btnAgregar.addEventListener("click", function () {

    const modeloSel = modelo.value;
    const servicio = document.querySelector("#servicio").value;

    // Validación básica
    if (modeloSel === "" || servicio === "") {
        alert("Por favor completá  modelo y servicio");
        return;
    }

    // Obtener precio según modelo y servicio
    const precio = precios[modeloSel][servicio];

    // Crea el objeto del servicio
    const servicioAgregado = {
        modelo: modeloSel,
        servicio: servicio,
        precio: precio
    };

    // Guardar en el array
    servicios.push(servicioAgregado);

    // Actualizar pantalla
    mostrarServicios();
    calcularTotal();
});


// Muestra la lista de servicios
function mostrarServicios() {
    lista.innerHTML = ""; // Limpia la lista antes de volver a dibujar

    servicios.forEach((item, index) => {
        const li = document.createElement("li");
        
        li.innerHTML = `
            ${item.modelo} - ${item.servicio} → $${item.precio}
            <button class="btn-borrar" data-index="${index}">X</button>
        `;

        lista.appendChild(li);
    });

    document.querySelectorAll(".btn-borrar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            servicios.splice(index, 1);
            mostrarServicios();
            calcularTotal();
        });
    });
}


// Calcula y muestra el total
function calcularTotal() {
    let total = 0;

    servicios.forEach(function (item) {
        total += item.precio;
    });

    totalSpan.textContent = total;
}

formulario.addEventListener("submit", function(e) {

    e.preventDefault()//evita q se envie solo

    const email = document.querySelector('#email').value.trim();//obtenemos el valor. trim elimina los espacios innecesarios 

    if(email === "" ) {
        alert("Por favor completá todos los campos");
    return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        alert("Ingresá un correo electrónico válido");
        return;
    }

    alert("Mensaje enviado correctamente");

    //si todo esta bien se limpia el formulario
    formulario.reset();
});
