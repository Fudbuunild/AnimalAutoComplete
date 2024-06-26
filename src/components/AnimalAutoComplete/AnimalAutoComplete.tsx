import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import AutoCompleteInput from "./AnimalAutoCompleteInput";
import DropdownList from './DropdownList';
import './AnimalAutoComplete.css';

const animalsList = [
    'Elephant',
    'Tiger',
    'Dolphin',
    'Kangaroo',
    'Penguin',
    'Giraffe',
    'Panda',
    'Lion',
    'Eagle',
    'Zebra'
];

const AnimalAutoComplete: React.FC = () => {
    const [animals, setAnimals] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimals(animalsList);
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setShowDropdown(event.target.value !== '');
    };

    const handleSelectItem = (item: string) => {
        setInputValue(item);
        setShowDropdown(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowDropdown(false);
        }, 150);
    };

    const handleInputFocus = () => {
        if (inputValue) {
            setShowDropdown(true);
        }
    };

    const filteredAnimals = animals.filter(animal =>
        animal.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    return (
        <div className="autocomplete">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <AutoCompleteInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={handleInputFocus}
                    />
                    <FontAwesomeIcon icon={faCaretDown} className="caret-icon" />
                    {showDropdown && (
                        <DropdownList items={filteredAnimals} onSelectItem={handleSelectItem} />
                    )}
                </div>
            )}
        </div>
    );
};

export default AnimalAutoComplete;
