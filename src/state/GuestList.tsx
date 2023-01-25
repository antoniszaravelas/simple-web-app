import { useEffect, useState } from "react";
import { Button, DeleteButton, Input } from "./styledComponents";

const GuestList: React.FC = () => {
  const [people, setPeople] = useState<string[] | undefined>([]);
  const [person, setPerson] = useState("");

  useEffect(() => {
    if (localStorage.getItem("people"))
      setPeople(JSON.parse(localStorage.getItem("people")!));
  }, []);

  const addToTheList = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (people && person.length) {
      setPeople([...people, person]);
      setPerson("");
      localStorage.setItem("people", JSON.stringify(people));
    }
  };

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  const deleteName = (index: number) => {
    const newPeople = people?.filter((_, i) => i !== index);
    setPeople(newPeople);
    localStorage.setItem("people", JSON.stringify(people));
  };
  return (
    <>
      <h1>Party Guest List:</h1>
      <ul>
        {people &&
          people.map((person, index) => {
            return (
              <div key={person}>
                <li>
                  <span>{person}</span>
                  <DeleteButton onClick={() => deleteName(index)}>
                    delete
                  </DeleteButton>
                </li>
              </div>
            );
          })}
      </ul>
      <label htmlFor="">Person Name:</label>
      <Input
        onChange={(e) => setPerson(e.target.value)}
        type="text"
        id="person"
        value={person}
      ></Input>
      <Button type="submit" onClick={addToTheList}>
        Click to add!
      </Button>
    </>
  );
};

export default GuestList;
