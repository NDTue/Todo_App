import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoItem.scss';

TodoItem.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggleStatus: PropTypes.func.isRequired,
};

function TodoItem({ task, index, onUpdate, onRemove, onToggleStatus }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    // Khi nhấn Save (Enter) hoặc mất focus, cập nhật tiêu đề
    const handleSave = (e) => {
        if (e) e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện, tránh việc reload trang nếu là form.
    
        if (newTitle.trim()) { // Kiểm tra nếu tiêu đề mới không rỗng (sau khi xóa khoảng trắng).
            onUpdate(newTitle, index); // Gọi hàm cập nhật task với tiêu đề mới.
        } else {
            setNewTitle(task.title); // Nếu tiêu đề mới rỗng, giữ nguyên tiêu đề cũ.
        }
        setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa.
    };
    
    const handleBlur = (e) => {
        // Kiểm tra xem người dùng có click vào nút Save không trước khi blur (mất tiêu điểm).
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('btn-success')) {
            handleSave(); // Nếu không phải click vào nút Save, tự động lưu nội dung.
        }
    };
    

    // Khi nhấn ESC thì thoát chỉnh sửa
    const handleCancelEdit = (e) => {
        if (e.key === 'Escape') {
            setIsEditing(false);
            setNewTitle(task.title);
        }
    };

    return (
        <li className="task-item mb-2 list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center w-100">
                {/* Ô checkbox */}
                <input 
                    type="checkbox" 
                    className="form-check-input me-3 fs-5 border-2"
                    checked={task.status === 'completed'} 
                    onChange={() => onToggleStatus(index)} // Gọi hàm thay đổi trạng thái task
                />

                {/* Nếu đang chỉnh sửa, hiển thị input */}
                {isEditing ? (
                    <input 
                        type="text" 
                        className="task-input__editing form-control flex-grow-1"
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleBlur} 
                        onKeyUp={(e) => e.key === 'Enter' && handleSave()} 
                        onKeyDown={handleCancelEdit} 
                        autoFocus
                    />
                ) : (
                    <span 
                        className={classNames('task-text fs-5 w-100 text-start ms-3 flex-grow-1', 
                            { 'done': task.status === 'completed' }
                        )}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            {/* Buttons */}
            <div className='ms-3 d-flex flex-nowrap'>
                {isEditing ? (
                    <button className="btn btn-success me-2" onClick={handleSave}>
                        <i class="fa-solid fa-check-double"></i>
                    </button>
                ) : (
                    <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>
                        <i class="fa-solid fa-pen-to-square text-white"></i>
                    </button>
                )}

                <button className="btn btn-danger" onClick={() => onRemove(index)}>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
