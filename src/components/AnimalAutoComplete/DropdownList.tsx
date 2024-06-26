import React from 'react';

interface DropdownListProps {
    items: string[];
    onSelectItem: (item: string) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({ items, onSelectItem }) => (
    <ul className="dropdown">
        {items.length > 0 ? (
            items.map(item => (
                <li key={item} onClick={() => onSelectItem(item)}>
                    {item}
                </li>
            ))
        ) : (
            <li>No matches found.</li>
        )}
    </ul>
);

export default DropdownList;
