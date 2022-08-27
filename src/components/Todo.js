import React, { useEffect, useState } from 'react'
import { Box, Input, Heading, Button } from "@chakra-ui/react"
import { db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { DeleteIcon } from '@chakra-ui/icons'

let unsubscribe = () => {

}

const Todo = ({ user }) => {
    const [item, setItem] = useState()
    const [allTodos, setAlltodos] = useState([])
    const navigate = useNavigate()
    const handleTodo = () => {
        db.collection('todos').doc(user.uid).set({
            todos: [...allTodos, item]
        })
        setItem('')
    }

    useEffect(() => {
        if (user) {
            const docRef = db.collection('todos').doc(user.uid)
            unsubscribe = docRef.onSnapshot(docSnap => {
                if (docSnap.exists) {
                    // console.log(docSnap.data().todos)
                    setAlltodos(docSnap.data().todos)
                } else {
                    console.log("no docs available");
                }
            })

        } else {
            navigate('/login')
        }

        return () => {
            unsubscribe()
        }
    })

    const removeItem = async (del) => {
        const docRef = db.collection('todos').doc(user.uid)
        const docSnap = await docRef.get()
        const result = docSnap.data().todos.filter(item => item !== del)
        docRef.update({
            todos: result
        })

    }


    return (
        <>
            <Box width={"100%"} display={"flex"} justifyContent="center" padding={"30px"}>
                <Box width={"50%"} textAlign={"center"}>
                    <Heading>Add Todos</Heading>
                    <Box display={"flex"} alignItems={"center"} justifyContent="space-between">
                        <Input type={"text"} fontSize="20px" width={"90%"} marginTop={"20px"} onChange={(e) => setItem(e.target.value)} value={item}></Input>
                        <Button marginTop={"20px"} onClick={() => handleTodo()}>Add</Button>
                    </Box>

                    <Box height={"auto"} marginTop="20px">
                        {allTodos.map((item, i) => {
                            return <Box key={i}

                                fontWeight={"500"}
                                fontSize="20px"
                                marginTop={"5px"}
                                borderRadius="10px"
                                padding={"7px"}
                                backgroundColor="#43a047"
                                color={"white"}
                                display="flex"
                                justifyContent={"space-between"}
                            >{item} <span><DeleteIcon cursor={"pointer"} onClick={() => removeItem(item)} /></span></Box>
                        })}
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default Todo