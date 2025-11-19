// Captura el evento 'change' en un elemento select
const filterLocation = document.querySelector('#filter-location');
const filterExp = document.querySelector('#filter-experience-level');
const mensaje = document.querySelector('#filter-selected-value');

function applyFilters(){
    const jobs = document.querySelectorAll('.job-listing-card');

    const locationValue = filterLocation.value;
    const expValue = filterExp.value;  

    jobs.forEach(job=>{
        const modalidad = job.getAttribute('data-modalidad');
        const experience = job.getAttribute('data-nivel');
        const isShown = locationValue === '' || locationValue === modalidad;
        job.classList.toggle('is-hidden', !isShown);
    })
}

filterLocation.addEventListener('change', applyFilters);
filterExp.addEventListener('change', applyFilters);