import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import DocsRedactionPage from './pages/DocsRedactionPage';
import './styles/globals.css';

const clerkPubKey = "pk_test_YnJhdmUtc2xvdGgtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA";

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/docs" element={<DocsRedactionPage />} />
          </Routes>
        </Layout>
      </Router>
    </ClerkProvider>
  );
}

export default App;
