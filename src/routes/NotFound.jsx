import { Link } from "react-router-dom";
import { connect } from 'react-redux';

function NotFound({ user }) {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Страница не найдена</p>
      {user ? (
        <Link to="/home">На главную</Link>
      ) : (
        <Link to="/login">К регистрации</Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NotFound);
