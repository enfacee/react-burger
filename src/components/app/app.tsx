import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={`${styles.mainContainer} mb-8`}>
        <div className={styles.box}>
          <BurgerIngridients/>
        </div>
        <div className={styles.box}>
          <BurgerConstructor/>
        </div>
      </main>
      <Modal/>
    </div>
  )
}

export default App;
