export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  tags: string[];
  completed: boolean;
};
