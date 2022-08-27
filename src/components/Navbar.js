import React from 'react'
import { Box, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"


const Navbar = ({ user }) => {
    const navigate = useNavigate()
    return (
        <>
            <Box width={"100%"} backgroundColor="#e8eaf6" display={"flex"} height="50px" alignItems={"center"} padding="10px">
                <Box display={"flex"} flex="1" fontWeight={"bold"} fontSize="25px">
                    <Link to={"/"}>Todos</Link>
                </Box>

                <Box marginRight="10%">

                    {
                        user ? <Button backgroundColor={"#e91e63"} color="white" _hover={'disable'} marginLeft="10px"
                            onClick={() => {
                                auth.signOut()
                                navigate('/login')
                            }}>Logout</Button>
                            : <Box fontSize={"18px"} fontWeight="bold">
                                <Link to="/login">Login</Link>
                                <Link to="/signup" style={{ marginLeft: "20px" }}>SignUp</Link>
                            </Box>
                    }


                </Box>
            </Box>
        </>
    )
}

export default Navbar
