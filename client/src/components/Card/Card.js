import React from 'react';
import './Card.css';

function Card(props) {
    return(
        <div className='card-container'>
            <div className='img-container'>
                <img src={props.img} alt={props.title}/>
            </div>
            <div className='card-content'>
                <div className='card-title'>
                    <h3>{props.title}</h3>
                </div>
                <div className='card-body'>
                    <p>{props.body}</p> 
                </div>  
                <hr className='solid'/>
                <div className='card-subinfo'>
                    <h3> Price </h3>
                    <h4>€{props.subinfo.toFixed(2)}</h4>
                </div>  
            </div>
            <div className='card-button'>
                <button>
                    Add to cart
                </button>

            </div>

        </div>


    );

}

export default Card;