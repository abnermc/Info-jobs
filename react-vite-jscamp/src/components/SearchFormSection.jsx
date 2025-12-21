import { useState } from "react";
import { useId } from "react";
const useSearchForm = ({idTechnology, idLocation, idExperienceLevel,hasActiveFilters, onSearch, onTextFilter, onClearFilters})=>{
    const [searchText, setSearchText] = useState('')
    const handleSubmit = (event) =>{
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const filters = {
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idExperienceLevel)
        }
        
        onSearch(filters)
    }

    const handleTextChange = (event) =>{
        const text = event.target.value
        setSearchText(text)
        onTextFilter(text)
    }

    const handleClearFilters = () =>{
        onClearFilters()
    }
    return{
        searchText,
        hasActiveFilters,
        handleSubmit,
        handleTextChange,
        handleClearFilters
    }
}
export function SearchFormSection({hasActiveFilters, onTextFilter, onSearch, onClearFilters}){
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()

    const{
        handleSubmit,
        handleTextChange,
        handleClearFilters
    } = useSearchForm({idTechnology, idLocation, idExperienceLevel,hasActiveFilters, onSearch, onTextFilter,onClearFilters})

    return(
        <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form onChange={handleSubmit} id="empleos-search-form" role="search">
            <div className="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>

                <input name={idText} id="empleos-search-input" type="text" 
                    placeholder="Buscar trabajos, empresas o habilidades"
                    onChange={handleTextChange}>
                </input>
            </div>

            <div className="search-filters">
            <select name={idTechnology} id="filter-technology">
                <option value="">Tecnología</option>
                <optgroup label="Tecnologías populares">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
                </optgroup>
                <option value="java">Java</option>
                <hr />
                <option value="csharp">C#</option>
                <option value="c">C</option>
                <option value="c++">C++</option>
                <hr />
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
            </select>

            <select name={idLocation} id="filter-location">
                <option value="">Ubicación</option>
                <option value="remoto">Remoto</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="barcelona">Barcelona</option>
            </select>

            <select name={idExperienceLevel} id="filter-experience-level">
                <option value="">Nivel de experiencia</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
            </select>
            
            {
                hasActiveFilters && (
                    <button type='button' className='button-clear-filters' onClick={handleClearFilters}>
                    <span>Limpiar filtros</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon   icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path  d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2     -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </button>
                )
            }
                
            </div>
        </form>

        <span id="filter-selected-value"></span>
        </section>
    )
}