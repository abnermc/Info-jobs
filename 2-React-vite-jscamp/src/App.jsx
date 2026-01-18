import { Header } from './components/Header.jsx' //La extensión es opcional
import { Footer } from './components/Footer.jsx'  
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import {NotFoundPage} from './pages/404.jsx'
import { Route } from './components/Route.jsx'

const RESULTS_PER_PAGE = 5

function App() {
  let page = <NotFoundPage/>

  return (  
    <>
      <Header/>
      <Route path="/" component={HomePage}/>
      <Route path="/search" component={SearchPage}/>
      <Footer/>
    </>
  )
}

export default App
