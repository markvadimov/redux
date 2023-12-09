import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

function Home({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const registrationDate = new Date(user.date);

  const formattedDate = registrationDate.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleGoToNotes = () => {
    navigate("/notes");
  };

  return (
    <div>
      <header>
        <div style={{ color: "black" }}>Привет, {user.name}</div>
        <div>
          <Link to="/home" className="nav here">Обо мне</Link>
          <Link to="/notes" className="nav">Заметки</Link>
          <Link to="/login" className="nav">Выйти</Link>
        </div>
      </header>
      <div className="container">
        <div className="form">
          <h1>Обо мне</h1>
          <p>
            <strong>Почта:</strong> {user.email}
          </p>
          <p>
            <strong>Имя:</strong> {user.name}
          </p>
          <p>
            <strong>Никнейм:</strong> {user.nickname}
          </p>
          <p>
            <strong>Возраст:</strong> {user.age}
          </p>
          <p>
            <strong>Пол:</strong> {user.gender}
          </p>
          <p>
            <strong>Дата регистрации:</strong> {formattedDate}
          </p>
          <button onClick={handleGoToNotes}>Перейти к заметкам</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
