import { useId, useState, useRef } from "react";
const useSearchForm = ({
    idTechnology, 
    idLocation, 
    idExperienceLevel,
    idText,
    hasActiveFilters, 
    initialFilters,
    onSearch, 
    onTextFilter, 
    onClearFilters
    })=>{
    
    const timeOutId = useRef(null)
    const [searchText, setSearchText] = useState('')

    const handleSubmit = (event) =>{
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if(event.target.name === idText){
            return
        }

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
        // Debounce: cancelar timeout anterior (Usando el hook useRef)
        if(timeOutId.current) {
            clearTimeout(timeOutId.current)
        }
        timeOutId.current = setTimeout(() =>{
            onTextFilter(text)
        }, 500)
    }

    const handleClearFilters = () =>{
        setSearchText('')
        onClearFilters()
    }
    const handleSelectChange = (event) =>{
        const {name, value} = event.target
        onSearch({
            ...initialFilters,
            [name]: value
        })
    }
    return{
        searchText,
        hasActiveFilters,
        handleSubmit,
        handleTextChange,
        handleClearFilters,
        handleSelectChange
    }
}
export function SearchFormSection({hasActiveFilters, initialFilters, onTextFilter, onSearch, onClearFilters}){
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()
    const inputRef = useRef()
    
    const{
        handleSubmit,
        handleTextChange,
        handleClearFilters,
        handleSelectChange
    } = useSearchForm({idTechnology, idLocation, idExperienceLevel, idText, hasActiveFilters, initialFilters, onSearch, onTextFilter,onClearFilters})

    const handleClearInput = (event) =>{
        event.preventDefault()
        inputRef.current.value = ""
        onTextFilter('')
    }

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

                <input 
                    ref={inputRef} 
                    name={idText} 
                    id="empleos-search-input" 
                    type="text" 
                    placeholder="Buscar trabajos, empresas o habilidades"
                    onChange={handleTextChange}>
                </input>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-copy-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-3.333 -4c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3zm.8 8.786l-1.837 1.799l-1.749 -1.785a1 1 0 0 0 -1.319 -.096l-.095 .082a1 1 0 0 0 -.014 1.414l1.749 1.785l-1.835 1.8a1 1 0 0 0 -.096 1.32l.082 .095a1 1 0 0 0 1.414 .014l1.836 -1.8l1.75 1.786a1 1 0 0 0 1.319 .096l.095 -.082a1 1 0 0 0 .014 -1.414l-1.75 -1.786l1.836 -1.8a1 1 0 0 0 .096 -1.319l-.082 -.095a1 1 0 0 0 -1.414 -.014" /></svg>
                </button>
            </div>

            <div className="search-filters">
            <select name={idTechnology} value={initialFilters.technology} id="filter-technology" onChange={handleSelectChange}>
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

            <select name={idLocation} value={initialFilters.location} id="filter-location" onChange={handleSelectChange}>
                <option value="">Ubicación</option>
                <option value="remoto">Remoto</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="barcelona">Barcelona</option>
            </select>

            <select name={idExperienceLevel} value={initialFilters.experienceLevel} id="filter-experience-level" onChange={handleSelectChange}>
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