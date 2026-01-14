import { use, useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'  
import { useFavoritesStore } from "../store/favoritesStore"
import { useAuthStore } from "../store/authStore"

function JobCardFavoriteButton({jobId}){
    const {toggleFavorite, isFavorite} = useFavoritesStore()
    const {isLoggedIn} = useAuthStore()

    return (
        <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
            {isFavorite(jobId) ? '<3' : '</3'} 
        </button>
    )
}
function JobCardApplyButton({jobId}){
    const [isApplied, setIsApplied] = useState(false)
    const {isLoggedIn} = useAuthStore()

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    const handleApplyClick = ()=>{
        console.log("Aplicando trabajo con id:", jobId)
        setIsApplied(true)
    }
    return (
        <button disabled={!isLoggedIn} className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
    )
}
export function JobCard( { job } ) {
    return(
        <article 
            className="job-listing-card"
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-technology={job.data.technology}
        >
            <div>
                <h3>
                    <Link className={styles.title} href={`/jobs/${job.id}`}>
                        {job.titulo}
                    </Link>
                </h3>
                <small>{job.empresa} | {job.ubicacion}</small>
                <p>{job.descripcion}</p>
            </div>
            <div className={styles.actions}>
                <JobCardApplyButton jobId={job.id}/>
                <Link className={styles.details} href={`/jobs/job.id`}>
                    Ver detalles
                </Link>
                <JobCardFavoriteButton jobId={job.id}/>
            </div>
        </article>
    )
}