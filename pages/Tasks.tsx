import React, { useState } from 'react';
import { useStore } from '../store';
import { TaskStatus, TaskPriority, Task } from '../types';
import { Plus, MoreVertical, Calendar, Flag } from 'lucide-react';

const TaskCard = ({ task, onStatusChange }: { task: Task, onStatusChange: (id: string, s: TaskStatus) => void }) => {
  const priorityColors = {
    [TaskPriority.LOW]: 'bg-blue-100 text-blue-700',
    [TaskPriority.MEDIUM]: 'bg-yellow-100 text-yellow-700',
    [TaskPriority.HIGH]: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-light-lavender hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <button className="text-gray-300 hover:text-gray-600">
          <MoreVertical size={16} />
        </button>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Calendar size={14} />
        <span>{task.dueDate}</span>
      </div>
      
      <select 
        className="w-full text-xs bg-offwhite border border-light-lavender rounded-lg py-2 px-3 text-gray-600 focus:outline-none focus:ring-1 focus:ring-purple cursor-pointer"
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
      >
        <option value={TaskStatus.TODO}>To Do</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
      </select>
    </div>
  );
};

const Tasks = () => {
  const { tasks, updateTaskStatus, addTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if(!newTaskTitle) return;
    addTask({
        id: Math.random().toString(36).substr(2, 9),
        title: newTaskTitle,
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date().toISOString().split('T')[0]
    });
    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  const Columns = ({ status, label }: { status: TaskStatus, label: string }) => {
    const filteredTasks = tasks.filter(t => t.status === status);
    return (
      <div className="flex-1 min-w-[300px]">
        <div className="flex items-center justify-between mb-4">
           <h2 className="font-bold text-gray-700">{label}</h2>
           <span className="bg-light-lavender text-purple text-xs font-bold px-2 py-1 rounded-full">
             {filteredTasks.length}
           </span>
        </div>
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={updateTaskStatus} />
          ))}
          <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full py-3 border-2 border-dashed border-light-lavender rounded-xl text-gray-400 hover:border-purple hover:text-purple transition-colors flex items-center justify-center gap-2"
          >
             <Plus size={18} />
             <span className="font-medium text-sm">Add Task</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-8">
         <div>
            <h1 className="text-2xl font-bold font-display text-black">Project Board</h1>
            <p className="text-gray-500 text-sm">Manage your tasks and track progress.</p>
         </div>
         <div className="flex gap-2">
            <button className="bg-white border border-light-lavender text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-offwhite">
                Filter
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 flex items-center gap-2"
            >
                <Plus size={16} /> New Task
            </button>
         </div>
       </div>

       <div className="flex-1 overflow-x-auto pb-4">
         <div className="flex gap-6 h-full">
            <Columns status={TaskStatus.TODO} label="To Do" />
            <Columns status={TaskStatus.IN_PROGRESS} label="In Progress" />
            <Columns status={TaskStatus.DONE} label="Completed" />
         </div>
       </div>

       {isModalOpen && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
               <h3 className="text-xl font-bold mb-4">Add New Task</h3>
               <input 
                 type="text" 
                 className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple focus:outline-none"
                 placeholder="What needs to be done?"
                 value={newTaskTitle}
                 onChange={(e) => setNewTaskTitle(e.target.value)}
                 autoFocus
               />
               <div className="flex justify-end gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:text-gray-800">Cancel</button>
                  <button onClick={handleAddTask} className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-opacity-90">Create Task</button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default Tasks;
