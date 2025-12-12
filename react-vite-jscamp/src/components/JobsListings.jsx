import jobsData from '../data.json'
import { JobCard } from './JobCard.jsx' 
export function JobsListings(){
    return(
        <>
        <h2>Resultados de búsqueda</h2>

        <div className="jobs-listings">
            {/*Aquí se insertan los empleos dinámicamente */}
            {jobsData.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
        </>
    )
}
