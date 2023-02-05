import React, { useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
import {RiHeart3Fill} from 'react-icons/ri';
import Favorites from './Favorites';
import { Routes, Route, useHistory } from 'react-router-dom';



export default function SearchPhotos() {
    const [dogImages, setDogImages] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const dogRequests = new Array(6)
              .fill('https://random.dog/woof.json')
              .map((url) =>
                fetch(url)
                  .then((resp) => resp.json())
                  .then((dogObject) => dogObject.url)
              );
    
            const dogs = await Promise.all(dogRequests);
            setDogImages(dogs);
          } catch (error) {
            console.log('error', error);
          }
        };
    
        fetchData();
      }, []);


    
      const handleClick = param => event => {
       
        console.log(event.target);
    
        console.log('Image clicked');

        console.log(JSON.stringify(param))
        localStorage.setItem('dataKey', JSON.stringify(param));

      };

      const getItemsFromLocal = event => {
        console.log("Retrieving elements")
        const items = JSON.parse(localStorage.getItem('dataKey'));
        console.log(items) 
        return(
            <div>
                <Favorites />
            </div>
        )
      }

  return (
    <div className="card-list">
      {dogImages.map((dogImage) => (
          <img className="card--image" src={dogImage} height="220" width="220" 
          onClick={handleClick(dogImage)}/>
      ))}
      <td>
       <a> click on the below heart to get the favorites image</a>
       <RiHeart3Fill style={{color:"red"}} onClick={getItemsFromLocal} />
       </td>
    </div>
        );
    }
