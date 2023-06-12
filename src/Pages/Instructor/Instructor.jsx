import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Instructor = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(()=> {
        fetch("http://localhost:5000/instructors")
        .then(res => res.json())
        .then(data => setInstructors(data))
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default Instructor;