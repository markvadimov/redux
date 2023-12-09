import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

function Notes({ user }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/notes?authorId=${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (typeof data === "object") {
            const notesArray = Object.values(data);
            setNotes(notesArray);
          } else {
            console.error("Неверные данные.", data);
          }
        } else {
          console.error("Не удалось найти заметки");
        }
      } catch (error) {
        console.error("Ошибка при получении заметок", error);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleCreateNote = () => {
    navigate("/create-note");
  };

  const handleEditNote = (noteId) => {
    navigate(`/edit-note/${noteId}`);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        console.error("Ошибка удаления заметки");
      }
    } catch (error) {
      console.error("Ошибка удаления заметки:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <header>
        <div style={{ color: "black" }}>Привет, {user.name}</div>
        <div>
          <Link to="/home" className="nav">Обо мне</Link>
          <Link to="/notes" className="nav here">Заметки</Link>
          <Link to="/login" className="nav">Выйти</Link>
        </div>
      </header>
      <div>
        <h1>Заметки</h1>
        <div className="add">
          <button className="addnote" onClick={handleCreateNote}>Добавить новую заметку</button>
        </div>
        <div className="notes">
          <div>
            {notes.length > 0 ? (
              notes.map((note) => (
                <div className="note" key={note.id}>
                  <Link to={`/view-note/${note.id}`}
                  className="note-content-link">
                    <div className="note-title-container">
                        <div className="note-title">{note.title}</div>
                        <div className="note-date">{formatDate(note.createdAt)}</div>
                    </div>
                  </Link>
                  <div className="note-actions">
                    <button className="icon" onClick={() => handleEditNote(note.id)}>✍️</button>
                    <button className="icon" onClick={() => handleDeleteNote(note.id)}>🗑️</button>
                  </div>
                </div>
              ))
            ) : (
              <div>Заметок не найдено.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Notes);
