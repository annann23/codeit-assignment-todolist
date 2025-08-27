import React from 'react';
import './LoadingPage.scss';

interface LoadingPageProps {
  isLoading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-page">
      <div className="loading-overlay">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default LoadingPage;
