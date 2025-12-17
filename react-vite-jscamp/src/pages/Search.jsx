import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListings } from '../components/JobsListings.jsx'
import { Pagination } from '../components/Pagination.jsx'
import jobsData from '../data.json'
import { useEffect, useState } from 'react'

const RESULTS_PER_PAGE = 5

export function SearchPage() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })
  console.log("Filters state:", filters);
  const [textFilter, setTextFilter] = useState('')  
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

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

  useEffect(() =>{
    document.title = `Buscar empleos - Página ${currentPage}`
  },[jobsWithTextFilter, currentPage])
  return (  
    <>
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section>
          <JobsListings jobs={pagedResults}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagesChange} />
        </section>
      </main>
    </>
  )
}

