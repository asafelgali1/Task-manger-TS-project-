export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;  // ✅ איחדנו את ההגדרה כך שתכלול את כל השדות
}

export interface Quote {
  content: string;
  author: string;
}
