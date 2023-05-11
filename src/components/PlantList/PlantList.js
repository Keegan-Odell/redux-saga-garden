import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plants = useSelector(store => store.plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        getPlants()
    }, []); 

    const getPlants = () => {
        dispatch({
            type: 'SAGA/FETCH_PLANTS'
        })
    }

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(plants)}</pre>
        </div>
    );
}

export default PlantList;
