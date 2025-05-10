import React, { useState } from 'react';
import { 
  Card, 
  DataTable, 
  Button, 
  Badge, 
  Pagination, 
  Tooltip, 
  Toast,
  Modal,
  TextContainer,
  Box
} from '@shopify/polaris';
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export default function TaskList({ pendingTasks, completedTasks, onTaskDeleted }) {
  const navigate = useNavigate();
  
  // Pagination state
  const [pendingPage, setPendingPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Toast state
  const [activeToast, setActiveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isErrorToast, setIsErrorToast] = useState(false);

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(axiosInstance.getUrl('tasks', taskToDelete));
      onTaskDeleted();
      
      // Set success toast
      setToastMessage('Task deleted successfully!');
      setIsErrorToast(false);
      setActiveToast(true);
      
      // Store success message in session storage to persist across navigation
      sessionStorage.setItem('taskDeleteSuccess', 'true');
      
    } catch (error) {
      setToastMessage(error.response?.data?.message || 'Failed to delete task');
      setIsErrorToast(true);
      setActiveToast(true);
      console.error('Delete error:', error);
    } finally {
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  // Calculate paginated tasks
  const paginatedPendingTasks = pendingTasks.slice(
    (pendingPage - 1) * rowsPerPage,
    pendingPage * rowsPerPage
  );

  const paginatedCompletedTasks = completedTasks.slice(
    (completedPage - 1) * rowsPerPage,
    completedPage * rowsPerPage
  );

  const renderDescription = (desc) => {
    const shouldShowTooltip = desc && desc.length > 65;
    const displayText = desc || '-';
    const truncatedText = desc && desc.length > 65 ? `${desc.substring(0, 65)}...` : displayText;

    const content = (
      <div style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '300px',
        cursor: shouldShowTooltip ? 'pointer' : 'default'
      }}>
        {truncatedText}
      </div>
    );

    return shouldShowTooltip ? (
      <Tooltip content={desc}>
        {content}
      </Tooltip>
    ) : content;
  };

  const rowsForPending = paginatedPendingTasks.map((task) => [
    task.name,
    renderDescription(task.description),
    <Badge status="attention">{task.status}</Badge>,
    <Button icon={EditMinor} onClick={() => navigate(`/edit/${task.id}`)} />,
    <Button 
      icon={DeleteMinor} 
      destructive 
      onClick={() => handleDeleteClick(task.id)} 
    />,
  ]);

  const rowsForCompleted = paginatedCompletedTasks.map((task) => [
    task.name,
    renderDescription(task.description),
    <Badge status="success">{task.status}</Badge>,
    <Button icon={EditMinor} onClick={() => navigate(`/edit/${task.id}`)} />,
    <Button 
      icon={DeleteMinor} 
      destructive 
      onClick={() => handleDeleteClick(task.id)} 
    />,
  ]);

  const toastMarkup = activeToast ? (
    <Toast 
      content={toastMessage} 
      onDismiss={() => setActiveToast(false)} 
      error={isErrorToast}
    />
  ) : null;

  return (
    <Box style={{ marginTop: '20px' }}>
      {toastMarkup}

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        primaryAction={{
          content: 'Delete',
          destructive: true,
          onAction: handleDeleteConfirm,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setDeleteModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>


      <Box style={{ marginBottom: '20px', fontSize: '16px' }}>
          Pending tasks: {pendingTasks.length}
      </Box>

      {/* Pending Tasks Table */}
      <Card title="Pending Tasks" style={{ marginBottom: '20px' }}>
        <Box style={{ overflowX: 'auto' }}>
          <DataTable
            columnContentTypes={['text', 'text', 'text', 'icon', 'icon']}
            headings={['Name', 'Description', 'Status', 'Edit', 'Delete']}
            rows={rowsForPending}
            columnWidths={['20%', '50%', '15%', '7.5%', '7.5%']}
            fixedLayout
          />
        </Box>
        {pendingTasks.length > rowsPerPage && (
          <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <Pagination
              hasPrevious={pendingPage > 1}
              onPrevious={() => setPendingPage(pendingPage - 1)}
              hasNext={pendingPage * rowsPerPage < pendingTasks.length}
              onNext={() => setPendingPage(pendingPage + 1)}
              label={`${(pendingPage - 1) * rowsPerPage + 1}-${Math.min(
                pendingPage * rowsPerPage,
                pendingTasks.length
              )} of ${pendingTasks.length}`}
            />
          </Box>
        )}
      </Card>

      <Box style={{ marginBottom: '20px', marginTop: '20px', fontSize: '16px' }}>
          Completed tasks: {pendingTasks.length}
      </Box>

      {/* Completed Tasks Table */}
      <Box style={{ margin: '20px 0px 40px 0px' }}>
        <Card title="Completed Tasks">
          <Box style={{ overflowX: 'auto' }}>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'icon', 'icon']}
              headings={['Name', 'Description', 'Status', 'Edit', 'Delete']}
              rows={rowsForCompleted}
              columnWidths={['20%', '50%', '15%', '7.5%', '7.5%']}
              fixedLayout
            />
          </Box>
          {completedTasks.length > rowsPerPage && (
            <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <Pagination
                hasPrevious={completedPage > 1}
                onPrevious={() => setCompletedPage(completedPage - 1)}
                hasNext={completedPage * rowsPerPage < completedTasks.length}
                onNext={() => setCompletedPage(completedPage + 1)}
                label={`${(completedPage - 1) * rowsPerPage + 1}-${Math.min(
                  completedPage * rowsPerPage,
                  completedTasks.length
                )} of ${completedTasks.length}`}
              />
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
}