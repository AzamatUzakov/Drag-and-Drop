import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

interface ProductProps {

}

const Product: React.FC<ProductProps> = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [todo, setTodo] = useState(null)
    useEffect(() => {
        fetch(`http://localhost:8080/todos/${id}`)
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [id])
    console.log(todo);


    let columns = ""
    if (todo?.column === "1") {
        columns = "Todo"
    } else if (todo?.column === "In Progress") {
        columns = "In Progress"
    } else {
        columns = "Done"

    }

    return (

        <>
            <h1 className="text-center text-2xl">Задача</h1>

            <div className="flex items-center justify-center h-full bg-gray-100 p-4 relative">
                <TiArrowBack className="absolute top-2 left-2 cursor-pointer" size={"40px"}
                onClick={()=> navigate("/")}
                />

                <div className="bg-white shadow-2xl rounded-2xl p-6 w-80">
                    <div className="h-32 rounded-lg shadow-md" style={{ backgroundColor: '#4ecdc4' }}>
                        <h1>{todo?.title}</h1>
                        <p>{todo?.description}</p>
                        <p>{columns}</p>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Product;