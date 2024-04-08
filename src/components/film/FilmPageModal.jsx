import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/filmPageDialog"
import FilmPage from "/src/_root/pages/FilmPage"

const FilmPageModal = ({ filmId, isModalOpen, setIsModalOpen }) => {

    let filmIdToString =  filmId ? filmId.toString() : null;
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            {/* Content */}
            <DialogContent className="w-full h-full">
                { filmId && <FilmPage modalFilmId={filmIdToString} />}
            </DialogContent>
        </Dialog>
    )
}

export default FilmPageModal