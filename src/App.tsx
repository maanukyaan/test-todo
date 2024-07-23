import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import WalletInfo from './components/WalletInfo';
import { TaskData, TaskType } from './types';
import { createTask, deleteTask, getTasks, updateTask } from './utils/api';

const App: React.FC = () => {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await getTasks();
			setTasks(response?.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.message || 'Error fetching tasks');
			} else {
				toast.error('An unknown error occurred');
			}
		}
	};

	const handleSaveTask = async (task: TaskData) => {
		try {
			if (currentTask) {
				await updateTask(currentTask.id, task);
				toast.success('Task updated successfully');
			} else {
				await createTask(task);
				toast.success('Task created successfully');
			}
			fetchTasks();
			setCurrentTask(null);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.message || 'Error saving task');
			} else {
				toast.error('An unknown error occurred');
			}
		}
	};

	const handleEditTask = (id: number) => {
		const taskToEdit = tasks.find(task => task.id === id);
		if (taskToEdit) {
			setCurrentTask(taskToEdit);
		}
	};

	const handleDeleteTask = async (id: number) => {
		try {
			await deleteTask(id);
			toast.success('Task deleted successfully');
			fetchTasks();
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.message || 'Error deleting task');
			} else {
				toast.error('An unknown error occurred');
			}
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center p-4 bg-cover bg-center bg-no-repeat bg-mainBg bg-fixed'>
			<Toaster position='top-right' />
			<h1 className='text-3xl font-bold mb-4 text-white'>To-Do List</h1>
			<h2 className='text-2xl font-normal mb-4 text-white'>
				Made by{' '}
				<a
					className='font-medium text-emerald-400 hover:underline'
					href='https://t.me/whoiskenshi'
				>
					@whoiskenshi
				</a>
			</h2>
			<WalletInfo />
			<TaskForm task={currentTask} onSave={handleSaveTask} />
			<TaskList
				tasks={tasks}
				onEdit={handleEditTask}
				onDelete={handleDeleteTask}
			/>
		</div>
	);
};

export default App;
