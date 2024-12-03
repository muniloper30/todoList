const fecha = document.getElementById('fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'bi-check-circle-fill'
const uncheck = 'bi-circle'
const lineThrough = 'line-through'
let id
let LIST



// Función para la actualización de la fecha 

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-ES',{weekday:'long', month:'long', day : 'numeric'} )


// Función agregar tarea

function agregarTarea(tarea,id,realizado,eliminado) {

    if(eliminado){return}    

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ''


    const elemento = ` <li>
                        <i class="bi ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="bi bi-trash-fill" data="eliminado" id="${id}"></i>
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)                
}

//Función tarea realizada 

function tareaRealizada (element) {
  element.classList.toggle(check)
  element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(lineThrough)
  LIST[element.id].realizado = LIST [element.id].realizado ? false : true 
}

//Función tarea eliminada

function tareaEliminada (element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST [element.id].eliminado = true
}


// Evento click para realizar la función de agregar tarea
botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea,id,false,false)
        LIST.push({
          nombre: tarea,
          id: id,
          realizado: false,
          eliminado : false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value=''
    id++
})


// Evento click pero con botón ENTER para realizar la función de agregar tarea
document.addEventListener('keyup',function(event){
    if(event.key == 'Enter') {
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            LIST.push({
              nombre: tarea,
              id: id,
              realizado: false,
              eliminado : false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = ''
        id++
    }
})

lista.addEventListener('click', function(event){
  const element = event.target
  const elementData = element.attributes.data.value  
  if(elementData === 'realizado'){
    tareaRealizada(element)
  } else if (elementData === 'eliminado'){
    tareaEliminada(element)
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
})

//Local storage get item

let data = localStorage.getItem('TODO')
if (data) {
  LIST = JSON.parse(data)
  id = LIST.length
  cargarLista(LIST)
} else {
  LIST = []
  id = 0
}


function cargarLista (DATA) {
  DATA.forEach(function(i){
    agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
  })
}


