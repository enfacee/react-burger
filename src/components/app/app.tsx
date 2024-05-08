import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={`${styles.mainContainer} mb-8`}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.box}>
            <BurgerIngredients/>
          </div>
          <div className={styles.box}>
            <BurgerConstructor/>
          </div>
        </DndProvider>
      </main>
    </div>
  )
}

export default App;
