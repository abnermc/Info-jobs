// Captura el evento 'change' en un elemento select
const filter = document.querySelector('#filter-location');
const mensaje = document.querySelector('#filter-selected-value');

filter.addEventListener('change', () => {
    const jobs = document.querySelectorAll('.job-listing-card');

    const selectedValue = filter.value;
    if(selectedValue){
        mensaje.textContent = `Has seleccionado: ${selectedValue}`;
    } else{
        mensaje.textContent = '';
    }

    jobs.forEach(job=>{
        const modalidad = job.getAttribute('data-modalidad');
        const isShown = selectedValue === '' || selectedValue === modalidad;
        job.classList.toggle('is-hidden', !isShown);
    })
});