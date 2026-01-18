const searchInput = document.getElementById('empleos-search-input');
const normalizar = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    const jobs = document.querySelectorAll('.job-listing-card');
    jobs.forEach(job => {
        const title = normalizar(job.querySelector('h3').textContent.toLowerCase());
        const match = title.includes(searchValue);
        
        const isShown = searchValue === '' || match;
        job.classList.toggle('is-hidden', !isShown);
    });
});
