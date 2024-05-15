import React, {  useState } from "react";

import Popup from "../../components/Popup";

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Invalid username & password combination');
    const [visible, setVisible] = useState(false);
    

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const data = await response.json();
            console.log(data.token);
            if (!data.success) {
                setErrorMessage(data.message);
                setError(true);
                return;
            }
            localStorage.setItem('adminToken', data.token);
            setVisible(true); // Show the popup after successful login
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className=" h-[100vh] flex justify-center items-center">
                <div>
                    <div className="text-5xl font-medium max-w-4xl mx-auto text-center mt-5">
                        Admin Login
                    </div>
                    <div className=" mt-16 bg--500 max-w-sm mx-auto">
                        <form onSubmit={handleSubmit}>
                            <input type="text" className=" focus:bg-white my-2 w-full px-6 py-5 rounded-full bg-gray-100" placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <input type={visible ? "text" : "password"} className=" focus:bg-white my-2 w-full px-6 py-5 rounded-full bg-gray-100" placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            <div className={` ${error ? '' : 'hidden'} ml-1 mt-1 text-red-600`}>
                                <span className="text-white bg-red-600 rounded-full px-2">!</span> {errorMessage}
                            </div>
                            <button
                                type="submit"
                                disabled={username === '' || password === ''}
                                className="w-full text-center px-6 py-5 disabled:bg-zinc-500 rounded-full bg-black text-white my-5 transform active:scale-95 transition duration 300 ease-in-out" >Submit</button>
                        </form>
                    </div>
                </div>
            </div >
            {visible && <Popup />}
        </>
    );
}
