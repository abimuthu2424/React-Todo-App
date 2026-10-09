import React, { useState } from "react";
import { toast } from 'react-toastify';

const Todo = ()=>{

    let [item, setItem] = useState("");

    let [items, setItems] = useState([]);

    let [editIndex, setEditIndex] = useState(null);

    let handleClick = ()=>{

        item = item.trim()

        if (items.includes(item))
        {
            return toast.warning("Task Already Present in List", {autoClose:800});
        }

        if (item === "")
        {
            return toast.warning("Please Enter Something", {autoClose:800});
        }

        if (editIndex == null)
        {
            setItems([...items,item]);
            toast.success("Item Added Successfully", {autoClose:800});
        }

        else{
            let newValues = [...items];
            newValues[editIndex] = item;
            setItems(newValues);
            setEditIndex(null)
            toast.success("Item Updated Successfully", {autoClose:800});
        }
        setItem("")
    }

    let handleDelete = (index)=>{
        let newItems = items.filter((newitem,ind)=> ind !== index);
        setItems(newItems)
        return toast.warning("Task deleted Successfully", {autoClose:800});
    }

    let handleEdit = (index)=>{

        setEditIndex(index)
        setItem(items[index])
    }

    return(
        <div className="todo-outer">

        <header>
            <h1>Todo App</h1>

            <div className="input-container">
                <input type="text" placeholder="Enter Your Tasks" value={item} onChange={(e)=>setItem(e.target.value)} />
                <button onClick={handleClick}>{editIndex == null ? "Add" : "Update"}</button>
            </div>
        </header>

        <main className="tasks-container">
            <ul>
                {
                    items.length > 0 ?
                    items.map((ele,index)=>{
                        return (
                        <div className="data-container" key={index}>
                        <li>{ele}</li>
                        <button onClick={()=>handleEdit(index)}>Edit</button>
                        <button onClick={()=>handleDelete(index)}>Delete</button>
                        </div>

                        )
                    })
                    :
                    <li>No Tasks Found</li>
                }
            </ul>
        </main>
        </div>
    )
}

export default Todo