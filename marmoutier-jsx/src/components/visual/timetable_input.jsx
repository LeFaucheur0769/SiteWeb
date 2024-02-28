import React, { useState } from 'react';

const TimetableInput = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value.trim();
        setValue(inputValue);

        if (validateTimetable(inputValue)) {
            setError('');
        } else {
            setError('Please enter a valid timetable in the format "HHhMMm-HHhMMm"');
        }
    };

    const validateTimetable = (input) => {
        var regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(input);
    };

    return (
        <div>
            <label htmlFor="timetable">Enter Timetable:</label>
            <input 
                type="time" 
                id="timetable"
                name="timetable" 
                value={value}
                onChange={handleChange}
                pattern="(0[1-9]|1[0-2])h([0-5][0-9])m-(0[1-9]|1[0-2])h([0-5][0-9])m" 
                style={{ padding: '6px 10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}

                required 
            />
            {/* <input
                type="text"
                id="timetable"
                value={value}
                placeholder="Enter timetable here (e.g., 07h30m-12h45m)"
                onChange={handleChange}
                style={{ padding: '6px 10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
            />*/}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default TimetableInput;
