import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username, password
      });
      localStorage.setItem('token', res.data.token);
      alert('Login success');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('You cannot login on another device.');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="mb-4">
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}