import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, NotFound404Page, ProfilePage } from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-deltails';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/ingredients';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const { loading } = useSelector(state => state.ingredients);
  const { isUserAuth } = useSelector(state => state.user);
  const handleModalClose = () => {
    navigate(-1);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {(loading || !isUserAuth) && 
				<Modal>
					<div className={styles.loading}>
						<p className="text text_type_main-medium p-15">Загрузка...</p>
					</div>
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
        <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>} />
        <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>}>
          <Route path='orders' element={<OnlyAuth component={<ProfilePage/>}/>} />
          <Route path='orders/:number' element={<OnlyAuth component={<ProfilePage/>}/>} />
        </Route>
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
        </Routes>
      )}
    </div>    
  )
};
