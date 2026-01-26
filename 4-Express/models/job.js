import jobs from '../data/jobs.json' with { type: 'json'}
export class JobModel{
    static async getAll({text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET
    }){
        let filteredJobs = jobs

        if(text){
            const searchTerm = text.toLowerCase()
            filteredJobs = filteredJobs.filter(job=>
                job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
            )
        }

        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)
        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber+limitNumber)

        return {
            jobs: paginatedJobs,
            total: filteredJobs.length,
            limit: limitNumber,
            offset: offsetNumber
        }
    }

    static async getById(id){
        const job = jobs.find(job => job.id === id)
        return job
    }

    static async create({titulo, empresa, ubicacion, data}){
        const newJob ={
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data
        }

        jobs.push(newJob) //Proximamente en una base de datos
        return newJob
    }
}