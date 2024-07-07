import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { fetchToDos, deleteToDo, doneToDo, fetchAllData } from './api';

// Mock the API calls
jest.mock('./api');

test('renders ToDo App', async () => {
  fetchToDos.mockResolvedValue([]);
  fetchAllData.mockResolvedValue([]);

  render(<App />);
  
  expect(screen.getByText(/ToDo App/i)).toBeInTheDocument();
  expect(screen.getByText(/Create To Do/i)).toBeInTheDocument();
});

test('opens and closes create modal', async () => {
  fetchToDos.mockResolvedValue([]);
  fetchAllData.mockResolvedValue([]);

  render(<App />);

  const createButton = screen.getByText(/Create To Do/i);
  fireEvent.click(createButton);

  expect(screen.getByText(/Text:/i)).toBeInTheDocument();

  const closeButton = screen.getByText(/Cancel/i);
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByText(/Text:/i)).not.toBeInTheDocument();
  });
});
