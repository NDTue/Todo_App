import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem'; 

TodoList.propTypes = {
    tasks: PropTypes.array.isRequired,  // tasks là mảng các task
    onUpdate: PropTypes.func.isRequired, // Hàm cập nhật tiêu đề task
    onRemove: PropTypes.func.isRequired, // Hàm xóa task
    onToggleStatus: PropTypes.func.isRequired, // Hàm thay đổi trạng thái task
};

function TodoList({ tasks, onUpdate, onRemove, onToggleStatus }) {
    return (
        <ul className='list-group mt-4 list-unstyled'>
            {/* Duyệt qua từng task và hiển thị TodoItem */}
            {tasks.map((task, index) => (
                <TodoItem
                    key={index} 
                    index={index}
                    task={task}
                    onUpdate={onUpdate} 
                    onRemove={onRemove} 
                    onToggleStatus={onToggleStatus} 
                />
            ))}
        </ul>
    );
}

export default TodoList;
