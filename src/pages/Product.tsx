import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { MdCancel, MdEdit } from "react-icons/md";

interface ProductProps {
    id?: string
    title?: string
    description?: string
    column?: string
    onClick?: () => void    
}

const Product: React.FC<ProductProps> = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [todo, setTodo] = useState<ProductProps | null>(null)
    useEffect(() => {
        fetch(`http://localhost:8080/todos/${id}`)
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [id])
    console.log(todo);


    let columns: string = ""
    if (todo?.column === "1") {
        columns = "Todo"
    } else if (todo?.column === "2") {
        columns = "In Progress"
    } else {
        columns = "Done"

    }


    const removeTask = async (id:string) => {
        try {
            const res = await fetch(`http://localhost:8080/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.ok) {
                setTodo(null);
            } else {
                console.error("Ошибка удаления задачи:", res.status);
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
        }
    };



    return (

        <>
            <h1 className="text-center text-2xl">Задача</h1>

            <div className="flex items-center justify-center h-full bg-gray-100 p-4 relative rounded-2xl">
                <TiArrowBack className="absolute top-2 left-2 cursor-pointer" size={"40px"}
                    onClick={() => navigate("/")}
                />
                <div>
                    <div className="flex justify-around mb-2">
                        <MdEdit color="green" size={"30px"} className="cursor-pointer" />

                        <MdCancel color="red" size={"30px"} className="cursor-pointer" onClick={() => {
                            navigate("/")
                            removeTask(todo?.id as string)
                        }} />

                    </div>
                    <div className="bg-white shadow-2xl rounded-2xl p-6 w-80">
                        <div className="h-32 rounded-lg shadow-md flex flex-col justify-center items-center p-4 text-white" style={{ backgroundColor: '#4ecdc4' }}>
                            <h1 className="text-lg font-bold">{todo?.title}</h1>
                            <p className="text-[14px] mt-2 opacity-80 text-green-800 font-medium flex items-center gap-1">
                                <b className="text-[15px] text-black font-semibold">Status:</b>
                                <span className="bg-green-200 text-green-900 px-2 py-1 rounded-md shadow-sm">{columns}</span>
                            </p>                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;