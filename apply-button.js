// Capta el evento en un contenedor padre
const jobsListingSection = document.querySelector('.jobs-listings');

jobsListingSection.addEventListener('click', (event)=> {
    const element = event.target;
    if(element.classList.contains('button-apply-job')){
        console.log('es el boton');
        element.textContent = '¡Aplicado!';
        element.classList.add('is-applied');
        element.disabled = true;
    }
})

//otros eventos interesantes
// // Selecciona todos los botones con la clase 'button-apply-job'
// const botones = document.querySelectorAll('.button.button-apply-job');

// console.log(botones);

// botones.addEventListener('click', () => {
//     botones.textContent = '¡Aplicado!';
//     botones.classList.add('is-applied');
//     botones.disabled = true;
// });

//EJEMPLOS DE EVENTOS
// Capturando el evento 'input' en el campo de búsqueda
//const searchInput = document.querySelector('#empleos-search-input');
// searchInput.addEventListener('input', (event) => {
//     console.log(searchInput.value);
// });
// Capturando el evento 'focus' en el campo de búsqueda
// searchInput.addEventListener('blur',(event)=>{
//     console.log('Se dispara cuando pierde el foco');
// })
// // Capturando el evento 'submit' en el formulario de búsqueda
// const searchForm = document.querySelector('#empleos-search-form');
// searchForm.addEventListener('submit', (event)=>{
//     event.preventDefault(); // Previene el comportamiento por defecto
//     console.log('El formulario se ha enviado');
// });

// document.addEventListener('keydown', (event)=>{
//     console.log(`Tecla presionada: ${event.key}`)
//     console.log("¿Está pulsada la tecla Shift? ", event.shiftKey)
//     console.log("¿Está pulsada la tecla Ctrl? ", event.ctrlKey)
// });  
