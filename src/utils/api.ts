import axios, { AxiosError } from 'axios';
import { TaskData } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const handleApiError = (error: AxiosError) => {
	const message =
		error.response?.data?.message || error.message || 'An error occurred';
	throw new Error(message);
};

export const getTasks = async () => {
	try {
		return await axios.get(API_URL);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			handleApiError(error);
		} else {
			throw new Error('An unknown error occurred');
		}
	}
};

export const createTask = async (task: TaskData) => {
	try {
		return await axios.post(API_URL, task);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			handleApiError(error);
		} else {
			throw new Error('An unknown error occurred');
		}
	}
};

export const updateTask = async (id: number, task: TaskData) => {
	try {
		return await axios.put(`${API_URL}/${id}`, task);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			handleApiError(error);
		} else {
			throw new Error('An unknown error occurred');
		}
	}
};

export const deleteTask = async (id: number) => {
	try {
		return await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			handleApiError(error);
		} else {
			throw new Error('An unknown error occurred');
		}
	}
};
