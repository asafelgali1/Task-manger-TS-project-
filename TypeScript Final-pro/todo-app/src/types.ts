export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;  
}

export interface Quote {
  content: string;
  author: string;
}
