import React, { useEffect, useState } from "react";
/*
    const [task, setTask] = useState([]);
    const [valueInput, setValueInput] = useState('');

    console.log(task.length);
    const handleSubmit =(event)=>{
        event.preventDefault();
    }

    const handleAddItemList = (event) => {
        if (event.key == "Enter") {
            if (valueInput.trim() !== "") {
                setTask([...task, valueInput])
                setValueInput('');
            }
        }
    }

    const handleAddTask = (event) => {
        setValueInput(event.target.value);
    }

    const deleteTask = (item) => {
        setTask(task.filter((element) => element !==item))
    }

    return (
        <div className="container">
            <h1>Escribe una tarea</h1>
            <form className="justify-content-center" onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-center">
                    <input type="text" className="form-control" id="exampleInputEmail1" value={valueInput} onChange={handleAddTask} onKeyPress={handleAddItemList} />
                </div>
                <div className="row d-flex justify-content-center">
                    <ul className="list-group col-xs-3 col-md-6">
                        <h4 className={task.length == 0 ? "" : "d-none"}>No hay task pendientes</h4>
                        {task.map((task,i) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center botonX" key={i}>
                                {task}
                                <span onClick={() =>deleteTask(task)}>
                                    <i className="fas fa-trash text-danger"></i>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-xs-auto col-md-6 text-end mt-3">{task.length} task</div>
                </div>
            </form>
        </div>
    );

*/


export const Lista = () => {

    const [valueInput, setValueInput] = useState('');
    const [todo, setTodo] = useState([]);
    //editar una tarea

    const host = 'https://playground.4geeks.com/todo';
    const user = 'Javi_Pruebas';



    const handleSubmit = (event) => {
        event.preventDefault();
        if (valueInput.trim() !== "") {
            const dataToSend = {
                label: valueInput,
                is_done: false,
            }
            createTask(dataToSend);
            setValueInput('');
        }
    }


    const getList = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'GET'
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error:', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);
        return data
    }
    const createUser = async () => {
        const uri = `${host}/users`;
        const createNewUser = {
            username: { user }
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createNewUser)
        };
        try {
            const data = await response.json()
            const response = await fetch(uri, options);
            if (!response.ok) {
                console.log('Error:', response.status, response.statusText);
                //response.status === 404 ? return data : return console.log('Error en la aplicación');
                if (response.status === 404) {
                    console.log("Creando user");
                    return data;
                }
                return;
            }
            return data;
        } catch (error) {
            console.log('Fetch error:', error);
            return;
        }
    }

    const createTask = async (data) => {
        const uri = `${host}/todos/${user}`;
        const options = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(uri, options)
        console.log(response);
        const data2 = await response.json()
        //setTodo([...todo,data])-->opcion 1
        getList();//-->opcion 2
    };


    const deleteTask = async (id) => {
        const uri = `${host}/todos/${id}`;
        const opstions = {
            method: 'DELETE'
        }
        const response = await fetch(uri, opstions);
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
        }
        //const data = await response.text();
        getList()
    }

    const updateTask = async (id) => {
        const uri = `${host}/todos/${id}`
        const change = {
            "label": valueInput,
            "is_done": false
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(change),
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error:', response.status, response.statusText);
            return
        }
        const data = await fetch(uri, options);
        getList()
        return data;
    }


    useEffect(() => {
        getList();
    }, [])


    // id: 19
    // ​​
    // is_done: false
    // ​​
    // label: "Tarea1"
    /*const storedData = localStorage.getItem('"deletedTasks');
    const storedData = localStorage.setItem('"deletedTasks'); */
    return (
        <div className="container">
            <form className="justify-content-center" onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-center">
                    <input type="text" className="form-control" id="exampleInputEmail1" value={valueInput} onChange={(event) => setValueInput(event.target.value)} placeholder="Task" />
                </div>
                <h4 className={todo.length == 0 ? "" : "d-none"}>El usuario {user}, no tiene tareas pendientes</h4>

                <ul className="list-group mt-3">
                    {todo.map((item) =>
                        <li className="list-group-item d-flex justify-content-between" key={item.id}>
                            {item.label}
                            {/* <input type="text" className="form-control" id="exampleInputEmail1" value={valueInput} onChange={(event) => setValueInput(event.target.value)} placeholder="Task"/> */}
                            <button type="button" onClick={() => updateTask(item.id)} className="btn btn-primary"><i className="fas fa-edit"></i></button>
                            <button type="button" onClick={() => deleteTask(item.id)} className="btn btn-primary"><i className="fas fa-trash"></i></button>
                        </li>
                    )
                    }
                </ul>

            </form>
        </div>
    );
};