import React, { useState } from "react";
import { useMediaQuery } from '@react-hook/media-query'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const MultiSelect = ({ options, selected, setSelected }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);


    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('only screen and (min-width: 768px)')
    const [selectedStatus, setSelectedStatus] = React.useState(null);

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedStatus ? <>{selectedStatus.label}</> : <>Genres</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList 
                        options={options}
                        setOpen={setOpen} 
                        setSelectedStatus={setSelectedStatus} 
                    />
                </PopoverContent>
            </Popover>
        )
    }

    // Mobile
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>Genres</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <StatusList 
                        options={options}
                        setOpen={setOpen} 
                        setSelectedStatus={setSelectedStatus} 
                    />
                </div>
            </DrawerContent>
        </Drawer>
    )

}

function StatusList({ options, setOpen, setSelectedStatus }) {
    return (
        <Command>
            <CommandInput placeholder="Filter genres..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {options.map((status) => (
                        <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                                setSelectedStatus(
                                    options.find((priority) => priority.value === value) || null
                                );
                                setOpen(false);
                            }}
                        >
                            {status.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}


export default MultiSelect;