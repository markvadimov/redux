import React, { useState, useEffect } from "react";
import { User } from "../val/validation";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { setUser } from '../components/actions';

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function Registration({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors({});
    if (!email || !password || !confirmPassword || !name || !nickname || !age || !gender) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Все поля должны быть заполнены.",
      }));
      return;
    }

    const nameRegex = /^[A-Z][a-z]+$/;
    if (!nameRegex.test(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Имя должно начинаться с большой буквы, а затем содержать только маленькие буквы.",
      }));
      return;
    }

    if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Пожалуйста, введите действительный адрес электронной почты.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Пароли не совпадают.",
      }));
      return;
    }

    const ageValue = parseInt(age, 10);

    if (isNaN(ageValue) || ageValue < 1 || ageValue > 150) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Возраст должен быть числом от 1 до 150 лет.",
      }));
      return;
    }

    setErrors({});
  }, [email, password, confirmPassword, name, nickname, age, gender]);

  const handleRegistration = async () => {
    setErrors({});

    if (!email || !password || !confirmPassword || !name || !nickname || !age || !gender) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Все поля должны быть заполнены.",
      }));
      return;
    }

    const nameRegex = /^[A-Z][a-z]+$/;
    if (!nameRegex.test(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Имя должно начинаться с большой буквы, а затем содержать только маленькие буквы.",
      }));
      return;
    }

    if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Пожалуйста, введите действительный адрес электронной почты.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Пароли не совпадают.",
      }));
      return;
    }

    const ageValue = parseInt(age, 10);

    if (isNaN(ageValue) || ageValue < 1 || ageValue > 150) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Возраст должен быть числом от 1 до 150 лет.",
      }));
      return;
    }

    try {
      const user = User.parse({
        email,
        password,
        name,
        nickname,
        age: ageValue,
        gender,
        date: Date.now(),
      });

      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        dispatch(setUser(user));
        navigate("/login");
      } else {
        setErrors({ general: "Не удалось добавить пользователя." });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.issues.forEach((issue) => {
          const fieldName = issue.path.join(".");
          fieldErrors[fieldName] = issue.message;
        });
        setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
      }
    }
  };

  const handleAgeChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setAge(sanitizedValue);
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Регистрация</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
          {errors.passwordUppercase && (
            <div className="error">{errors.passwordUppercase}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Никнейм"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {errors.nickname && <div className="error">{errors.nickname}</div>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Возраст"
            value={age}
            onChange={handleAgeChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>
        <div>
          Пол:
          <div>
            <label>
              <input
                type="checkbox"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.checked ? "M" : "F")}
              />
              М
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="F"
                checked={gender === "F"}
                onChange={(e) => setGender(e.target.checked ? "F" : "M")}
              />
              Ж
            </label>
          </div>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>
        {errors.general && <div className="error">{errors.general}</div>}
        <button onClick={handleRegistration}>Зарегистрироваться</button>
        <p>
          Если у вас уже есть аккаунт, пожалуйста,{" "}
          <Link to="/login">войдите</Link>.
        </p>
      </div>
    </div>
  );
}

export default connect(null, { setUser })(Registration);
