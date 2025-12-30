import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListings } from '../components/JobsListings.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { useRouter } from '../hooks/useRouter.jsx'
//import jobsData from '../data.json'
import { useEffect, useState } from 'react'

const RESULTS_PER_PAGE = 5

const useFilters = () => {
  const [filters, setFilters] = useState(() =>{
    const savedFilters = localStorage.getItem('jobFilters')
    console.log("Saved filters from localStorage:", savedFilters);
    if (savedFilters) return JSON.parse(savedFilters)
    return{
      technology: '',
      location: '',
      experienceLevel: ''
    }
  })
  // Estados para el filtro de texto y la paginación
  // Funcionan leyendo los query params de la URL y estableciendolos como estado inicial, luego se actualizan cuando el usuario interactua
  const [textFilter, setTextFilter] = useState(() =>{
    const params = new URLSearchParams(window.location.search)
    return params.get('text') || ''
  })  
  const [currentPage, setCurrentPage] = useState(() =>{
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))
    return Number.isNaN(page) ? page : 1
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)  
  const {navigateTo} = useRouter()

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

  // Efecto para actualizar la URL del navegador cuando cambian los filtros, texto o página
  useEffect(()=>{
    const params = new URLSearchParams()
    if(textFilter) params.append('text', textFilter)
    if(filters.technology) params.append('technology', filters.technology)
    if(filters.location) params.append('type', filters.location)
    if(filters.experienceLevel) params.append('level', filters.experienceLevel)

    if(currentPage > 1) params.append('page', currentPage)

    // funcion para construir la URL de la página
    const newUrl = params.toString() 
     ? `${window.location.pathname}?${params.toString()}`
     : window.location.pathname

    navigateTo(newUrl)
  },[filters, textFilter,currentPage, navigateTo])

  useEffect(() =>{
    try{
      localStorage.setItem('jobFilters',JSON.stringify(filters))
    }catch(error){
      console.error("Error saving filters to localStorage:", error);
    }
  },[filters])
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
  
  const hasActiveFilters = 
    filters.technology !== '' ||
    filters.location !== '' ||
    filters.experienceLevel !== ''

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
  const handleClearFilters = () =>{
    setFilters({
      technology: '',
      location: '',
      experienceLevel: ''
    })
    localStorage.removeItem('jobFilters')
    setCurrentPage(1)
  }
  return{
    total,
    loading,
    jobs,
    totalPages,
    currentPage,
    filters,
    textFilter,
    hasActiveFilters,
    handlePagesChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters
  }
}

export function SearchPage() {
  const {
    total,
    loading,
    jobs,
    totalPages,
    currentPage,
    filters,
    textFilter,
    hasActiveFilters,
    handlePagesChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters  
  } = useFilters()

  const title = loading ? 'Cargando... Info-jobs':`Resultados totales: ${total}`  
  return (  
    <>
      <main>
        <title>{title}</title>
        <meta name="description" content="Listado con empleos y filtros para encontrar el trabajo de tus sueños."></meta>
        <SearchFormSection 
          initialText={textFilter} 
          onSearch={handleSearch} 
          onTextFilter={handleTextFilter} 
          initialFilters={filters} 
          hasActiveFilters={hasActiveFilters} 
          onClearFilters={handleClearFilters}/>
        <section>
          <h2 style={{textAlign: 'center'}}>Resultados de búsqueda</h2>
          {
           loading ? <Spinner/> : <JobsListings jobs={jobs}/>
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagesChange} />
        </section>
      </main>
    </>
  )
}
