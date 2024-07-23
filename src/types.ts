export interface TaskType {
	id: number;
	title: string;
	description: string;
	date: string;
}

export interface TaskData {
	title: string;
	description: string;
	date: string;
}

export interface TaskProps {
	task: TaskType;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export interface TaskListProps {
	tasks: TaskType[];
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export interface TaskFormProps {
	task: TaskType | null;
	onSave: (task: TaskData) => void;
}
