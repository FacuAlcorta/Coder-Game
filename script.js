// -------------------------------  Local Storage  ------------------------------------------>
obtenerArrayPersonajes();
obtenerArrayEnemigos();

let personajes= [];
let enemigos= [];


let enemigosAlmacenados= [];

    if (localStorage.getItem("listaEnemigos") != null) {
        enemigosAlmacenados= JSON.parse(localStorage.getItem("listaEnemigos"));
        Swal.fire({
            title: '¡Tienes una aventura que continuar!',
            text: "Quedan enemigos por derrotar",
            imageUrl: "https://c.tenor.com/Zj0Mp2ZWYQEAAAAC/theoden-bernard-hill.gif",
            showCancelButton: true,
            confirmButtonColor: '#1bb919 ',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuaré mi aventura!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '¡Continuarás desde donde habías quedado aventurero!',
                'Suerte en tu camino.',
                'success'
              )
                for (const enemigo of enemigosAlmacenados){
                let resultado= document.querySelector("#derrotados");
                resultado.innerHTML+=`
                <tr>
                    <td>${enemigo.raza}</td>
                    <td>${enemigo.tipo}</td>
                    <td>${enemigo.poder}</td>
                </tr>`;}
                
            } else if (result.dismiss) {
                swal.fire({
                    imageUrl: "https://c.tenor.com/5Yybxd6_4pgAAAAC/fresh-start-start-a-new.gif",
                    imageHeight: 150,
                    title: '¿Nuevo comienzo ah?',
                    text: '¡Espero que esta vez te vaya mejor!',
            })  
            localStorage.clear();     
    }})
};


let enemigosDerrotados= [];
            
//  ---------------------------------              ------------------------------------------->
let encabezado= document.querySelector("header");

let encabezadoTitulo= document.createElement("h1");
encabezadoTitulo.innerHTML= "<h1>¡Bienvenido a tu propia aventura!</h1>";
encabezado.appendChild(encabezadoTitulo);

//  ----------------------------------------- tabla PERSONAJES ----------------------------------------------------------

let tablaPersonajes= document.querySelector(".personajes");

let titTabPersonajes= document.createElement("h2");
titTabPersonajes.innerHTML= "<h2>Tabla de Personajes</h2>";
tablaPersonajes.appendChild(titTabPersonajes);

let cajaPersonajes= document.createElement("div");
cajaPersonajes.className="box";
tablaPersonajes.appendChild(cajaPersonajes)

let tabla1= document.createElement("table");
tabla1.className= "table table-striped table-dark col-12 pjClass"
let cuerpoTabla1= document.createElement("tbody");

function obtenerArrayPersonajes(){
    const URLGET= "/personajes.json";
    fetch(URLGET)
        .then(res=> res.json())
        .then(data=>{
            personajes= data
            personajes.forEach ((personajes) =>{
                let listado= document.createElement("td");
                listado.innerHTML= `
                    <td><img src="${personajes.foto}" type="button" id= "${personajes.id}" class="${personajes.foto}" height="350px"></td>
                    <h4>TIPO: ${personajes.tipo}</h4>
                    <h5>PODER: ${personajes.poder}</h5>
                    <h5>VIDA: ${personajes.vida}</h5>`;
                cuerpoTabla1.appendChild(listado);
            })
            return personajes;
        })
}

tabla1.appendChild(cuerpoTabla1);

cajaPersonajes.appendChild(tabla1);



//  ----------------------------------------- tabla ENEMIGOS ----------------------------------------------------------

let tablaEnemigos= document.querySelector(".enemigos");

let titTabEnemigos= document.createElement("h2");
titTabEnemigos.innerHTML= "<h2>Tabla de Enemigos</h2>";
tablaEnemigos.appendChild(titTabEnemigos);

let cajaEnemigos= document.createElement("div");
cajaEnemigos.className="box";
tablaEnemigos.appendChild(cajaEnemigos)


let tabla2= document.createElement("table");
tabla2.className= "table table-striped table-dark col-12 eneClass"
let cuerpoTabla2= document.createElement("tbody");

function obtenerArrayEnemigos(){
    const URLGET= "/enemigos.json";
    fetch(URLGET)
        .then(res=> res.json())
        .then(data=>{
            enemigos= data
            enemigos.forEach ((enemigos) =>{
                let listado2= document.createElement("td");
                listado2.innerHTML= `
                <td class="eneClass"><img src="${enemigos.foto}" type="button" id= "${enemigos.id}"  class="${enemigos.foto}" height="350px"></td>
                    <h4>TIPO: ${enemigos.tipo}</h4>
                    <h5>PODER: ${enemigos.poder}</h5>
                    <h5>VIDA: ${enemigos.vida}</h5>`;
                cuerpoTabla2.appendChild(listado2);
            })
            return enemigos;
        })
    }

tabla2.appendChild(cuerpoTabla2);

cajaEnemigos.appendChild(tabla2);



//   ---------------------------     EVENTOS    -------------------------------------



let heroSelected= document.querySelector(".pjClass").addEventListener("click", clickPj);

function clickPj(e){
    hero= e.target.id;
    console.log(hero);
    Swal.fire({
        html: `<img src="${e.target.className}" width="200px" height="350px">` 
        ,
        title: '¡Buena elección de Heroe!\nAhora debes elegir a tu oponente.',
        text: 'Modal with a custom image.',
        imageWidth: 200,
        imageHeight: 100
    })
        return hero;
    }

let enemySelected= document.querySelector(".eneClass").addEventListener("click", clickEne);

function clickEne(e){
    enemy= e.target.id;
    console.log(enemy);
    Swal.fire({
        html: `<img src="${e.target.className}" width="200px" height="350px">` 
        ,
        title: 'Intrépida elección.\n¡Ahora toca el botón para batallar!',
        text: 'Modal with a custom image.',
        imageWidth: 400,
        imageHeight: 200
    })
    return enemy; 
}


function personajeElegido(dato){
    character1= personajes.find((personaje) => personaje.id == dato);
    console.log(character1);
    return character1;
}

function enemigoElegido(dato){
    character2= enemigos.find((enemigo) => enemigo.id == dato);
    console.log(character2);
    return character2;
}


function atacar(personaje, enemigo) {
    resultado= (enemigo.poder + randomNum2) - (personaje.poder + randomNum1);
    return resultado;
}



//    -------------------------    RESOLUCION   ---------------------->



 let batallar= document.querySelector("#batalla");
 batallar.onmouseover= (e) =>{
     e.target.style.background= "green";
     e.target.style.color= "white";
 }
 batallar.onmouseout= (e)=>{
     e.target.style.background= "red";
     e.target.style.color= "black";
 }
 
 batallar.addEventListener("click", aBatallar);



function aBatallar() {

    hero;
    enemy;

    personajeElegido(hero);
    enemigoElegido(enemy);

    randomNum1= Math.round(Math.random() *10);
    console.log(randomNum1);
    randomNum2= Math.round(Math.random() *10);
    console.log(randomNum2);
    
    atacar(character1, character2);

    
    if (resultado <= 0) {
        Swal.fire({
            title: '¡Felicitaciones aventurero!',
            text: 'Has derrotado al enemigo.',
            imageUrl: './img/Victoria.png',
            imageWidth: 250,
            imageHeight: 250,
            imageAlt: 'Imagen victoria',
          });
        agregarEnemigo(character2);
        localStorage.setItem("listaEnemigos", JSON.stringify(enemigosDerrotados));
    }else{
        Swal.fire({
            title: '¡Animos aventurero!',
            text: 'Debes reponerte y volver a comenzar.',
            imageUrl: './img/Derrota.png',
            imageWidth: 250,
            imageHeight: 250,
            imageAlt: 'Imagen derrota',
          });
        document.querySelector("#derrotados").innerHTML="";
        localStorage.clear();
    }

}


function agregarEnemigo(enemigoAgregado){
    enemigosDerrotados.push(enemigoAgregado);
    console.log(enemigosDerrotados);
    document.querySelector("#derrotados").innerHTML+=`
    <tr>
        <td>${enemigoAgregado.raza}</td>
        <td>${enemigoAgregado.tipo}</td>
        <td>${enemigoAgregado.poder}</td>
    </tr>`;
    
};
