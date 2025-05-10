import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../TaskList';
import axiosInstance from '../../../utils/axiosInstance';

// Mock modules
jest.mock('../../../utils/axiosInstance');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TaskList Component', () => {
  const mockPendingTasks = [
    { id: 1, name: 'Task 1', description: 'Desc 1', status: 'pending' },
    { id: 2, name: 'Task 2', description: 'Desc 2', status: 'pending' }
  ];
  
  const mockCompletedTasks = [
    { id: 3, name: 'Task 3', description: 'Desc 3', status: 'completed' }
  ];

  const mockOnTaskDeleted = jest.fn();

  beforeEach(() => {
    axiosInstance.delete.mockResolvedValue({});
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('renders task tables', () => {
    render(<TaskList pendingTasks={mockPendingTasks} completedTasks={mockCompletedTasks} onTaskDeleted={mockOnTaskDeleted} />);
    
    expect(screen.getByText('Pending Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  test('shows delete confirmation modal', () => {
    render(<TaskList pendingTasks={mockPendingTasks} completedTasks={mockCompletedTasks} onTaskDeleted={mockOnTaskDeleted} />);
    
    fireEvent.click(screen.getAllByLabelText('Delete')[0]);
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
  });

  test('deletes task and shows toast', async () => {
    render(<TaskList pendingTasks={mockPendingTasks} completedTasks={mockCompletedTasks} onTaskDeleted={mockOnTaskDeleted} />);
    
    // Open delete modal
    fireEvent.click(screen.getAllByLabelText('Delete')[0]);
    // Confirm deletion
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledWith('/tasks/1');
      expect(mockOnTaskDeleted).toHaveBeenCalled();
      expect(sessionStorage.getItem('taskDeleteSuccess')).toBe('true');
    });
  });

  test('handles delete error', async () => {
    axiosInstance.delete.mockRejectedValue(new Error('Delete failed'));
    
    render(<TaskList pendingTasks={mockPendingTasks} completedTasks={mockCompletedTasks} onTaskDeleted={mockOnTaskDeleted} />);
    
    fireEvent.click(screen.getAllByLabelText('Delete')[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(screen.getByText('Failed to delete task')).toBeInTheDocument();
    });
  });
});