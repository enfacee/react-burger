import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
const urlApi = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
  const [data, setData] = useState({
    ingridients: null,
    loading: true,
    isError: false
  });
  
  useEffect(() => {
    const getIngridients = async () => {
      setData({...data, loading: true});
      const res = await fetch(urlApi);
      try {
        const ingridients = await res.json();
        setData({...data, loading: false, ingridients: ingridients.data});
      }
      catch(error){
        setData({...data, loading: false, isError: true});
      }
  };
    getIngridients();
  }, []);

  return !data.isError && data.ingridients?(
    <div className="App">
      <AppHeader/>
      <div className="main">
        <div className="box">
          <BurgerIngridients data={data.ingridients} />
        </div>
        <div className="box">
          <BurgerConstructor data={data.ingridients}/>
        </div>
      </div>
    </div>
  ):(
  <div>Ошибка</div>
);
}

export default App;
