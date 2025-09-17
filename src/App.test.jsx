import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('XModal Form', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('validates email input field', () => {
    fireEvent.click(screen.getByText('Open Form'));
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email Address:'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(window.alert).toHaveBeenCalledWith('Invalid email. Please check your email address.');
  });

  it('validates phone number input field', () => {
    fireEvent.click(screen.getByText('Open Form'));
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email Address:'), { target: { value: 'john@email.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(window.alert).toHaveBeenCalledWith('Invalid phone number. Please enter a 10-digit phone number.');
  });

  it('validates date of birth input field', () => {
    fireEvent.click(screen.getByText('Open Form'));
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email Address:'), { target: { value: 'john@email.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    // Set future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateStr = futureDate.toISOString().split('T')[0];
    fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { value: futureDateStr } });
    fireEvent.click(screen.getByText('Submit'));
    expect(window.alert).toHaveBeenCalledWith('Invalid date of birth. Please select a valid date.');
  });

  it('submits the form with valid data', () => {
    fireEvent.click(screen.getByText('Open Form'));
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email Address:'), { target: { value: 'john@email.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByText('Submit'));
    // Modal should close, so Open Form button should be visible again
    expect(screen.getByText('Open Form')).toBeInTheDocument();
  });

  it('closes the modal when clicking outside', () => {
    fireEvent.click(screen.getByText('Open Form'));
    // Simulate clicking outside modal-content
    fireEvent.mouseDown(document.querySelector('.modal'));
    // Modal should close, so Open Form button should be visible again
    expect(screen.getByText('Open Form')).toBeInTheDocument();
  });
});

// Mock window.alert for validation tests
beforeAll(() => {
  window.alert = jest.fn();
});
