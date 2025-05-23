import { useState } from 'react';
import authService from '../../services/authService';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authService.signUp(email, password);
      alert('Usuario registrado correctamente');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrarse</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" className="block w-full p-2 mb-3 border rounded" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="block w-full p-2 mb-3 border rounded" required />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Registrarse</button>
    </form>
  );
}
