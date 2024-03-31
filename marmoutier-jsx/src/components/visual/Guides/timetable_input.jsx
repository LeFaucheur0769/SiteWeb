import React, { useState } from 'react';

const TimetableInput = () => {
    const [value_start, setValue_start] = useState('');
    const [value_end, setValue_end] = useState('');
    const [error, setError] = useState('');

    const handleChange_start = (event) => {
        const inputValue_start = event.target.value.trim();
        setValue_start(inputValue_start);

        if (validateTimetable(inputValue_start)) {
            setError('');
            console.log(inputValue_start)
        } else {
            setError('Please enter a valid timetable in the format "HHhMMm-HHhMMm"');
        }
        if (validateTimetable(inputValue_start) && inputValue_start < value_end && value_end != null) {
            setError('');
            console.log(inputValue_start);
        } else {
            setError('Please enter a valid timetable in the format "HHhMMm-HHhMMm" and ensure it is lower than the end time');
        }

    };

    const handleChange_end = (event) => {
        const inputValue_end = event.target.value.trim();
        setValue_end(inputValue_end);

        if (validateTimetable(inputValue_end)) {
            setError('');
            console.log(inputValue_end)
        } else {
            setError('Please enter a valid timetable in the format "HHhMMm-HHhMMm"');
        }

    };

    const validateTimetable = (input) => {
        var regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        //print in console the result and then return it 
        return regex.test(input);
    };

    return (
        <div>
            <label htmlFor="timetable" style={{marginRight : "20px", marginLeft : "20px"}}>Horaires  </label>
            <input 
                type="time" 
                id="timetable_start"
                name="timetable" 
                value={value_start}
                onChange={handleChange_start}
                pattern="(0[1-9]|1[0-2])h([0-5][0-9])m-(0[1-9]|1[0-2])h([0-5][0-9])m" 
                style={{ padding: '6px 10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}

                required 
            />
            <label htmlFor="timetable" style={{marginRight : "20px", marginLeft : "30px"}}>:  </label>
            <input 
                type="time" 
                id="timetable_end"
                name="timetable" 
                value={value_end}
                onChange={handleChange_end}
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
