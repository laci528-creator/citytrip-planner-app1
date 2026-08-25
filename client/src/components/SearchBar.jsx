function SearchBar({ searchTerm, setSearchTerm, onSearch }) { 
    return ( 
        <form className="search-form" onSubmit={onSearch}> 
                <div className="input-wrapper">
                    <span className="search-icon" aria-hidden="true">🔍</span>
                    <input
                        type="search"
                        className="search-input"
                        aria-label="Search destination" 
                        value={searchTerm} 
                        onChange={(event) => setSearchTerm(event.target.value)} 
                        />
                </div> 
                <button type="submit" className="search-button">
                    Search
                </button>
        </form> 
    );
} 
                
export default SearchBar;