const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById("resultado")
let calculoCalorias

formularioCalculadora.addEventListener("submit", evento =>{
    evento.preventDefault(); // quitar el actualizado automatico de la pagina al precionar el boton 
    calcularCalorias()
})

function calcularCalorias() {
    aparecerResultado()
    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const tipoIdentidad = document.getElementById('tipoIdentidad')
    const numIdentidad = document.getElementById('numIdentidad')
    const edad = document.getElementById('edad')
    const peso = document.getElementById('peso')
    const altura = document.getElementById('altura')
    const actividad = document.getElementById('actividad')
    const genero = document.querySelector('input[name="genero"]:checked')

    //Retorno temprano
    if(!(nombre.value && apellido.value && tipoIdentidad.value && numIdentidad.value
         && edad.value && peso.value && altura.value && actividad.value && genero.value)) {
        mostrarMensajeDeError("por favor complete todos los campos")
        return
    }

    //Se calcula las calorías: la formula varia según el genero
    calculoCalorias = generoPersona(edad, peso, altura, actividad, genero, multiplicadorTMB)

    resultadoHTML(nombre, apellido, tipoIdentidad, numIdentidad, calculoCalorias)
        
    console.log(calculoCalorias)

    GetListaComidas("beef",calculoCalorias)
}

function grupoPoblacional(edad) {
    let num= edad.value
    if(num >= 15 && num <= 29){
        return "Pertenece al grupo poblacional: Jovén"
    } else if (num >= 30 && num <= 59) {
        return "Pertenece al grupo poblacional: Adulto"
    } else {
        return "Pertenece al grupo poblacional: Adulto Mayor"
    }
}

function generoPersona(edad, peso, altura, actividad, genero, multiplicadorTMB){
    if(genero.id == 'femenino'){

        //Formula mujeres: valor actividad x ((10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161)
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                        (multiplicadorTMB.altura * altura.value) -
                        (multiplicadorTMB.edad * edad.value) - 161)
    } else if (genero.id == 'masculino'){
        //Formula hombres: valor actividad x ((10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5)
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                        (multiplicadorTMB.altura * altura.value) -
                        (multiplicadorTMB.edad * edad.value) - 5)
    }
    return calculoCalorias = Math.round(calculoCalorias)

}

function resultadoHTML(nombre, apellido, tipoIdentidad, numIdentidad, calculoCalorias) {
    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100 text-right" id="textoResultado">
                <p id="textoResultado">El paciente ${nombre.value} ${apellido.value} identificado con ${tipoIdentidad.value} No. ${numIdentidad.value}, 
                require un total de ${calculoCalorias} kcal para el sostenimiento de su TBM</p>
                <p id="textoResultado">${grupoPoblacional(edad)}</p>
            </div>
        </div>
    `;
}

function mostrarMensajeDeError(msg) {
    //console.log("dasds")
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
