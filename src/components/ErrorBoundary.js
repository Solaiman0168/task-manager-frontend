import React from 'react';
import { Banner } from '@shopify/polaris';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Banner status="critical">
          Something went wrong. Please try again later.
        </Banner>
      );
    }

    return this.props.children;
  }
}