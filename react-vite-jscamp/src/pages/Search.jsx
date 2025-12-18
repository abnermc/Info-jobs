import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListings } from '../components/JobsListings.jsx'
import { Pagination } from '../components/Pagination.jsx'
//import jobsData from '../data.json'
import { useEffect, useState } from 'react'

const RESULTS_PER_PAGE = 5

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })
  console.log("Filters state:", filters);
  const [textFilter, setTextFilter] = useState('')  
  const [currentPage, setCurrentPage] = useState(1)

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)  

  useEffect(() =>{
    async function fetchJobs(){
      try{
        setLoading(true)

        //Construcción de query params, sirven para enviar datos en la URL
        const params = new URLSearchParams()
        if(textFilter) params.append('text', textFilter)
        if(filters.technology) params.append('technology', filters.technology)
        if(filters.location) params.append('type', filters.location)
        if(filters.experienceLevel) params.append('level', filters.experienceLevel)
        
        //Lógica de paginación
        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString() 

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()
        
        setJobs(json.data)
        setTotal(json.total)
      }catch(error){
        console.error("Error fetching jobs:", error);
      }
      finally{
        setLoading(false)
      }
    }
    fetchJobs()
  },[filters, textFilter, currentPage])
  /* Ya no usaremos estos filtros ya que consumiremos de una API
  const jobsFilteredByFilters = jobsData.filter(job =>{
    return (
      (filters.technology === '' || job.data.technology.toLowerCase() === filters.technology.toLowerCase()) &&
      (filters.location === '' || job.data.modalidad.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.experienceLevel === '' || job.data.nivel.toLowerCase() === filters.experienceLevel.toLowerCase())
    )
  })

  const jobsWithTextFilter = textFilter === '' ? jobsFilteredByFilters : jobsFilteredByFilters.filter(job =>{
    return job.titulo.toLowerCase().includes(textFilter.toLowerCase())
  })

  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )
  */
  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handlePagesChange = (page) => {
    console.log("Página cambiada a:", page);
    setCurrentPage(page)
  }

  const handleSearch = (filters) =>{
    setFilters(filters)
    setCurrentPage(1)
  }  
  const handleTextFilter = (newTextoToFilter)=>{
    setTextFilter(newTextoToFilter)
    setCurrentPage(1)
  }
  return{
    total,
    loading,
    jobs,
    totalPages,
    currentPage,
    handlePagesChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const {
    total,
    loading,
    jobs,
    totalPages,
    currentPage,
    handlePagesChange,
    handleSearch,
    handleTextFilter
  } = useFilters()

  useEffect(() =>{
    document.title = `Resultados totales: ${total} - Página ${currentPage}`
  },[jobs, currentPage])

  return (  
    <>
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section>
          {
            loading ? <p>Cargando ofertas de empleo...</p> : <JobsListings jobs={jobs}/>
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagesChange} />
        </section>
      </main>
    </>
  )
}

