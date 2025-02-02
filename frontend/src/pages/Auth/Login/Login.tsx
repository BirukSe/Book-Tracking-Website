import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://book-tracking-website-2.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (!result.token) {
        setError('Login failed, please check your credentials and try again.');
        return;
      }
      

      // Store the token in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user)); // Optionally store the user info too
      const { token, role } = result;
      console.log("my role is " ,role)
      if (role === 'admin') {
        localStorage.setItem('admin', token);
        console.log("my token for admin is",token);
        navigate('/admin');  // Redirect to admin page
      }
      else{
        console.log("my token is ",localStorage.getItem('token'));
      
      navigate('/');

      }

      // Redirect to the home page or protected route after login
      
    } catch (error) {
      setError('Login failed, please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex bg-gray-800 rounded-lg">
      <div className="w-full sm:w-[50%] ml-0">
        <img src="read.jpg" className="h-vh w-[100%] sm:block hidden" />
      </div>
      <div className="flex flex-col items-center justify-center text-white sm:w-[50%] w-full mr-7">
        <h1 className="mb-14 font-extrabold">Login</h1>
        {error && <h1 className="italic text-red-500 text-[8px]">{error}</h1>}
        <input
          placeholder="Email"
          type="email"
          className="border-2 border-white rounded mb-3 pacifico"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder="Password"
          type="password"
          className="border-2 border-white rounded mb-3 pacifico"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="text-[10px] mr-19">
          Don't have an account?{' '}
          <a href="/signup" className="underline text-blue-500">
            signup
          </a>
        </p>
        <button
          className="bg-green-500 rounded px-3 cursor-pointer hover:bg-green-800"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
