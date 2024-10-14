import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Fab, Zoom } from '@mui/material';
import ApiClient from "../api/apiClient";


function CreateNote(props) {
    const [isExpanded, setExpanded] = useState(false);
    
    const [note, setNote] = useState({
      title: "",
      titleFont: "Arial",          // Font for the title
      titleColor: "#000000",        // Font color for the title
      content: "",
      contentFont: "Arial",         // Font for the content
      contentColor: "#000000",      // Font color for the content
      color: "#FFFFFF",             // Background color
      isBold: false,
      isItalic: false,
      image: "",                    // Store uploaded image data URL
      imageFile: null               // Store actual image file (optional for backend)
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  // Handle image upload and preview with FileReader
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNote((prevNote) => ({
          ...prevNote,
          image: e.target.result,  // Store the image as a data URL for preview
          imageFile: file          // Store the actual file (optional for backend)
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note); // Send the note data to parent component
    setNote({
      title: "",
      titleFont: "Arial",
      titleColor: "#000000",
      content: "",
      contentFont: "Arial",
      contentColor: "#000000",
      color: "#FFFFFF",
      isBold: false,
      isItalic: false,
      image: "",
      imageFile: null
    });

    ApiClient.createNote(note).then(response=>{
      if (response.status===200){
        response.json().then(data=>{
          window.location.reload()
        })
      }
    })
  }

  function expand() {
    setExpanded(true);
  }
  
  return (
    <div>
      <form className="create-note" style={{ backgroundColor: note.color }}>
        {isExpanded && (
          <>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Add Title"
            style={{
              fontFamily: note.titleFont,
              color: note.titleColor
            }}
          />
          <select name="titleFont" value={note.titleFont} onChange={handleChange}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <input
            type="color"
            name="titleColor"
            value={note.titleColor}
            onChange={handleChange}
            title="Pick a font color for the title"
          />
        </>
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Add Note..."
          rows={isExpanded ? 3 : 1}
          style={{
            fontFamily: note.contentFont,
            fontWeight: note.isBold ? "bold" : "normal",
            fontStyle: note.isItalic ? "italic" : "normal",
            color: note.contentColor
          }}
        />
        {isExpanded && (
          <>
          <select name="contentFont" value={note.contentFont} onChange={handleChange}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <input
            type="color"
            name="contentColor"
            value={note.contentColor}
            onChange={handleChange}
            title="Pick a font color for the content"
          />
          <input
            type="color"
            name="color"
            value={note.color}
            onChange={handleChange}
            title="Pick a background color"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {note.image && <img src={note.image} alt="Preview" style={{ maxWidth: "100%" }} />}
          <label>
            <input
              type="checkbox"
              name="isBold"
              checked={note.isBold}
              onChange={handleChange}
            />
            Bold
          </label>
          <label>
            <input
              type="checkbox"
              name="isItalic"
              checked={note.isItalic}
              onChange={handleChange}
            />
            Italic
          </label>
        </>
        )}

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddCircleOutlineOutlinedIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateNote;
