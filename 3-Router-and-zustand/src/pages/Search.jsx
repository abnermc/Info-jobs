import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListings } from '../components/JobsListings.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { useSearchParams } from 'react-router'
//import jobsData from '../data.json'
import { useEffect, useState } from 'react'

const RESULTS_PER_PAGE = 5

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() =>{
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })
  // Estados para el filtro de texto y la paginación
  // Funcionan leyendo los query params de la URL y estableciendolos como estado inicial, luego se actualizan cuando el usuario interactua
  const [textFilter, setTextFilter] = useState(() => searchParams.get('text') || '')  
  const [currentPage, setCurrentPage] = useState(() =>{
    //const params = new URLSearchParams(window.location.search)
    const page = Number(searchParams.get('page'))
    return Number.isNaN(page) ? page : 1
  })

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

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs/?${queryParams}`)
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
    setSearchParams((params)=>{
      const newParams = new URLSearchParams() 

      if(textFilter) newParams.set('text', textFilter)
      if(filters.technology) newParams.set('technology', filters.technology)
      if(filters.location) newParams.set('type', filters.location)
      if(filters.experienceLevel) newParams.set('level', filters.experienceLevel)

      if(currentPage > 1) newParams.set('page', currentPage)

      return newParams
    })
  },[filters, textFilter,currentPage, setSearchParams])

  useEffect(() =>{
    try{
      localStorage.setItem('jobFilters',JSON.stringify(filters))
    }catch(error){
      console.error("Error saving filters to localStorage:", error);
    }
  },[filters])

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

export default function SearchPage() {
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
