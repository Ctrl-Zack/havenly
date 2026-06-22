export type Subtask = {
  id: string;
  text: string;
};

export type TaskInfo = {
  id: string;
  title: string;
  subtitle: string;
};

export const ALL_TASKS_INFO: TaskInfo[] = [
  { id: '1', title: 'Final Project Human Computer Interaction', subtitle: 'Create UI/UX Design.' },
  { id: '2', title: 'ITS Website Migration', subtitle: 'Update Wordpress site.' },
  { id: '3', title: 'Final Project Database Management', subtitle: 'Create Backend implementation.' },
  { id: '4', title: 'Prepare Midterm Materials', subtitle: 'Review all materials.' },
  { id: '5', title: 'Finish UI/UX Design Mockups', subtitle: 'Continue develop the dashboard page.' }
];

// Initial multi-task subtasks map
let taskMap: Record<string, Subtask[]> = {
  '1': [
    { id: '1_1', text: 'Research references for Havenly app' },
    { id: '1_2', text: 'Create wireframe sketch for home screen' },
    { id: '1_3', text: 'Design high-fidelity UI in Figma' },
    { id: '1_4', text: 'Collect feedback from group members' }
  ],
  '2': [
    { id: '2_1', text: 'Back up database and WordPress files' },
    { id: '2_2', text: 'Install migration plugin on source site' },
    { id: '2_3', text: 'Set up the destination hosting server' },
    { id: '2_4', text: 'Run the migration script and test links' }
  ],
  '3': [
    { id: '3_1', text: 'Design database schema diagram' },
    { id: '3_2', text: 'Set up PostgreSQL database server' },
    { id: '3_3', text: 'Implement API endpoints in Backend server' },
    { id: '3_4', text: 'Test CRUD operations using Postman' }
  ],
  '4': [
    { id: '4_1', text: 'Gather lecture slide PDFs and notes' },
    { id: '4_2', text: 'Read and summarize chapter 1 to 4' },
    { id: '4_3', text: 'Practice past exam question sheets' },
    { id: '4_4', text: 'Discuss complex topics with study group' }
  ],
  '5': [
    { id: '5_1', text: 'Open the Figma design workspace' },
    { id: '5_2', text: 'Refine layout alignment of dashboard cards' },
    { id: '5_3', text: 'Apply consistent font sizing styles' },
    { id: '5_4', text: 'Review visual consistency across screens' }
  ]
};

let lastFocusDuration: number = 1500;
let lastFocusTaskId: string = '1';

let listeners: (() => void)[] = [];

export const taskStore = {
  getTasks(taskId: string = '1') {
    if (!taskMap[taskId]) {
      // Default fallback tasks
      taskMap[taskId] = [
        { id: `${taskId}_1`, text: 'Open the document' },
        { id: `${taskId}_2`, text: 'Read the last paragraph written' },
        { id: `${taskId}_3`, text: 'Write for 5 minutes' },
        { id: `${taskId}_4`, text: 'Review the paragraph' }
      ];
    }
    return taskMap[taskId];
  },
  setTasks(newTasks: Subtask[], taskId: string = '1') {
    taskMap[taskId] = newTasks;
    this.notify();
  },
  removeFirstTask(taskId: string = '1') {
    const list = taskMap[taskId] || [];
    if (list.length > 0) {
      taskMap[taskId] = list.slice(1);
      this.notify();
    }
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  notify() {
    listeners.forEach(l => l());
  },
  getNextUnfinishedTask(currentTaskId: string): TaskInfo | null {
    const currentIndex = ALL_TASKS_INFO.findIndex(t => t.id === currentTaskId);
    if (currentIndex === -1) return null;

    for (let i = 1; i < ALL_TASKS_INFO.length; i++) {
      const idx = (currentIndex + i) % ALL_TASKS_INFO.length;
      const task = ALL_TASKS_INFO[idx];
      const subtasks = this.getTasks(task.id);
      if (subtasks.length > 0) {
        return task;
      }
    }
    return null;
  },

  // Focus Timer States
  getLastFocusState() {
    return {
      duration: lastFocusDuration,
      taskId: lastFocusTaskId,
    };
  },
  setLastFocusState(duration: number, taskId: string) {
    lastFocusDuration = duration;
    lastFocusTaskId = taskId;
    this.notify();
  }
};
