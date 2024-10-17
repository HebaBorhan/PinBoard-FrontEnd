import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ApiClient from "../api/apiClient";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  // Handle changes in edit mode
  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  // Save the updated note
  async function saveNote() {
    try {
      console.log(props.id);
      const response = await ApiClient.updateNote(props.id, editedNote);
      if (response.ok) {
        ApiClient.updateNote(props.id, editedNote).then(ress => {
          ress.json().then(data => {
            console.log(data)

            setIsEditing(false);
            // Exit edit mode
            window.location.reload()
          })
        }); // Update parent state
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  // Handle note deletion
  async function handleClick() {
    // props.onDelete(props.id); // Call the parent’s delete function
    await ApiClient.deleteNote(props.id);
    window.location.reload();
  }

  return (
    <div className="note" style={{ backgroundColor: props.color }}>
      {isEditing ? (
        <>
          {/* Editable title and content */}
          <input
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            style={{ fontFamily: props.titleFont, color: props.titleColor }}
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            style={{ fontFamily: props.contentFont, color: props.contentColor }}
          />
          <button onClick={saveNote}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          {/* Display title and content */}
          <h1
            style={{
              fontFamily: props.titleFont,
              fontWeight: props.isTitleBold ? "bold" : "normal",
              fontStyle: props.isTitleItalic ? "italic" : "normal",
              color: props.titleColor,
            }}
          >
            {props.title}
          </h1>
          <p
            style={{
              fontFamily: props.contentFont,
              fontWeight: props.isBold ? "bold" : "normal",
              fontStyle: props.isItalic ? "italic" : "normal",
              color: props.contentColor,
            }}
          >
            {props.content}
          </p>
          {props.image && (
            <img src={props.image} alt="Note" style={{ maxWidth: "100%" }} />
          )}
          {/* Edit and Delete buttons */}
          <button onClick={() => setIsEditing(true)}>
            <EditOutlinedIcon />
          </button>
          <button onClick={handleClick}>
            <DeleteOutlineOutlinedIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;
