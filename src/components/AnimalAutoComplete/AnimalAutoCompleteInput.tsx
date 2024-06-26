import React from 'react';

interface AutoCompleteInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onFocus: () => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ value, onChange, onBlur, onFocus }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="Type to search..."
        style={{ paddingRight: '30px' }}
    />
);

export default AutoCompleteInput;
