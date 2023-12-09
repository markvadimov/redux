import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { setUser } from '../components/actions';

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = () => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          const user = data.find(
            (user) => user.email === email && user.password === password
          );

          if (user) {
            dispatch(setUser(user));
            navigate("/home");
          } else {
            setErrors({ email: "Пользователь не найден или неверные учетные данные" });
          }
        } else {
          setErrors({ email: "Неверный формат данных" });
        }
      })
      .catch((error) => {
        console.error("Ошибка входа:", error);
        setErrors({ email: "Произошла ошибка во время входа" });
      });
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Вход</h1>
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button onClick={handleLoginSubmit}>
          Войти
        </button>
        <p>
          Если у вас еще нет аккаунта, пожалуйста,{" "}
          <Link to="/registration">зарегистрируйтесь</Link>.
        </p>
      </div>
    </div>
  );
}

export default connect(null, { setUser })(Login);
