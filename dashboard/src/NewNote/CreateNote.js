import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Fab, Zoom } from '@mui/material';
import ApiClient from "../api/apiClient";

function CreateNote(props) {
    const [notes, setNotes] = useState([]); // Store notes
    const [isExpanded, setExpanded] = useState(false); // Control form expansion
    const [error, setError] = useState(""); // Store any error messages

    const [note, setNote] = useState({
        title: "",
        titleFont: "Arial",
        titleColor: "#000000",
        isTitleBold: false,
        isTitleItalic: false,
        content: "",
        contentFont: "Arial",
        contentColor: "#000000",
        color: "#FFFFFF",
        isBold: false,
        isItalic: false,
        image: "",        // Store uploaded image data URL
        imageFile: null,  // Store actual image file
        imageUrl: ""      // Store the image URL for preview
    });

    // Fetch notes from backend when component mounts
    useEffect(() => {
        // check if logged in
        ApiClient.getUser().then(response => {
            if (!response.ok) window.location.href = '/login';
        })

        
        fetchNotes();
    }, []);

    async function fetchNotes() {
        try {
            const response = await ApiClient.getNotes();
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setNotes(data);
                props.setNotes(data.note);


            } else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    // Handle input changes for the form fields
    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    // Handle image upload and preview using FileReader
    function handleImageUpload(event) {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNote((prevNote) => ({
                    ...prevNote,
                    image: e.target.result, // Set the data URL for preview
                    imageFile: file         // Store the file (optional for backend)
                }));
            };
            reader.readAsDataURL(file); // Convert the file to a data URL
        }
    }

    // Handle changes for the image URL input
    function handleUrlInputChange(event) {
        const { value } = event.target;
        setNote((prevNote) => ({
            ...prevNote,
            imageUrl: value // Store the pasted image URL
        }));
    }

    // Copy the image URL to the clipboard
    function copyToClipboard() {
        navigator.clipboard.writeText(note.imageUrl)
            .then(() => {
                alert("Image URL copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    }

    // Submit the note and send it to the parent component
    function submitNote(event) {
        event.preventDefault();
        props.onAdd(note); // Send note data to parent component

        ApiClient.createNote(note).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    window.location.reload(); // Reload after successful submission
                });
            }
        });

        // Reset the form after submission
        setNote({
            title: "",
            titleFont: "Arial",
            titleColor: "#000000",
            isTitleBold: false,
            isTitleItalic: false,
            content: "",
            contentFont: "Arial",
            contentColor: "#000000",
            color: "#FFFFFF",
            isBold: false,
            isItalic: false,
            image: "",
            imageFile: null,
            imageUrl: "" // Reset the image URL
        });
    }

    // Expand the form when the content area is clicked
    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <button
                onClick={() => { ApiClient.logout(); }}
                style={{ fontSize: "14px", padding: "10px 20px", marginTop: "20px" }}
            >
                Logout
            </button>

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
                                fontWeight: note.isTitleBold ? "bold" : "normal",
                                fontStyle: note.isTitleItalic ? "italic" : "normal",
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
                        <label className="note-label">
                            <input
                                type="checkbox"
                                name="isTitleBold"
                                checked={note.isTitleBold}
                                onChange={handleChange}
                            />
                            Bold Title
                        </label>
                        <label className="note-label">
                            <input
                                type="checkbox"
                                name="isTitleItalic"
                                checked={note.isTitleItalic}
                                onChange={handleChange}
                            />
                            Italic Title
                        </label>
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
                            style={{ color: "black" }}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={note.imageUrl}
                            onChange={handleUrlInputChange}
                            placeholder="Paste image URL here"
                            style={{ width: "80%", marginTop: "10px" }}
                        />
                        <button onClick={copyToClipboard} style={{ marginLeft: "10px" }}>
                            Copy URL
                        </button>

                        {note.imageUrl && (
                            <img
                                src={note.imageUrl}
                                alt="Image Preview"
                                style={{ maxWidth: "100%", marginTop: "10px" }}
                                onError={(e) => (e.target.style.display = "none")}
                            />
                        )}

                        <label className="note-label">
                            <input
                                type="checkbox"
                                name="isBold"
                                checked={note.isBold}
                                onChange={handleChange}
                            />
                            Bold
                        </label>
                        <label className="note-label">
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
