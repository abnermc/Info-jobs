import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Header } from './components/Header.jsx' //La extensión es opcional
import { Footer } from './components/Footer.jsx'  
import { Spinner } from './components/Spinner.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const ProfilePage = lazy(()=> import('./pages/ProfilePage.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))
const Login = lazy(()=> import('./pages/Login.jsx'))
const Register = lazy(()=> import('./pages/Register.jsx'))

function App() {
  return (  
    <>
      <Header/>
      <Suspense fallback={<div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>
        <Spinner/>
      </div>}>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/jobs/:jobId" element={<JobDetail/>}></Route>
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </Suspense>
      <Footer/>
    </>
  )
}

export default App
