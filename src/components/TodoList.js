import React, {useState} from 'react';
import '../styles/TodoList.scss';
import ProgressBar from "./ProgressBar";

function setTodos(updatedTodos) {
    
}

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Complete registration', completed: false },
        { id: 2, title: 'Set up user profile', completed: false },
        { id: 3, title: 'Read documentation', completed: false },
        { id: 4, title: 'Attend orientation session', completed: false },
        { id: 5, title: 'Submit required forms', completed: false },
    ]);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [flag, setFlag] = useState(1);


    const weekOptions = [
        { value: 1, label: 'Onboarding' },
        { value: 2, label: 'Week 2' },
        { value: 3, label: 'Week 3' },
        { value: 4, label: 'Week 4' },
        { value: 5, label: 'Week 5' },
        { value: 6, label: 'Week 6' },
        { value: 7, label: 'Week 7' },
        { value: 8, label: 'Week 8' }
        // Add more week options as needed
    ];

    const handleWeekChange = (e) => {
        const week = parseInt(e.target.value);
        setSelectedWeek(week);
        // Fetch tasks for the selected week from the server or a data source
        // and set the tasks using setTodos
        // Example:
        // const tasksForSelectedWeek = fetchTasksForWeek(week);
        const tasks1Set = [
            { id: 1, title: 'Complete registration', completed: false },
            { id: 2, title: 'Set up user profile', completed: false },
            { id: 3, title: 'Read documentation', completed: false },
            { id: 4, title: 'Attend orientation session', completed: false },
            { id: 5, title: 'Submit required forms', completed: false },
        ];
        const tasks2Set =
                [{ id: 1, title: 'Task 1', completed: false },
            { id: 2, title: 'Task 2', completed: false },
            { id: 3, title: 'Task 3', completed: false },
            { id: 4, title: 'Task 4', completed: false },
            { id: 5, title: 'Task 5', completed: false }];
        if(flag===1) {
            setTodos(tasks1Set);
            setFlag(2);
        } else {
            setTodos(tasks2Set);
            setFlag(1);
        }
    };

    const handleToggle = (id) => {
        // Update the completion status of the task
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        // Update the todos state
        setTodos(updatedTodos);
        const completedCount = todos.filter((todo) => todo.completed).length;
        const totalTodos = 5;
        const completionPercentage = (completedCount / totalTodos) * 100;
    };

    // Calculate the completion percentage
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalTodos = todos.length;
    const completionPercentage = (completedCount / totalTodos) * 100;


    return (
        <div className="todo-list">
            <h2>Onboarding To-Do List</h2>
            <ProgressBar percentage={completionPercentage} />
            <div className="week-dropdown">
                <label htmlFor="week-select">Select Week:</label>
                <select
                    id="week-select"
                    value={selectedWeek}
                    onChange={handleWeekChange}
                >
                    {weekOptions.map((week) => (
                        <option key={week.value} value={week.value}>
                            {week.label}
                        </option>
                    ))}
                </select>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={todo.completed ? 'completed' : ''}
                        onClick={() => handleToggle(todo.id)}
                    >
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );

    // return (
    //     <div className="todo-list">
    //         <h2>Todo List</h2>
    //         <ul>
    //             {todos.map((todo) => (
    //                 <li
    //                     key={todo.id}
    //                     className={todo.completed ? 'completed' : ''}
    //                     onClick={() => handleToggle(todo.id)}
    //                 >
    //                     {todo.title}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default TodoList;
