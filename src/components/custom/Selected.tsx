import React, { useContext, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface SelectProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Selected: React.FC<SelectProps> = ({ setModal }) => {

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setModal(false)


        const fm = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(fm.entries());
        console.log(data);

        try {
            const res = await fetch("http://localhost:8080/todos", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (res.ok) {
                setModal(false)
            }
        } catch (e) {
            console.log(e);
        }

    }


    const closeBtn = () => {
        setModal(false)


    }
    return (
        <div  >
            <div className="w-full inset-0 fixed h-screen bg-white/30 backdrop-blur-md z-10 flex items-center justify-center "

            >

                <form onSubmit={onSubmit}>

                    <Card className="w-[400px] relative">
                        <button className="absolute top-1 right-4 text-2xl cursor-pointer"
                            onClick={() => closeBtn()}
                        >&times;</button>

                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Добавьте Task</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Описание задачки</p>
                            <Textarea className="mb-4" name="title" />

                            <Select name="column">                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="column" />
                            </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Todo</SelectItem>
                                    <SelectItem value="2">In Progress</SelectItem>
                                    <SelectItem value="3">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>

                        <CardFooter>
                            <Button className="text-center mx-auto">Добавить</Button>
                        </CardFooter>
                    </Card>



                </form>

            </div >


        </div >
    );
}

export default Selected;