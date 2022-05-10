import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import './TopCharacters.css';

const baseUrl = 'https://pt04.marcomiso.com/api/';

const TopCharacters = () => {
    const { auth } = useAuth();
    const [ topCharacters, setTopCharacters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(baseUrl + "characters/find/top", { headers: { 'x-api-key': auth?.apiKey } })
        .then(response => {
            if(response.status === 200) return response.json();
            throw new Error(response.status);
        })
        .then((response) => {
            setTopCharacters(response);
        })
        .catch((err) => {
            setError(err.message);
            setTopCharacters(null);
        })
        .finally(() => {
            setLoading(false);
    });
    }, [auth])
    

    return (
        <>
            <h2>Top characters</h2>
            
            { loading && <div>Loading...</div> }
            
            { error && ( <div>{`There is a problem fetching the data - ${error}`}</div> ) }

            { topCharacters && 
                <div className='grid-container'>
                    { topCharacters.map((character) => (
                        <div className='grid-item' key={ character.id } onClick={ () => navigate(`/character/${character.id}`) }>
                            <img src={ `${character.thumbnail?.path}.${character.thumbnail?.extension}` } alt={ character.name } />
                            <h3>{ character.name }</h3>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default TopCharacters;