import React, { useState } from 'react'
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
} from "@chakra-ui/react"

import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"




const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("email and password here" + email, password)
        try {
            await auth.signInWithEmailAndPassword(email, password)
            toast({
                description: ` Succesfully logged in`,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "top"
            })

            navigate('/')


        } catch (error) {
            toast({
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top"
            })
        }
    }

    return (
        <>
            <Box display={"flex"} justifyContent="center">
                <Box width={"100%"} padding="30px" textAlign={"center"}>
                    <Heading textAlign={"center"}>Please Login</Heading>
                    <Box textAlign="center" display={"flex"} justifyContent="center" height={"40vh"} alignItems="center">
                        <Box width={"100%"} display="flex" justifyContent={"center"}>
                            <form action="" style={{ width: "100%" }}>
                                <FormControl textAlign={"center"} width="40%" marginLeft={"30%"}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type='email' placeholder='Enter your email' value={email}
                                        onChange={(e) => setEmail(e.target.value)} />

                                    <FormLabel marginTop="20px" >Password</FormLabel>
                                    <Input type='password' placeholder='Enter your password' value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </FormControl>
                            </form>
                        </Box>
                    </Box>
                    <Button type="submit" onClick={(e) => handleSubmit(e)}> Login</Button>
                </Box>

            </Box>
        </>
    )
}

export default Login