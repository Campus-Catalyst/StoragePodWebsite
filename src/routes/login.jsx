import React, { useState } from 'react';
import { useNavigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({ 
  component: LoginPageComponent, 
});

function LoginPageComponent() { 
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Attempting Login with:', { email, password });
    navigate({ to: '/devices' }); 
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Attempting Registration with:', { email, password, confirmPassword });
    console.log('Registration process initiated. Navigating to dashboard.');
    navigate({ to: '/devices' }); 
  };

  return (
    // The background gradient is now handled by __root.jsx.
    // This div only needs to center its content within the space provided by the root.
    <div className="flex flex-1 items-center justify-center w-full">
      <div className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-xl w-96 max-w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to MyApp
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          {isRegisterMode ? "Create your account" : "Login to your account"}
        </p>

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isRegisterMode && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white text-lg py-3 rounded-lg hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 mb-4"
          >
            {isRegisterMode ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          {isRegisterMode ? "Already have an account?" : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-cyan-600 hover:underline font-medium focus:outline-none"
          >
            {isRegisterMode ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
}
