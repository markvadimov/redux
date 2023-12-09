export const SET_USER = 'SET_USER';
export const ADD_NOTE = 'ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SET_NOTE = 'SET_NOTE';
export const FETCH_NOTE_DATA = 'FETCH_NOTE_DATA';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const editNote = (id, updatedNoteData) => ({
  type: EDIT_NOTE,
  payload: { id, updatedNoteData },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setNote = (note) => ({
  type: SET_NOTE,
  payload: note,
});

export const fetchNoteData = (noteId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`http://localhost:5001/notes/${noteId}`);
    dispatch(setLoading(false));

    if (response.ok) {
      const fetchedNote = await response.json();
      dispatch(setNote(fetchedNote));
    } else {
      dispatch(setError("Failed to fetch note data"));
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(`Error fetching note data: ${error}`));
  }
};
