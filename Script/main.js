const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById("resultado")

formularioCalculadora.addEventListener("submit", (evento)=>
{
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
    const edad = document.getElementById('edad')
    const peso = document.getElementById('peso')
    const altura = document.getElementById('altura')
    const actividad = document.getElementById('actividad')
    const genero = document.querySelector('input[name="genero"]:checked')

    if(!(edad.value && peso.value && altura.value))
    {
        mostrarMensajeDeError("por favor complete todos los campos")
        return
    }

    let caloriaCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) + (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edad.value))
    
    genero.value == "F" ? caloriaCalorias - 161 : caloriaCalorias + 5 
    caloriaCalorias = Math.floor(caloriaCalorias)
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161

    
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${caloriaCalorias}kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `
     // Volver a limpiar variables
    desvanecerResultado()
}


function mostrarMensajeDeError(msg) {
    console.log("dasds")
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
    let distancia = 8;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 2500)
}
