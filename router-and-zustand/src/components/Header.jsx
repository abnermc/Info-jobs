import { Link } from "./Link";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Header(){
    const {isLoggedIn, login, logout} = useAuth();    
    return(
        <header>
        <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <h1>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                DevJobs
            </h1>
        </Link>

        <nav>
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-link-active' : ''}>Inicio</NavLink>
        <NavLink to="/search" className={({isActive}) => isActive ? 'nav-link-active' : ''}>Empleos</NavLink>
        </nav>

        {
            isLoggedIn 
            ? <button onClick={logout}>Cerrar sesión</button>
            : <button onClick={login}>Iniciar sesión</button>
        }

        <div>
        <devjobs-avatar service="google" username="google.com" size="32">
        </devjobs-avatar>

        <devjobs-avatar service="google" username="netflix.com" size="32">
        </devjobs-avatar>   
        <devjobs-avatar service="google" username="vercel.com" size="32">
        </devjobs-avatar>
        </div>
        
        </header>
    )
}
