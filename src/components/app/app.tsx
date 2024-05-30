import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home';

export default function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </div>    
  )
};
