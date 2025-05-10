import React, { useState } from 'react';
import { Page, Toast } from '@shopify/polaris';
import TaskForm from '../components/TaskForm';
import axiosInstance from '../utils/axiosInstance';
import { startProgress, stopProgress } from '../utils/nprogress';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';

export default function CreateTaskPage() {
  useDocumentTitle('Create New Task');
  const navigate = useNavigate();
  const [activeToast, setActiveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (taskData) => {
    startProgress();
    try {
      await axiosInstance.post(axiosInstance.getUrl('tasks'), taskData);
      
      // Set success toast
      setToastMessage('Task created successfully!');
      setIsError(false);
      setActiveToast(true);
      
      // Store success message in session storage to show on home page
      sessionStorage.setItem('taskCreationSuccess', 'true');
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Error creating task:', error);
      setToastMessage('Failed to create task');
      setIsError(true);
      setActiveToast(true);
      throw error;
    } finally {
      stopProgress();
    }
  };

  const toastMarkup = activeToast ? (
    <Toast content={toastMessage} onDismiss={() => setActiveToast(false)} error={isError} />
  ) : null;

  return (
    <Page title="Create New Task">
      {toastMarkup}
      <TaskForm onSubmit={handleSubmit} />
    </Page>
  );
}