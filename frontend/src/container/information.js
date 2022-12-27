/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            <>
                {tags.map((tag) => (
                    <div className='tag' key={tag}>{tag}</div>
                ))}
            </>
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                <div className='tag' key={priceText}>{priceText}</div>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
            </>
        )
    }

    const getBusiness = (time) => {
        //console.log('hi', time.Mon)
        let times = []
        let days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
        if(time.Mon!==undefined) times.push(time.Mon); else times.push('Closed')
        if(time.Tue!==undefined) times.push(time.Tue); else times.push('Closed')
        if(time.Wed!==undefined) times.push(time.Wed); else times.push('Closed')
        if(time.Thr!==undefined) times.push(time.Thr); else times.push('Closed')
        if(time.Fri!==undefined) times.push(time.Fri); else times.push('Closed')
        if(time.Sat!==undefined) times.push(time.Sat); else times.push('Closed')
        if(time.Sun!==undefined) times.push(time.Sun); else times.push('Closed')
        if(time.All!==undefined) 
            for(let i=0; i<7; i++){
                times[i] = time.All;
            }
        //console.log('t: ', times)
        return (
            <div className='businessTime'>
                {times.map((item, idx)=>(
                    <div className='singleDay'>
                        <div className='day'>{days[idx]}</div>
                        <div className='time'>{item}</div>
                    </div>
                ))}

                {/* TODO Part III-2-c: render business time for each day*/}
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information