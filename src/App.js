import React, { lazy, Suspense } from 'react';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@shopify/polaris/build/esm/styles.css';
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load the EditTaskPage component
const EditTaskPage = lazy(() => import('./pages/EditTaskPage'));

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
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditTaskPage />
                  </Suspense>
                } 
              />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;