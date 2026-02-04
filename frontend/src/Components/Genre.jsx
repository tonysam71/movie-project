import { useEffect, useState } from 'react';
import CategoryNavigator from './CategoryNavigator.jsx';
import axios from 'axios';
 
function ExGenre() {
   const [genre, setGenre] = useState([]);
      const getlanguage = async () => {
      const { data } = await axios(' /api/movie/getgenre');
      setGenre(data.data);
      };
      useEffect(() => {
        getlanguage();
      }, []);
     
  return (
    <CategoryNavigator category="Genre" redirecturl="category" data={genre} />
  )
}
export default ExGenre;
 