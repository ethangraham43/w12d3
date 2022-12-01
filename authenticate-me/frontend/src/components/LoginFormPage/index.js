import * as sessionActions from '../../store/session'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './LoginForm.css';
import { Redirect } from 'react-router-dom';

const LoginFormPage = () => {
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
            
            if (data?.errors) {
                setErrors(data.errors)
            } else if (data) {
                setErrors([data]);
            } else {
                setErrors(setErrors([res.statusText]))
            }
    })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label htmlFor="credential">Username or Email</label>
                <input 
                value={credential} 
                type="text" 
                name="credential"
                onChange = {(e) => setCredential(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                 />
                 <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginFormPage