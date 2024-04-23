import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from './components/modal/modal';
import OrderDetails from './components/order-details/order-details';
import IngridientDetails from './components/ingridient-details/ingridient-deltails';
import PropTypes from 'prop-types'
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

  const [modalOpen, setModalOpen] = useState(false);

  const [ingridientModal, setIngridient] = useState(null);

  const handleOpenModal = () =>{
    setModalOpen(true);
  };

  function onIngridientClick(item: any){
    setIngridient(item);
    setModalOpen(true);
  }

  const handleCloseModal = () =>{
    setModalOpen(false);
    setIngridient(null);
  };
  
  const modal = (
    <Modal closeModal={handleCloseModal} >
      <OrderDetails/>
    </Modal>
  );
  const modalIngridient = (
    <Modal closeModal={handleCloseModal} header='Детали ингридиента'>
      <IngridientDetails ingridient={ingridientModal}/>
    </Modal>
  );

  return ( data.loading?
    <h1>Загрузка...</h1>
  :!data.isError && data.ingridients ? (
    <div className={styles.app}>
      <AppHeader/>
      <div className={`${styles.mainContainer} mb-8`}>
        <div className={styles.box}>
          <BurgerIngridients items={data.ingridients} onIngridientClick={onIngridientClick}/>
        </div>
        <div className={styles.box}>
          <BurgerConstructor items={data.ingridients} openModal={handleOpenModal}/>
        </div>
      </div>
      {modalOpen ? (ingridientModal ? modalIngridient : modal): null}

    </div>
  ):(
  <h1 className="text text_type_main-large mt-10 ml-10">Упс. Что-то пошло не так....</h1>
));
}

export default App;
