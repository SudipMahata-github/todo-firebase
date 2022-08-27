
// import { auth, db } from "./firebase"

import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import { useState, useEffect } from "react"
import { auth } from "./firebase"



function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })

    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path="/" exact element={<Todo user={user} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
