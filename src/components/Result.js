import React from 'react';

const Result = () => {
    return (
        <div>
            Score :
            {localStorage.getItem('score')}
        </div>
    );
};

export default Result;
