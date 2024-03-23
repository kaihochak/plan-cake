import React from 'react'
import loader from '/assets/icons/loader.svg'

const Loader = ({weight, height}) => {
    return (
        <div className='flex justify-center items-center'>
            <img
                src={loader}
                alt="Loader"
                className={`animate-spin ${weight} ${height}`}
            />
        </div>
    )
}

export default Loader
