import React from 'react'
import { BiShareAlt, BiCaretRight } from 'react-icons/bi'
import { PiKeyReturnFill } from 'react-icons/pi'

const EventTitleAndShare = ({ state, isPending, copyToClipboard, rename, setRename, newName, setNewName, handleRename, isError }) => {
    return (
        < div className='flex-between gap-x-10' >
            {!rename ? <div className="flex items-center gap-x-2">
                <h2
                    onClick={() => setRename(true)}
                    className={`hover:underline flex-wrap transition-all duration-500 ease-in-out cursor-pointer h3 " ${isPending ? "text-foreground-dark" : "text-foreground"}`}
                >
                    {state.title || "Pick A Film"}
                </h2>
            </div> :
                <div className="relative flex">
                    <input
                        type="text"
                        value={newName || state.title}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                        onKeyUp={(e) => e.key === 'Escape' && setRename(false)}
                        className={`w-full pr-8 transition-all duration-500 ease-in-out border-b bg-primary h3 border-accent-dark text-foreground-dark focus:outline-none focus:border-primary ${isError ? "border-destructive" : "border-accent-dark"}`}
                    />
                    <button
                        onClick={handleRename}
                        className="absolute bottom-1.5 text-accent h3 right-1"
                    >
                        <PiKeyReturnFill />
                    </button>
                </div>
            }


            {/* Share */}
            <button
                className='flex items-center pl-2 rounded-lg gap-x-2 text-accent h3'
                onClick={copyToClipboard}
            >
                <BiShareAlt />
            </button>
        </div >
    )
}

export default EventTitleAndShare
