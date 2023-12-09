import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { connect } from 'react-redux';

function ViewNote({ user }) {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const noteData = await response.json();
          setNote(noteData);
        } else {
          console.error("Failed to fetch note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleEditNote = () => {
    navigate(`/edit-note/${noteId}`);
  };

  const handleDeleteNote = () => {
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/notes");
        } else {
          console.error("Failed to delete note");
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const handleGoBack = () => {
    navigate("/notes");
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <div style={{ color: "black" }}>Привет, {user.name}</div>
        <div>
          <Link to="/home" className="nav">Обо мне</Link>
          <Link to="/notes" className="nav">Заметки</Link>
          <Link to="/login" className="nav">Выйти</Link>
        </div>
      </header>
      <div className="centered-container">
        <div className="viewNote-container">
          <div className="button-back-container">
            <button className="button-back" onClick={handleGoBack}>
              Назад
            </button>
          </div>
          <div className="viewNote-title-container">
            <h2 className="viewNote-title">{note.title}</h2>
          </div>
          <div className="icon">
            <button
              className="icon"
              onClick={handleEditNote}
              title="Редактировать"
            >
              ✍️
            </button>
            <button
              className="icon"
              onClick={handleDeleteNote}
              title="Удалить"
            >
              🗑️
            </button>
          </div>
        </div>
        <div className="note-text-container">{note.text}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ViewNote);
