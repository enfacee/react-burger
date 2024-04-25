import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngridientDetails from '../ingridient-details/ingridient-deltails';
import {ingridientPropTypes}  from "../../utils/ingridient-prop-types"
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
         if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
         }
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
  function DetailModal(){
    return (
      <Modal closeModal={handleCloseModal} >
        <OrderDetails/>
      </Modal>
    )
  }
  function IngridientModal ({ingridientModal}:any) {
    return (
    <Modal closeModal={handleCloseModal} header='Детали ингридиента'>
      <IngridientDetails ingridient={ingridientModal}/>
    </Modal>
    )
  };
  IngridientModal.propTypes = {
    ingridientModal: ingridientPropTypes
  }

  return ( data.loading?
    <h1>Загрузка...</h1>
  :!data.isError && data.ingridients ? (
    <div className={styles.app}>
      <AppHeader/>
      <main className={`${styles.mainContainer} mb-8`}>
        <div className={styles.box}>
          <BurgerIngridients items={data.ingridients} onIngridientClick={onIngridientClick}/>
        </div>
        <div className={styles.box}>
          <BurgerConstructor items={data.ingridients} openModal={handleOpenModal}/>
        </div>
      </main>
      {modalOpen ? (ingridientModal ? <IngridientModal ingridientModal={ingridientModal}/> : <DetailModal/>): null}

    </div>
  ):(
  <h1 className="text text_type_main-large mt-10 ml-10">Упс. Что-то пошло не так....</h1>
));
}

export default App;
