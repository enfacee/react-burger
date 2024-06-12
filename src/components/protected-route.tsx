import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import { useAppSelector } from "../hooks/hooks";

type TProtectedProps = {
	onlyUnAuth?: boolean;
	component: JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {

  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired
}
export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth={true} component={component} />
);