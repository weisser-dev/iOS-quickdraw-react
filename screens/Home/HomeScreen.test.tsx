// HomeScreen.test.tsx
import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
    const mockNavigation = {
        navigate: jest.fn(),
    };

    it('renders correctly', () => {
        const {getByText} = render(<HomeScreen navigation={mockNavigation as any}/>);
        // The 't' function now just returns the key, so you can check for the key directly
        expect(getByText('home.startButton')).toBeTruthy();
    });
});
