import React from 'react'

const SelectedFilm = ({film}) => {
    return (
        <div>
            <div className='p-4'>
                {/* Selected Film */}
                {film ? (
                    <div className='flex-col flex-center'>
                        <h2 className="self-end m3">Selected Film ({3})</h2>
                        <img
                            src={image500(film?.poster_path)}
                            alt={film?.title}
                            className="object-cover object-center rounded-sm"
                        />
                    </div>
                ) : (
                    // Placeholder
                    <div className="w-[70%] mx-auto bg-primary border-2 border-border">
                        <div className='aspect-w-1 aspect-h-[1.5] rounded-sm'>
                            <div className='p-6 flex-center'>
                                <p className='self-center text-center'>Starting adding films to the poll</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectedFilm