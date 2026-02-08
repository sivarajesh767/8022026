import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data));
  }, []);

  const addToCart = (id) => {
    axios.post('http://localhost:5000/api/carts',
      { itemId: id },
      { headers: { Authorization: localStorage.getItem('token') } }
    );
  };

  return (
    <div>
      {items.map(i => (
        <div key={i._id}>
          {i.name} - ₹{i.price}
          <button onClick={() => addToCart(i._id)}>Add</button>
        </div>
      ))}
    </div>
  );
}