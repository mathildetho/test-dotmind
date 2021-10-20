import React, { Dispatch, SetStateAction } from 'react';
import Button from '../Button/Button.component';
import './SearchBar.css';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <form className='searchBar'>
            <label htmlFor="search">
                <span>Search user</span>
            </label>
            <div>
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    type="text"
                    id="search"
                    placeholder="username"
                    value={searchQuery}
                />
                {searchQuery !== "" && <Button onClick={() => setSearchQuery('')} text="Réinitialiser" />}
            </div>
        </form>
    )
};

export default SearchBar;