var apiCategoriasUrl = "https://www.themealdb.com/api/json/v1/1/categories.php" 
var apiListaUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" 
var apiItemUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

let selection = document.getElementById("CategoriaComidas")

//se llama la funcion para que cuando apenas abra la aplicacion carge las categorias
GetCategorias().then(dataarray =>
    {
    let array = []
        for(let i of dataarray.categories)
            array.push(i.strCategory)
        inicializarselection(array)
        GetListaComidas(selection.value,0)
    }).catch(e =>{

        console.error("Fallo la traida de las categorias: ", e)
    })
// Se buscar escuchar el cambio en el selection 
selection.addEventListener('change',() => GetListaComidas(selection.value,caloriaCalorias) )

//Se inicializa la selection para agregar todas  las categorias de filtro
function inicializarselection(array)
{
    
    let option =""
    for(let categoria of array)
    {
    option += `<option value="${categoria}">${categoria}</option>`
    }
    selection.innerHTML = option
}


// Esta funcion tiene como objectivo craer todos las categorias 
async function GetCategorias()
{
    return fetch(apiCategoriasUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw error; 
    });
}

// Esta funcion tiene como objectivo poder traer los nombres de los alimentos usando la categoria como filtro 
function GetListaComidas(categoria,Calorias)
{
    let url = apiListaUrl + categoria
    fetch(url).then((response)=>
    {
        if(response.ok)
        {
            return response.json();
        }
        throw new Error('Error en la solicitud. no llego la lista de categoria:' + response.status);
        
    }).then((data)=>
    {
        let comidas = []
        if(data)
        {
            for (const comida of data.meals)
            {
                comidas.push(comida.strMeal) 
                
            }
            GetComidaPlato(comidas,Calorias)
        }
        else
        {
            console.error('No se encontro la lista de comida.');
        }

    }).catch(function(error) {
        console.error('Error en la solicitud:', error);
      });
}

//Esta funcion sirve para generar las card de comida
async function GetComidaPlato(array,Calorias)
{
    let market = document.getElementById("MarketPlate")
    market.innerHTML = ``
    for(let i = 0; i< 9; i++)
    {
           await fetch(apiItemUrl + array[i]).then(
                async (response) =>{
                  let arrayaux = await response.json()
                  let plato = arrayaux.meals
                  let header = CalculoDeCalorias(Calorias)
                  market.innerHTML += `
                  <div class="card" style="width: 20rem;">
                  <div class="card-header ${header[1]}"> ${header[0]} <br> Calorias: ${header[2]}</div>
                  <img src="${plato[0].strMealThumb}" class="card-img-top" alt="Plato de comida">
                  <div class="card-body cartascroll">
                    <h5 class="card-title">${plato[0].strMeal}</h5>
                    <p class="card-text">${plato[0].strInstructions}</p>  
                  </div>
                  <a href="${plato[0].strYoutube}" class="btn btn-primary">Tutorial</a>
                </div>`
                }
               ) 
    }
}

function CalculoDeCalorias(calorias)
{
    let backgroudColor ="";
    let mensaje ="Usa la calculadora para ver como afecta este plato";
    let PlatoCalorias = CaloriasAleatorias()
    if(calorias>0)
    {
        if((calorias/2)<PlatoCalorias)
        {
            backgroudColor = "bg-danger text-black";
            mensaje = "Este plato alto en calorias, lo que puede causar subidas de peso"
        }
        else if((calorias/3)<PlatoCalorias)
        {
            backgroudColor = "bg-success text-black"
            mensaje = "Este plato es ideal para tu estilo de vida"
        }
        else 
        {
            backgroudColor = "bg-warning text-secondary"
            mensaje = "Este plato es de baja calorias, ideal para personas en dieta"
        }
    }   
    return [mensaje,backgroudColor,PlatoCalorias]
}
  

function CaloriasAleatorias()
{
   return Math.floor((Math.random() * 1500)+200)
}