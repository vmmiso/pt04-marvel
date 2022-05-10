import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';


const Login = () => {
    const { handleLogin } = useAuth();

    const navigate = useNavigate();

    const usernameRef = useRef();

    const [ username, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [ username, password ])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        }

        fetch(`https://pt04.marcomiso.com/api/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(user)})
        .then(response => {
            if(response.status === 200) return response.json();
            throw new Error(response.status);
        })
        .then((response) => {
            handleLogin({ username: response.username, apiKey: response.apiKey });
            setUser('');
            setPassword('');
            setErrMsg(null);
            navigate('/', { replace: true });
        })
        .catch((err) => {
            if (err.message === "401") setErrMsg("Wrong password or username");
            else setErrMsg(err.message);
        });
    }

    return (
        <section>
            <p style={{color:'red'}}>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usernamename">Username:</label>
                <input
                    type="text"
                    id="usernamename"
                    ref={usernameRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )
}

export default Login