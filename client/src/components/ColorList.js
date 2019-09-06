import React, { useState } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = async e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const token = localStorage.getItem('authToken');
    const context = {
      headers: {
        Authorization: token
      }
    };
    let body = { ...colorToEdit };
    await axios.put(`http://localhost:5000/api/colors/${colorToEdit.id}`, body, context);
    updateColors(colors.map(color => color.id === colorToEdit ? colorToEdit : color));
  };

  const deleteColor = async color => {
    // make a delete request to delete this colo
    try {
      const token = localStorage.getItem('authToken');
      const context = {
        headers: {
          Authorization: token
        }
      };
      await axios.delete(`http://localhost:5000/api/colors/${color.id}`, context);
      updateColors(colors.filter(color => color.id !== colorToEdit));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
