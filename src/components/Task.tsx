import React from 'react';
import { TaskProps } from '../types';

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-gray-500 text-sm">{task.date}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-emerald-500 text-white px-5 py-2 rounded hover:bg-emerald-700 transition-all"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;