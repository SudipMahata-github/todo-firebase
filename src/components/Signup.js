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

const Signup = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            console.log("email and password here" + email, password)
            toast({
                title: res.user.email,
                description: `Account Created Succesfully`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                navigate('/login')
            }, 3000)

        } catch (error) {
            toast({
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top"
            })
        }
    }







    return (
        <>

            <Box display={"flex"} justifyContent="center">
                <Box width={"100%"} padding="30px" >

                    <Heading textAlign={"center"}>Please Signup</Heading>
                    <Box textAlign="center" display={"flex"} justifyContent="center" height={"70vh"} alignItems="center">
                        <Box width={"30%"} height="60vh" display="flex" justifyContent={"center"} alignItems="center" border="1px solid #9fa8da" borderRadius={"10%"}>
                            <form action="" onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>

                                <FormControl textAlign={"center"} width="90%" marginLeft={"4%"} >
                                    <FormLabel>Email address</FormLabel>
                                    <Input type='email' placeholder='Enter your email' value={email}
                                        onChange={(e) => setEmail(e.target.value)} />

                                    <FormLabel marginTop="20px" >Password</FormLabel>
                                    <Input type='password' placeholder='Enter your password' value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </FormControl>
                                <Button type='submit' marginTop={"30px"} backgroundColor="#5c6bc0" color={"white"} _hover={{ color: "black" }}> Signup</Button>
                            </form>
                        </Box>


                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default Signup