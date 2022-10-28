import React, { useState, useEffect } from "react";
import Displaynotes from "./Displaynotes";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

var Notes = () => {
  var navigate = useNavigate();
  var [state, setState] = useState({
    id: "",
    status: false,
  });
  var [noteState, setNoteState] = useState({
    title: "",
    desc: "",
    res: [],
    status: false,
  });

  var inputEvent = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setNoteState({
      ...noteState,
      [name]: value,
    });
  };

  //when user click submit button
  const postNotes = async (e) => {
    try {
      e.preventDefault();
      var { title, desc } = noteState;
      setNoteState({
        ...noteState,
        status: true,
      });
      const responce = await fetch("/postnotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
        }),
      });
      var res = await responce.json();
      setNoteState({
        title: "",
        desc: "",
        res: res,
        status: false,
      });
      console.log("res", res.length);
    } catch (err) {
      navigate("/login");
      alert("Error occure while sending the notes data into the database");
    }
  };

  //delte notes logic
  var deleteNote = async (id) => {
    try {
      setNoteState({
        ...noteState,
        status: true,
      });
      console.log("react js id", id);
      var findNote = await fetch(`/delete/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      var res = await findNote.json();
      setNoteState({
        title: "",
        desc: "",
        res: res.Notes,
        status: false,
      });
      console.log("Responce of delete notes", res);
    } catch (err) {
      alert("Error occure while deleting the note from the database");
    }
  };

  //updating notes

  var updateNoteHTML = async (id) => {
    setState({
      id: id,
      status: true,
    });

    var findNote = await fetch(`/update/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    var res = await findNote.json();
    console.log("res", res);

    setNoteState({
      title: res[0].Title,
      desc: res[0].Desc,
      res: [],
      status: false,
    });
  };

  var update_post_notes = async (e, id) => {
    try {
      e.preventDefault();
      var { title, desc } = noteState;
      setNoteState({
        ...noteState,
        status: true,
      });
      console.log("react js id", id);
      var findNote = await fetch(`/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
        }),
      });

      var res = await findNote.json();
      console.log("React res is", res);
      setNoteState({
        title: "",
        desc: "",
        res: res.Notes,
        status: false,
      });
      setState({
        id: "",
        status: false,
      });
      // console.log("Responce of updated notes", res);
    } catch (err) {
      alert("Error occure while updating the note from the database");
    }
  };

  //this function automatically run when the code encountered
  useEffect(() => {
    var getnotesdata = async () => {
      try {
        setNoteState({
          ...noteState,
          status: true,
        });
        const getresponce = await fetch("/postnotes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        var getres = await getresponce.json();
        console.log("Get Responce Getres ", getres.Notes);
        setNoteState({
          ...noteState,
          res: getres.Notes,
          status: false,
        });
      } catch (err) {
        alert("Please Login First....");
        navigate("/login");
      }
    };
    getnotesdata();
  }, []);

  return (
    <>
      {state.status ? (
        <div id="update_note">
          <form method="POST" className="update_notesform">
            <input
              type="text"
              name="title"
              value={noteState.title}
              onChange={inputEvent}
              placeholder="Note Title"
              required
            ></input>
            <textarea
              type="text"
              name="desc"
              value={noteState.desc}
              onChange={inputEvent}
              placeholder="Note description"
              required
            ></textarea>
            <input
              type="submit"
              value="Update"
              id="submitupdatednotes"
              onClick={(e) => update_post_notes(e, state.id)}
            ></input>
          </form>
          <div className="spinner">{noteState.status ? <Spinner /> : null}</div>
        </div>
      ) : (
        <div className="notes_container">
          <div id="notes_text_container">
            <h2>Enter Your Notes</h2>
            <form method="POST" className="notesform">
              <input
                type="text"
                name="title"
                value={noteState.title}
                onChange={inputEvent}
                placeholder="Note Title"
                required
              ></input>
              <textarea
                type="text"
                name="desc"
                value={noteState.desc}
                onChange={inputEvent}
                placeholder="Note description"
                required
              ></textarea>
              <input
                type="submit"
                value="Add Note"
                id="submitnotes"
                onClick={postNotes}
              ></input>
            </form>
          </div>
          <center>
            <div className="spinner">
              {noteState.status ? <Spinner /> : null}
            </div>
          </center>
          <div id="notes_disp_container">
            {noteState.res.map((value, index) => {
              if (noteState.res.length !== 0) {
                return (
                  <Displaynotes
                    key={index}
                    id={value._id}
                    title={value.Title}
                    desc={value.Desc}
                    deleteNote={deleteNote}
                    updateNoteHTML={updateNoteHTML}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
