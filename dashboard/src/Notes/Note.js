import React from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note" style={{ backgroundColor: props.color }}>
      <h1 style={{ fontFamily: props.font, color: props.fontColor }}>{props.title}</h1>
      <p
      style={{
        fontWeight: props.isBold ? "bold" : "normal",
        fontStyle: props.isItalic ? "italic" : "normal",
        color: props.fontColor
      }}
      >{props.content}</p>
      {props.image && (
        <img src={props.image} alt="Note" style={{ maxWidth: "100%" }} />
      )}
      <button onClick={handleClick}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </div>
  );
}

export default Note;
