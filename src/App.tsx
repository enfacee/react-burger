import { useEffect, useState } from 'react';
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
      try {
        const res = await fetch(urlApi);
        const ingridients = await res.json();
        setData({...data, loading: false, ingridients: ingridients.data});
      }
      catch(error) {
        setData({...data, loading: false, isError: true});
      }
    };
    getIngridients();
  }, []);

  return !data.isError && data.ingridients ? (
    <div className="App">
      <AppHeader/>
      <div className="main-container mb-8">
        <div className="box">
          <BurgerIngridients items={data.ingridients} />
        </div>
        <div className="box">
          <BurgerConstructor items={data.ingridients}/>
        </div>
      </div>
    </div>
  ):(
  <h1 className="text text_type_main-large mt-10 ml-10">Упс. Что-то пошло не так....</h1>
);
}

export default App;
