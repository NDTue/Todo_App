import React, { useState } from 'react'; 
import TodoList from './TodoList/TodoList';
import './styles.css'; 

function Todo() {
    // State lưu trữ giá trị input từ người dùng
    const [job, setJob] = useState('');

    // State lưu trữ danh sách task, lấy từ localStorage nếu có, nếu không thì khởi tạo mảng rỗng
    const [filter, setFilter] = useState('ALL'); // State lưu trạng thái lọc task
    const [tasks, setTasks] = useState(() =>
        JSON.parse(localStorage.getItem('tasks')) ?? [] // Lấy tasks từ localStorage nếu có, nếu không thì là mảng rỗng
    );

    // Hàm xử lý thêm task mới
    const handleSubmit = () => {
        if (job.trim()) { // Nếu giá trị rỗng
            setTasks(prevTasks => { // Cập nhật state tasks
                const newTask = [   // Thêm task mới với trạng thái là active
                    ...prevTasks, 
                    { title: job, status: 'active' }
                ]; 
                localStorage.setItem('tasks', JSON.stringify(newTask)); // Lưu vào localStorage
                return newTask; 
            });
        }
        setJob(''); // Xóa nội dung input sau khi thêm task
    };

    // Hàm cập nhật tiêu đề của task
    const handleUpdate = (newTitle, index) => {
        setTasks(prevTasks => {
            const newTask = [...prevTasks]; // Tạo bản sao của mảng task cũ
            newTask[index].title = newTitle; // Cập nhật tiêu đề task tại vị trí index
            localStorage.setItem('tasks', JSON.stringify(newTask)); // Lưu vào localStorage
            return newTask; 
        });
    };

    // Hàm xóa task
    const handleRemove = (index) => {
        setTasks(prevTasks => {
            const newTask = prevTasks.filter((task, i) => i !== index); // Lọc bỏ task tại index
            localStorage.setItem('tasks', JSON.stringify(newTask)); // Lưu vào localStorage
            return newTask; // Trả về mảng task đã xóa
        });
    };

    // Hàm thay đổi trạng thái của task
    const handleToggleStatus = (index) => {
        setTasks(prevTasks => {
            const newTaskList = [...prevTasks]; // Tạo bản sao mảng tasks
            // Tạo object mới cho task đang được thay đổi
            newTaskList[index] = {
                ...newTaskList[index],
                status: newTaskList[index].status === 'active' ? 'completed' : 'active'
            };
            localStorage.setItem('tasks', JSON.stringify(newTaskList)); // Lưu vào localStorage
            return newTaskList; // Trả về mảng tasks với trạng thái mới
        });
    };

    // Lọc tasks theo trạng thái
    const filteredTasks = tasks.filter(task => {
        if (filter === 'ALL') return true; // Hiển thị tất cả task nếu filter là 'ALL'
        return task.status === filter; // Lọc task theo trạng thái
    });

    return (
        <div className='container-fluid container-md mt-5'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8'>
                    <h1 className='text-primary text-decoration-underline text-center mb-4'>My Todo-s</h1>

                    <div className='todo-container'>
                        <form className='d-flex rounded mb-4 bg-white justify-content-between align-items-center shadow flex-column flex-sm-row p-2'>
                            <div className='w-100 rounded bg-light p-2 d-flex flex-column flex-sm-row mb-2 mb-sm-0'>
                                <input id='todo-input'
                                    className='fs-5 border-0 flex-grow-1 px-3 py-2'
                                    type="text"
                                    placeholder='New task...'
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)}
                                    onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
                                />
                                <button type="button" className='btn btn-primary ms-0 ms-sm-3 mt-2 mt-sm-0 btn-lg' onClick={handleSubmit}>
                                    ADD
                                </button>
                            </div>
                        </form>

                        {/* Filter Buttons */}
                        <div className="btn-group d-flex flex-wrap mb-4">
                            <button className={`btn btn-${filter === 'ALL' ? 'primary' : 'outline-primary'} flex-grow-1`} 
                                onClick={() => setFilter('ALL')}
                            >
                                ALL
                            </button>
                            <button className={`btn btn-${filter === 'active' ? 'primary' : 'outline-primary'} flex-grow-1`} 
                                onClick={() => setFilter('active')}
                            >
                                ACTIVE
                            </button>
                            <button className={`btn btn-${filter === 'completed' ? 'primary' : 'outline-primary'} flex-grow-1`} 
                                onClick={() => setFilter('completed')}
                            >
                                COMPLETED
                            </button>
                        </div>

                        <TodoList
                            tasks={filteredTasks}
                            onUpdate={handleUpdate}
                            onRemove={handleRemove}
                            onToggleStatus={handleToggleStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
