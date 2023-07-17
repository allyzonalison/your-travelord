import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passport", quantity: 5, packed: false },
  { id: 2, description: "Socks", quantity: 4, packed: false },
  { id: 3, description: "Bag", quantity: 2, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const totalItems = items.length;

  //ADD
  function handleAddItems(item) {
    setItems((items) => items.concat(item));
  }

  //DELETE
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  //UPDATE
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //CLEAR
  function handleClear() {
    setItems([]);
  }

  return (
    <div>
      <Title />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Footer totalItems={totalItems} />
    </div>
  );
}

function Title() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="form-box">
      <p className="p-list">List all your items here 🥰</p>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="the-inputs">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <input
            className="input1"
            type="text"
            placeholder="Input text..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btnSubmit">ADD</button>
      </form>
    </div>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClear }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <button className="btnClear" onClick={onClear}>
        CLEAR
      </button>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li style={item.packed ? { textDecoration: "line-through" } : {}}>
      <span>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        ></input>
        {item.quantity} &nbsp;
        {item.description}
      </span>
      <button className="btnDelete" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}

function Footer({ totalItems }) {
  return (
    <div className="footer">
      <p>You have {totalItems} items on your list</p>
    </div>
  );
}
