import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, NotFound404Page, ProfilePage, FeedPage, ProfileInfoPage, ProfileOrdersPage } from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-deltails';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/ingredients';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Order from '../order/order';
import Preloader from '../preloader/preloader';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const { loading } = useAppSelector(state => state.ingredients);
  const { isUserAuth } = useAppSelector(state => state.user);
  const handleModalClose = () => {
    navigate(-1);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      {(loading || !isUserAuth) && 
				<Modal>
          <Preloader/>
				</Modal>
			}
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<OnlyUnAuth component={<LoginPage/>}/>}  />
        <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>}/>} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage/>}/>} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage/>}/>} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails/>} />
        <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>}>
          <Route index element={<OnlyAuth component={<ProfileInfoPage/>}/>} />
          <Route path='orders' element={<OnlyAuth component={<ProfileOrdersPage/>}/>} />
        </Route>
        <Route path='/feed' element={<FeedPage/>} />
        <Route path='/profile/orders/:number' element={<OnlyAuth component={<Order/>}/>} />
        <Route path='/feed/:number' element={<Order/>} />
        <Route path='*' element={<NotFound404Page/>}/>
      </Routes>
      {background && (
        <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal header={'Детали ингредиента'} onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <OnlyAuth component={
                  <Modal onClose={handleModalClose}>
                    <Order/>
                  </Modal>
                  }/>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal onClose={handleModalClose}>
                  <Order/>
                </Modal>
              }
            />
        </Routes>
      )}
    </div>    
  )
};
