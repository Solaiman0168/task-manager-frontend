import React, { useState } from 'react';
import { 
  Card, 
  FormLayout, 
  TextField, 
  Select, 
  Button, 
  Banner 
} from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

export default function TaskForm({ initialTask, onSubmit }) {
  const [name, setName] = useState(initialTask?.name || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState(initialTask?.status || 'pending');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (name.length > 50) {
      newErrors.name = 'Task name must be less than 50 characters';
    }
    
    if (description && description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (!['pending', 'completed'].includes(status)) {
      newErrors.status = 'Invalid status selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit({ name, description, status });
      navigate('/');
    } catch (error) {
      console.error('Error submitting task:', error);
      setFormError(error.response?.data?.message || 'Failed to submit task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sectioned>
      <form onSubmit={handleSubmit}>
        <FormLayout>
          {formError && (
            <Banner status="critical">
              {formError}
            </Banner>
          )}
          
          <TextField
            label="Task Name"
            value={name}
            onChange={(value) => {
              setName(value);
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }));
              }
            }}
            error={errors.name}
            required
            autoComplete="off"
          />
          
          <TextField
            label="Description"
            value={description}
            onChange={(value) => {
              setDescription(value);
              if (errors.description) {
                setErrors(prev => ({ ...prev, description: '' }));
              }
            }}
            error={errors.description}
            multiline={4}
            autoComplete="off"
          />
          
          <Select
            label="Status"
            options={[
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
            ]}
            value={status}
            onChange={(value) => {
              setStatus(value);
              if (errors.status) {
                setErrors(prev => ({ ...prev, status: '' }));
              }
            }}
            error={errors.status}
          />
          
          <Button 
            submit 
            primary 
            loading={loading}
            disabled={loading}
          >
            {initialTask ? 'Update Task' : 'Create Task'}
          </Button>
        </FormLayout>
      </form>
    </Card>
  );
}