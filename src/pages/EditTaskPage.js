import React, { useState, useEffect } from 'react';
import { Page, Banner } from '@shopify/polaris';
import TaskForm from '../components/TaskForm';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { startProgress, stopProgress } from '../utils/nprogress';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function EditTaskPage() {
  useDocumentTitle('Edit Task');
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      startProgress();
      try {
        const response = await axiosInstance.get(axiosInstance.getUrl('tasks', id));
        setTask(response.data);
      } catch (error) {
        setError('Failed to load task. Please try again.');
        console.error('Error fetching task:', error);
      } finally {
        stopProgress();
      }
    };

    fetchTask();
  }, [id]); 

  const handleSubmit = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(axiosInstance.getUrl('tasks', id), taskData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update task. Please try again.');
      console.error('Error updating task:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Page title="Error">
        <Banner status="critical">{error}</Banner>
      </Page>
    );
  }

  if (!task) {
    return <Page title="Loading..."></Page>;
  }

  return (
    <Page title="Edit Task">
      <TaskForm 
        initialTask={task} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </Page>
  );
}