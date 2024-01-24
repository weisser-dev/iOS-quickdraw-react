// app/components/Button/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Button title="Press me" onPress={() => {}} />);
        expect(getByText('Press me')).toBeTruthy();
    });

    it('fires onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button title="Press me" onPress={onPressMock} />);
        fireEvent.press(getByText('Press me'));
        expect(onPressMock).toHaveBeenCalled();
    });
});
