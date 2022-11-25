import React from "react";
import { useChoreAppend, type ChoreListProps } from "../../context/ChoreProvider";
import { nanoid } from "nanoid";
import styles from "./input.module.css";

function CInput() {
  const [choreInput, setChoreInput] = React.useState("");
  const appendChore = useChoreAppend();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setChoreInput(evt.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const choreObj: ChoreListProps = {
      id: nanoid(),
      chore: choreInput,
      state: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    if(!appendChore(choreObj).success){
      alert("Error adding chore");
    }
    alert("Chore added");
    setChoreInput("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.choreForm}>
      <input
        type="text"
        placeholder="I need to ..."
        value={choreInput}
        onChange={handleChange}
        required
      />
      <button type="submit">ADD</button>
    </form>
  );
}

export default CInput;
