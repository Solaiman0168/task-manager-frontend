import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList', () => {
  const mockPendingTasks = [
    { id: 1, name: 'Pending Task 1', description: 'Description 1', status: 'pending' },
  ];

  const mockCompletedTasks = [
    { id: 2, name: 'Completed Task 1', description: 'Description 2', status: 'completed' },
  ];

  it('renders pending and completed tasks', () => {
    render(
      <TaskList 
        pendingTasks={mockPendingTasks} 
        completedTasks={mockCompletedTasks} 
        onTaskDeleted={() => {}}
      />
    );

    expect(screen.getByText('Pending Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('Pending Task 1')).toBeInTheDocument();
    expect(screen.getByText('Completed Task 1')).toBeInTheDocument();
  });
});