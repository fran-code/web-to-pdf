import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';


test('Renders title', () => {
  render(<App />);
  const title = screen.getByText(/Web to PDF/i);
  expect(title).toBeInTheDocument();
});

test('Renders form filds', () => {
  render(<App />);
  const url = screen.getByText(/url/i);
  const fileName = screen.getByText(/File Name/i);
  const size = screen.getByText(/Size/i);
  const downloadButton = screen.getByRole('button', { name: /Download/i })

  expect(url).toBeInTheDocument();
  expect(fileName).toBeInTheDocument();
  expect(size).toBeInTheDocument();
  expect(downloadButton).toBeInTheDocument();
});

test('Validate mandatory fields', () => {
  render(<App />);
  const downloadButton = screen.getByRole('button', { name: /Download/i })
  const blankTextNoExists = screen.queryByText(/Cannot be blank!/i);
  expect(blankTextNoExists).toBeNull();

  fireEvent.click(downloadButton)
  const blankTextExists = screen.queryByText(/Cannot be blank!/i);
  expect(blankTextExists).toBeInTheDocument();
});

test('Fill form correctly', () => {
  render(<App />);

  const url = screen.getByLabelText(/url/i);
  fireEvent.change(url, { target: { value: 'www.testurl.com' } })
  const urlFinded = screen.getByDisplayValue('www.testurl.com')
  expect(urlFinded).toBeInTheDocument();

  const fileName = screen.getByLabelText(/File Name/i);
  fireEvent.change(fileName, { target: { value: 'testFile' } })
  const fileNameFinded = screen.getByDisplayValue('testFile')
  expect(fileNameFinded).toBeInTheDocument();

  const size = screen.getByLabelText(/Size/i);
  fireEvent.change(size, { target: { value: 'A0' } })
  const sizeFinded = screen.getByDisplayValue('A0')
  expect(sizeFinded).toBeInTheDocument();
});