import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, NotFound404Page } from '../../pages/';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-deltails';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
        <Route path='/reset-password' element={<ResetPasswordPage/>} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails/>} />
        <Route path='*' element={<NotFound404Page/>}/>
      </Routes>
      {background && (
        <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
        </Routes>
      )}
    </div>    
  )
};
