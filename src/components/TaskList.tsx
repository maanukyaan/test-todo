import React from 'react';
import { TaskListProps } from '../types';
import Task from './Task';

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
	return (
		<div>
			{tasks.map(task => (
				<Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
			))}
		</div>
	);
};

export default TaskList;
