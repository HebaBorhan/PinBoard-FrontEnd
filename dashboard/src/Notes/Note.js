import React from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note" style={{ backgroundColor: props.color }}>
      <h1 style={{ 
        fontFamily: props.titleFont,
        fontWeight: props.isTitleBold ? "bold" : "normal",
        fontStyle: props.isTitleItalic ? "italic" : "normal",
        color: props.titleColor }}>{props.title}
      </h1>
      <p
      style={{
        fontFamily: props.contentFont,
        fontWeight: props.isBold ? "bold" : "normal",
        fontStyle: props.isItalic ? "italic" : "normal",
        color: props.contentColor
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
