import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './home.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export function HomePage() {
    return (
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
      )
};