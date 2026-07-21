function SearchBar({ searchTerm, setSearchTerm, onSearch }) { 
    return ( 
        <form className="search-form" onSubmit={onSearch}> 
                <div className="input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search destination" 
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