import React, { useEffect, useState } from "react";

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
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { title } from "process";

interface EditProps {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setEditText: React.Dispatch<React.SetStateAction<string>>;
    editText: string
    id?: string
}

const Edit: React.FC<EditProps> = ({ setEdit, setEditText, editText, id }) => {

    const [localText, setLocalText] = useState(editText)

    useEffect(() => {
        setLocalText(editText)
    }, [editText])
    const closeBtn = () => {
        setEdit(false)


    }

    const upd = async () => {
        try {

            await fetch(`http://localhost:8080/todos/${id}`, {

                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: localText })
            })
            setEditText(localText)
            setEdit(false)
        } catch (e) {
            console.error("Ошибка обновления данных:", e);
        }
    }

    return (

        <>
            <div className="w-full inset-0 fixed h-screen bg-white/30 backdrop-blur-md z-10 flex items-center justify-center ">

                <form onSubmit={(e) => e.preventDefault()}>
                    
                    <Card className="w-[400px] relative">
                        <button className="absolute top-1 right-4 text-2xl cursor-pointer"
                            onClick={() => closeBtn()
                            } 
                            type="button"
                        >&times;</button>

                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Редактировать Task</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-1.5">Описание задачки</p>
                            <Input value={localText} onChange={(e) => setLocalText(e.target.value)}
                            />



                        </CardContent>

                        <CardFooter>
                            <Button className="text-center mx-auto" onClick={upd}>Добавить</Button>
                        </CardFooter>
                    </Card>



                </form>

            </div >


        </>
    );
}

export default Edit;