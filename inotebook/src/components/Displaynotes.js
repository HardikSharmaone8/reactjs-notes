import React from "react";

var Displaynotes = ({ id, title, desc, deleteNote, updateNoteHTML, date }) => {
  return (
    <>
      <div className="display_notes_container">
        <div className="notes_title">
          <div style={{ marginTop: "-10px" }}>
            <h3>{title}</h3>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <i className="fa-solid fa-trash" onClick={() => deleteNote(id)}></i>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => updateNoteHTML(id)}
            ></i>
          </div>
        </div>
        <div className="notes_discription">
          <p>{desc}</p>
        </div>
        <div className="data_time">{date}</div>
      </div>
    </>
  );
};

export default Displaynotes;
