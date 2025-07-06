// greenvest-frontend/src/App.js import React from 'react'; import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; import Login from './pages/Login'; import Register from './pages/Register'; import Dashboard from './pages/Dashboard'; import PrivateRoute from './components/PrivateRoute';

function App() { return ( <Router> <Routes> <Route path="/" element={<Login />} /> <Route path="/register" element={<Register />} /> <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } /> </Routes> </Router> ); }

export default App;

// greenvest-frontend/src/pages/Login.js import React, { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import axios from 'axios';

const Login = () => { const navigate = useNavigate(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');

const handleLogin = async (e) => { e.preventDefault(); try { const res = await axios.post('https://greenvest-api.fly.dev/api/login', { email, password }); localStorage.setItem('token', res.data.token); navigate('/dashboard'); } catch (err) { setError('Login failed. Check your credentials.'); } };

return ( <div className="min-h-screen flex items-center justify-center"> <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-md"> <h2 className="text-xl font-bold mb-4">Login</h2> {error && <p className="text-red-500 mb-2">{error}</p>} <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mb-2" required /> <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-4" required /> <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full"> Login </button> <p className="mt-4 text-sm text-center"> No account? <a href="/register" className="text-green-700">Register</a> </p> </form> </div> ); };

export default Login;

// greenvest-frontend/src/pages/Register.js import React, { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import axios from 'axios';

const Register = () => { const navigate = useNavigate(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');

const handleRegister = async (e) => { e.preventDefault(); try { await axios.post('https://greenvest-api.fly.dev/api/register', { email, password }); navigate('/'); } catch (err) { setError('Registration failed. Try again.'); } };

return ( <div className="min-h-screen flex items-center justify-center"> <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-full max-w-md"> <h2 className="text-xl font-bold mb-4">Register</h2> {error && <p className="text-red-500 mb-2">{error}</p>} <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mb-2" required /> <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-4" required /> <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full"> Register </button> <p className="mt-4 text-sm text-center"> Already have an account? <a href="/" className="text-green-700">Login</a> </p> </form> </div> ); };

export default Register;

