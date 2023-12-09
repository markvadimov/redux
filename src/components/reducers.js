import {
          SET_USER,
          ADD_NOTE,
          EDIT_NOTE,
          DELETE_NOTE,
          SET_ERROR,
          CLEAR_ERROR,
          SET_LOADING,
          SET_NOTE,
          FETCH_NOTE_DATA,
        } from './actions';
        
        const initialState = {
          user: null,
          notes: [], 
          error: null,
          isLoading: false,
        };
        
        const rootReducer = (state = initialState, action) => {
          switch (action.type) {
            case SET_USER:
              return {
                ...state,
                user: action.payload,
              };
            case ADD_NOTE:
              return {
                ...state,
                notes: [...state.notes, action.payload],
              };
            case EDIT_NOTE:
              const updatedNotes = state.notes.map((note) =>
                note.id === action.payload.id ? { ...note, ...action.payload.updatedNoteData } : note
              );
        
              return {
                ...state,
                notes: updatedNotes,
              };
            case DELETE_NOTE:
              const filteredNotes = state.notes.filter((note) => note.id !== action.payload);
        
              return {
                ...state,
                notes: filteredNotes,
              };
            case SET_NOTE:
              return {
                ...state,
                notes: [...state.notes, action.payload],
              };
            case SET_ERROR:
              return {
                ...state,
                error: action.payload,
              };
            case CLEAR_ERROR:
              return {
                ...state,
                error: null,
              };
            case SET_LOADING:
              return {
                ...state,
                isLoading: action.payload,
              };
              case FETCH_NOTE_DATA:
                const { noteId, noteData } = action.payload;
                const updatedNotesForFetch = state.notes.map((note) =>
                  note.id === noteId ? { ...note, ...noteData } : note
                );
              
                return {
                  ...state,
                  notes: updatedNotesForFetch,
                };
            default:
              return state;
          }
        };
        
        export default rootReducer;