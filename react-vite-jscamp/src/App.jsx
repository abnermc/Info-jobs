import { Header } from './components/Header.jsx' //La extensión es opcional
import { Footer } from './components/Footer.jsx'  
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListings } from './components/JobsListings.jsx'
import { JobCard } from './components/JobCard.jsx'
import { Pagination } from './components/Pagination.jsx'
import jobsData from './data.json'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const RESULTS_PER_PAGE = 5

function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [textFilter, setTextFilter] = useState('')  
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilteredByFilters = jobsData.filter(job =>{
    return (
      (filters.technology === '' || job.data.technology === filters.technology.toLowerCase()) 
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
  return (  
    <>
      <Header/>
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section>
          <JobsListings jobs={pagedResults}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagesChange} />
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App
