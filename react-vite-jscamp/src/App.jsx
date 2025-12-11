import { Header } from './components/Header.jsx' //La extensión es opcional
import { Footer } from './components/Footer.jsx'  
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListings } from './components/JobsListings.jsx'
import { Pagination } from './components/Pagination.jsx'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (  
    <>
      <Header/>
      <main>
        <SearchFormSection/>
        <section>
          <JobsListings/>
          <Pagination/>
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App
