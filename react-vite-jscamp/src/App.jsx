import { Header } from './components/Header.jsx' //La extensión es opcional
import { Footer } from './components/Footer.jsx'  
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListings } from './components/JobsListings.jsx'
import { JobCard } from './components/JobCard.jsx'
import { Pagination } from './components/Pagination.jsx'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

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
          <JobsListings/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagesChange} />
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App
