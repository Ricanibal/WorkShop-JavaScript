var apiCategoriasUrl = "https://www.themealdb.com/api/json/v1/1/categories.php" 
var apiListaUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" 
var apiItemUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

let selection = document.getElementById("CategoriaComidas")

GetCategorias().then(dataarray =>
    {
    let array = []
        for(let i of dataarray.categories)
            array.push(i.strCategory)
        inicializarselection(array)
        console.log("Categorias: ", array)
    }).catch(e =>{

        console.error("Fallo la traida de las categorias: ", e)
    })

selection.addEventListener('change',(data) =>
{
    GetListaComidas(selection.value,0)
})
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
function GetListaComidas(categoria,tamanoinicial)
{
    let url = apiListaUrl + categoria
    fetch(url).then((response)=>
    {
        if(!response.ok)
        {
            throw new Error('Error en la solicitud. no llego la lista de categoria:' + response.status);
        }
        return response.json();
    }).then((data)=>
    {
        let comidas = []
        let pack =[]
        if(data)
        {
            for (const comida of data.meals)
            {
                comidas.push(comida.strMeal) 
            }
            console.log("lista de comida ",comidas)
            GetComidaPlato(comidas,tamanoinicial)
        }
        else
        {
            console.log('No se encontro la lista de comida.');
        }

    }).catch(function(error) {
        console.error('Error en la solicitud:', error);
      });
}

//Esta funcion sirve para generar las card de comida
async function GetComidaPlato(array,tamano)
{
    let market = document.getElementById("MarketPlate")
    market.innerHTML = ``
    for(let i = 0; i< 9; i++)
    {
        if(array.length > (i+tamano))
        {
           await fetch(apiItemUrl + array[i+tamano]).then(
                async (response) =>{
                  let arrayaux = await response.json()
                  let plato = arrayaux.meals
                  market.innerHTML += `<div class="card col-3" >
                  <img src="${plato[0].strMealThumb}" class="card-img-top" alt="Plato de comida">
                  <div class="card-body cartascroll">
                    <h5 class="card-title">${plato[0].strMeal}</h5>
                    <p class="card-text">${plato[0].strInstructions}</p>  
                  </div>
                  <a href="${plato[0].strYoutube}" class="btn btn-primary">Tutorial</a>
                </div>`
                  console.log(plato[0])
                }
               ) 
        }
       
    }
}