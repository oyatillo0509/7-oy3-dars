import React, { useReducer } from "react";
import styles from "./DynamicForm.module.css";

const initialState = [{ name: "", number: "", remarks: "" }];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { name: "", number: "", remarks: "" }];
    case "REMOVE_ROW":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE_ROW":
      return state.map((row, index) =>
        index === action.index ? { ...row, [action.name]: action.value } : row
      );
    default:
      return state;
  }
};

const DynamicForm = () => {
  const [rows, dispatch] = useReducer(reducer, initialState);

  const handleChange = (index, e) => {
    dispatch({
      type: "UPDATE_ROW",
      index,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const addRow = () => {
    dispatch({ type: "ADD_ROW" });
  };

  const removeRow = (index) => {
    dispatch({ type: "REMOVE_ROW", index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(rows));
    alert("Form data saved to localStorage!");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {rows.map((row, index) => (
        <div key={index} className={styles.row}>
          <input
            type="text"
            name="name"
            value={row.name}
            onChange={(e) => handleChange(index, e)}
            placeholder="Name"
          />
          <input
            type="text"
            name="number"
            value={row.number}
            onChange={(e) => handleChange(index, e)}
            placeholder="Number"
          />
          <input
            type="text"
            name="remarks"
            value={row.remarks}
            onChange={(e) => handleChange(index, e)}
            placeholder="Remarks"
          />
          {rows.length > 1 && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeRow(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <div>
        <button type="button" className={styles.addButton} onClick={addRow}>
          Add More
        </button>
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
