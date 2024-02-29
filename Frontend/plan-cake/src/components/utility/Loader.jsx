import React from 'react'
import loader from '/assets/icons/loader.svg'

const Loader = props => {
    return (
        <div className='flex justify-center items-center'>
            <img
                src={loader}
                alt="Loader"
                className="w-6 h-6"
            />
        </div>
    )
}

export default Loader
