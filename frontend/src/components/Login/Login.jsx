import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const image = 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png';
  const navigate = useNavigate();

  const [currState, setCurrState] = useState('Login');
  const [signUp, setSignUp] = useState({
    username: '',
    email: '',
    password: ''
  });

  const toggle = () => {
    setCurrState(currState === 'Sign up' ? 'Login' : 'Sign up');
  };

  const onChangeInputHandler = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    if (currState === 'Sign up') {
      const res = await axios.post('http://localhost:3000/api/user/register', signUp);
      alert('Signup successful!');
      setCurrState('Login');
    } else {
      const res = await axios.post('http://localhost:3000/api/user/login', {
        email: signUp.email,
        password: signUp.password
      });

      if (res.data.success) {
  localStorage.setItem('token', res.data.token);
  navigate('/');
} else {
  alert(res.data.message || 'Login failed');
}
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.response?.data?.message || 'Authentication failed');
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <img className="login-img" src={image} alt="" />
        <h2>{currState}</h2>

        {currState === 'Sign up' && (
          <input
            onChange={onChangeInputHandler}
            name="username"
            type="text"
            placeholder="Username"
          />
        )}

        <input
          onChange={onChangeInputHandler}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={onChangeInputHandler}
          name="password"
          type="password"
          placeholder="Password"
        />

        <button onClick={handleSubmit}>{currState}</button>

        <p>
          {currState === 'Sign up'
            ? 'Already have an account?'
            : 'Don’t have an account?'}
        </p>

        <span onClick={toggle}>
          {currState === 'Sign up' ? 'Login' : 'Sign up'}
        </span>
      </div>
    </div>
  );
};

export default Login;
