export type Priority = 'high' | 'medium' | 'low';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  categoryId?: string;
  dueDate?: Date;
  reminder?: Date;
  completed: boolean;
  createdAt: Date;
}