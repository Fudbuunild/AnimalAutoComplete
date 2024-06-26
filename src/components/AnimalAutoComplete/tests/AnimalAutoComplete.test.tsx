import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimalAutoComplete from '../AnimalAutoComplete';

describe('AnimalAutoComplete Component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('shows loading initially', () => {
        render(<AnimalAutoComplete />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('displays animals list after loading', async () => {
        render(<AnimalAutoComplete />);
        await act(async () => {
            jest.advanceTimersByTime(3000);
        });
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'p' } });
        });
        await screen.findByText('Panda');
    });

    test('filters animals based on input', async () => {
        render(<AnimalAutoComplete />);
        await act(async () => {
            jest.advanceTimersByTime(3000);
        });
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'p' } });
        });
        expect(screen.getByText('Penguin')).toBeInTheDocument();
        expect(screen.queryByText('Elephant')).not.toBeInTheDocument();
    });

    test('selects an animal and updates the input', async () => {
        render(<AnimalAutoComplete />);
        await act(async () => {
            jest.advanceTimersByTime(3000);
        });
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'e' } });
            fireEvent.click(screen.getByText('Eagle'));
        });
        expect(screen.getByRole('textbox')).toHaveValue('Eagle');
    });

    test('closes dropdown on blur after delay', async () => {
        render(<AnimalAutoComplete />);
        await act(async () => {
            jest.advanceTimersByTime(3000); // Finish loading
        });
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
        const input = screen.getByRole('textbox');
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            fireEvent.change(input, { target: { value: 'e' } });
            fireEvent.blur(input);
            jest.advanceTimersByTime(150);
        });
        expect(screen.queryByText('Eagle')).not.toBeInTheDocument();
    });
});
