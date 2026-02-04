
import { useEffect, useState } from "react";
import CategoryNavigator from "./CategoryNavigator.jsx";
import axios from "axios";
 
function ExLAng() {
  const [lang, setLang] = useState([]);
  const getlanguage = async () => {
    const { data } = await axios('/api/movie/getlang');
        setLang(data.data);
  };
  useEffect(() => {
    getlanguage();
  }, []);
    return (
    <>
    <CategoryNavigator
      category="Language"
      redirecturl="Language"
      data={lang}/>
    </>
  );
}
 
export default ExLAng;
 
 
 