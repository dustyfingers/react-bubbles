import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = evt => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
  };

  const login = async evt => {
    evt.preventDefault();
    try {
      let { data } = await axios.post('http://localhost:5000/api/login', credentials);
      localStorage.setItem('authToken', data.payload);
    } catch (err) {
      console.error(err.message);
    }

  }

  return (
    <div>
      LOGIN COMPONENT
            <form onSubmit={login}>
        Username:
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={evt => handleChange(evt)} />
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={evt => handleChange(evt)} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login