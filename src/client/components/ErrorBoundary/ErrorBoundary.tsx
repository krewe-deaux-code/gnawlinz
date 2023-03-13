import React, { ReactNode } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <div>Click below to return to character select:</div>
          <Link to="/menu" className='active-link' >GNAWLINZ</Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
