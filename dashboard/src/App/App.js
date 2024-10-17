import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Note from "../Notes/Note";
import CreateNote from "../NewNote/CreateNote";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import Register from "../Registration/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword"


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(addedNote) {
    setNotes(prevNotes => {
      return [...prevNotes, addedNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((newNote, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="app-container"> {/* New wrapper */}
      <Router>
        <Header />
        <main className="main-content">  {/* Main content section */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<Register />}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <CreateNote onAdd={addNote} />
                  {notes.map((newNote, index) => (
                    <Note
                      key={index}
                      id={index}
                      title={newNote.title}
                      titleFont={newNote.titleFont}
                      titleColor={newNote.titleColor}
                      isTitleBold={newNote.isTitleBold}      // New prop
                      isTitleItalic={newNote.isTitleItalic}  // New prop
                      content={newNote.content}
                      contentColor={newNote.contentColor}
                      contentFont={newNote.contentFont}
                      color={newNote.color}
                      isBold={newNote.isBold}
                      isItalic={newNote.isItalic}
                      image={newNote.image}
                      onDelete={deleteNote}
                    />
                  ))}
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
