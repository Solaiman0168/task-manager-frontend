import React from 'react';
import { Page } from '@shopify/polaris';
import TaskForm from '../components/TaskForm';
import axiosInstance from '../utils/axiosInstance';
import { startProgress, stopProgress } from '../utils/nprogress';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function CreateTaskPage() {
  useDocumentTitle('Create New Task');
  
  const handleSubmit = async (taskData) => {
    startProgress();
    try {
      await axiosInstance.post(axiosInstance.getUrl('tasks'), taskData);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    } finally {
      stopProgress();
    }
  };

  return (
    <Page title="Create New Task">
      <TaskForm onSubmit={handleSubmit} />
    </Page>
  );
}