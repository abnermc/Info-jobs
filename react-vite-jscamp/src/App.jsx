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
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePagesChange = (page) => {
    console.log("Página cambiada a:", page);
    setCurrentPage(page)
  }

  return (  
    <>
      <Header/>
      <main>
        <SearchFormSection/>
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
