import React, { useEffect, useState } from 'react';
import { TaskData, TaskFormProps } from '../types';

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
	const [formData, setFormData] = useState<TaskData>({
		title: '',
		description: '',
		date: '',
	});

	useEffect(() => {
		if (task) {
			setFormData({
				title: task.title,
				description: task.description,
				date: task.date,
			});
		}
	}, [task]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white shadow-md rounded-lg p-4 mb-4 w-2/5'
		>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='title'
				>
					Title
				</label>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Title'
				/>
			</div>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='description'
				>
					Description
				</label>
				<textarea
					name='description'
					value={formData.description}
					onChange={handleChange}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Description'
				/>
			</div>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='date'
				>
					Date
				</label>
				<input
					type='date'
					name='date'
					value={formData.date}
					onChange={handleChange}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
			</div>
			<button
				type='submit'
				className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700'
			>
				Save
			</button>
		</form>
	);
};

export default TaskForm;
