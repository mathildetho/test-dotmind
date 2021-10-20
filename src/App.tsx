import React, { useEffect, useState } from 'react';

import './App.css';
import SearchBar from './components/Form/SearchBar/SearchBar.component';
import Card from './components/Layout/Card/Card.component';
import SnackBar from './components/Layout/SnackBar/SnackBar.component';
import { users } from './datas/users';
import { useSnackbar } from './hooks/useSnackBar.hooks';

export interface user {
  id: number;
  username: string;
  picture: string
}

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<user[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isActive, message, openSnackBar } = useSnackbar();

  useEffect(() => {
    const getFavorites = localStorage.getItem('favorites');
    if (getFavorites) {
      const lastFavorites = JSON.parse(getFavorites)
      setFavorites(lastFavorites)
      if (lastFavorites.length > 0) {
        const compare = ( a: { id: number; }, b: { id: number; } ) =>{
          if (lastFavorites.some((favori: { id: number; }) => favori.id === a.id) > lastFavorites.some((favori: { id: number; }) => favori.id === b.id) ){
            return -1;
          }
          if (lastFavorites.some((favori: { id: number; }) => favori.id === a.id) < lastFavorites.some((favori: { id: number; }) => favori.id === b.id)){
            return 1;
          }
          return 0;
        }
        
        users.sort(compare)
      }
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  },[])

  const searchUsers = (): user[]=> {
    return users.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
  };
  
  const saveToStorage = (data: user[]) => {
    localStorage.setItem("favorites", JSON.stringify(data))
  }

  const clickCardUser = (user: user) => {
    if (favorites.some((favori) => favori.id === user.id)) {
      const newFavorites = favorites.filter((favori) => favori.id !== user.id)
      setFavorites(newFavorites)
      saveToStorage(favorites)
      openSnackBar(`${user.username} was removed from favorites`)
    } else {
      setFavorites((prevState) => ([
        ...prevState,
        user
      ]))
      saveToStorage(favorites)
      openSnackBar(`${user.username} was added to favorites`)
    }
  }

  return (
    <div>
      <SnackBar message={message} isActive={isActive} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {
        loading ? (
          <p>loading users...</p>
        ) : (
          <ul className='cards'>
            {searchUsers().map((user) => {
              const isFavori: boolean = favorites.some((favori) => favori.id === user.id)
              return <Card key={user.id} user={user} isFavori={isFavori} onClick={clickCardUser} />
            })}
          </ul>
        )
      }
    </div>
  );
}

export default App;
