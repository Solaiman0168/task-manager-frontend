import React, { lazy } from 'react';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@shopify/polaris/build/esm/styles.css';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load component
const EditTaskPage = lazy(() => import('./pages/EditTaskPage'));
const CreateTaskPage = lazy(() => import('./pages/CreateTaskPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateTaskPage />} />
              <Route 
                path="/edit/:id" 
                element={ <EditTaskPage />  } 
              />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;