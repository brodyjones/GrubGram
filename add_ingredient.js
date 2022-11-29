import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {db} from "firebase_config"
import {collection, getDocs, updateDocs} from 'firebase/firestore'

export function add_ingredient(props) {
  current = 0 // this needs to be the current user index in the users array created

  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getUsers()
  }, [])

  const add_pantry_ingredient = async (id, ingredient) => {
    const userDoc = doc(db, "users", id);
    const newFields = {pantry: pantry.push(ingredient)} //not actually how you do it
    await updateDoc(userDoc, newFields);
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Find Ingredient..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  render(
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Add Ingredient to Pantry
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item onCLick={add_pantry_ingredient(users[current].id, "eggs")} eventKey="1">eggs</Dropdown.Item>
        <Dropdown.Item eventKey="2">flour</Dropdown.Item>
        <Dropdown.Item eventKey="3">milk</Dropdown.Item>
        <Dropdown.Item eventKey="4">salt</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );
}