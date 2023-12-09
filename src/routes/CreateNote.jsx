import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { setUser, addNote, setError, setLoading } from '../components/actions';

function NoteCreator({ user, notes, error, isLoading }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeBody = (event) => {
    setBody(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createNote = () => {
    if (validateInputs()) {
      const newNote = {
        id: notes.length + 1,
        authorId: user.id,
        title,
        text: body,
        createdAt: new Date().toISOString(),
      };

      dispatch(setLoading(true));
      fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => {
          dispatch(setLoading(false));
          if (response.ok) {
            dispatch(addNote(newNote));
            dispatch(setUser(user));
            navigate("/notes");
          } else {
            dispatch(setError("Failed to create note"));
          }
        })
        .catch((error) => {
          dispatch(setLoading(false));
          dispatch(setError(`Error creating note: ${error}`));
        });
    }
  };

  const goBack = () => {
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
      <div className="updateNote-container">
        <h1 style={{ textAlign: "center" }}>Создать новую заметку</h1>
        <input
          type="text"
          className="title"
          placeholder="Title"
          value={title}
          onChange={handleChangeTitle}
        />
        <div className="error">{errors.title && <p>{errors.title}</p>}</div>
        <textarea
          className="note-text"
          placeholder="Note text..."
          value={body}
          onChange={handleChangeBody}
        />
        <div className="button-container">
          <button className="create-button" onClick={createNote}>
            Создать
          </button>
          <button className="back-button" onClick={goBack}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  notes: state.notes,
  error: state.error,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(NoteCreator);
