import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Header } from './components/Header.jsx' //La extensión es opcional
import { Footer } from './components/Footer.jsx'  

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))

function App() {
  let page = <NotFoundPage/>

  return (  
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/jobs/:jobId" element={<JobDetail/>}></Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
