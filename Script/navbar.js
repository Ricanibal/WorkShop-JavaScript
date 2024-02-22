function abrirMenu(){
    let menu = document.getElementById("ulNavbar")
    let body = document.getElementById("body")
    let main = document.getElementById("mainSection")
    let footer = document.getElementById("footerSection")

    menu.classList.toggle('mostrarMenu'); //Añade o quita la clase mostrar menu, que restaura la posicion, haciendo que aparezca.
    body.classList.toggle('noScroll'); //Desablita el scroll vertical cuando el menu aparece
    main.classList.toggle('blur');//añade una clase con estilos para darle Blur al contenido de fondo.
    footer.classList.toggle('blur');
}