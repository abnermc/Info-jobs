const container = document.querySelector('.jobs-listings');
console.log('antes del fetch');
fetch("./data.json")
    .then((response) =>{
        return response.json();
    })
    .then((jobs)=>{
        jobs.forEach(job => {
            const article = document.createElement('article');
            article.className = 'job-listing-card';

            article.dataset.modalidad = job.data.modalidad;
            article.dataset.nivel = job.data.nivel;
            article.dataset.technology = job.data.technology;

            article.innerHTML = `
            <div>
                <h3>${job.titulo}</h3>
                <small>${job.empresa} • ${job.ubicacion}</small>
                <p>
                    ${job.descripcion}
                </p>
            </div>
            <button type="button" class="button button-apply-job">Aplicar</button>`

            container.appendChild(article);
        });
    });