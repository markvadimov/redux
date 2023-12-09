import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchNoteData } from '../components/actions'; 

const UpdateNote = ({ user, note, error, isLoading, fetchNoteData }) => {
  const { noteId } = useParams();
  const [title, setTitle] = useState(note ? note.title : ""); 
  const [body, setBody] = useState(note ? note.text : "");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const updateNote = () => {
    if (validateInputs()) {
      const updatedNote = {
        id: noteId,
        authorId: user.id,
        title,
        text: body,
        createdAt: note && note.createdAt ? note.createdAt : new Date().toISOString(),
      };
  
      fetch(`http://localhost:5001/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      })
      .then((response) => {
        if (response.ok) {
          navigate(`/view-note/${noteId}`);
        } else {
          console.error("Failed to update note");
        }
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
    }
  };
  

  const goBack = () => {
    navigate(`/notes`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <h1>Изменить заметку</h1>
        <div>
          <input
            className="title"
            type="text"
            id="editNote-title"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="error">{errors.title && <p>{errors.title}</p>}</div>
        </div>
        <div>
          <textarea
            id="editNote-body"
            className="note-text"
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        <div className="button-container">
          <button className="create-button" onClick={updateNote}>
            Обновить
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
  note: state.note, 
  error: state.error,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, { fetchNoteData })(UpdateNote);
