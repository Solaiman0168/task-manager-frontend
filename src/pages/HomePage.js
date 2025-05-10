import React, { useState, useEffect } from 'react';
import { Page, Button, TextField, Box } from '@shopify/polaris';  
import { PlusMinor } from '@shopify/polaris-icons';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { startProgress, stopProgress } from '../utils/nprogress';
import useDocumentTitle from '../hooks/useDocumentTitle'; 

export default function HomePage() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useDocumentTitle('Task Manager Application');

  const fetchTasks = async () => {
    startProgress(); 
    try {
      const response = await axiosInstance.get(axiosInstance.getUrl('tasks'));
      setPendingTasks(response.data.pendingTasks);
      setCompletedTasks(response.data.completedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      stopProgress(); 
    }
  };

  const filteredPendingTasks = pendingTasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredCompletedTasks = completedTasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Page
      title="Task Manager"
      primaryAction={<Button icon={PlusMinor} onClick={() => navigate('/create')}>Create Task</Button>}
    >
      <TextField
        label="Search tasks"
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        placeholder="Search by name or description"
        autoComplete="off"
      />
      <Box style={{ marginTop: '20px' }}>
        <TaskList
          pendingTasks={filteredPendingTasks} 
          completedTasks={filteredCompletedTasks}  
          onTaskDeleted={fetchTasks}
        />
      </Box>
      
    </Page>
  );
}