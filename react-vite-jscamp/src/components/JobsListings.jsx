import { JobCard } from './JobCard.jsx' 
export function JobsListings({jobs}){
    return(
        <>
        <h2>Resultados de búsqueda</h2>

        <div className="jobs-listings">
            {/*Aquí se insertan los empleos dinámicamente */}
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
        </>
    )
}
