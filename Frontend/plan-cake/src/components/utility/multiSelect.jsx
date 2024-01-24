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

const MultiSelect = ({ options, label, selected, setSelected }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);


    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('only screen and (min-width: 768px)')
    const [selectedOptions, setSelectedOptions] = React.useState(null);

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedOptions ? <>{selectedOptions.label}</> : <>{label}</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList 
                        options={options}
                        label={label}
                        setOpen={setOpen} 
                        setSelectedOptions={setSelectedOptions} 
                    />
                </PopoverContent>
            </Popover>
        )
    }

    // Mobile
    return (
        <Drawer open={open} onOpenChange={setOpen} className="py-2">
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    {selectedOptions ? <>{selectedOptions.label}</> : <>{label}</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <OptionList 
                        options={options}
                        label={label}
                        setOpen={setOpen} 
                        setSelectedOptions={setSelectedOptions} 
                    />
                </div>
            </DrawerContent>
        </Drawer>
    )

}

function OptionList({ options, label, setOpen, setSelectedOptions }) {
    return (
        <Command>
            <CommandInput placeholder={`Filter by ${label}` + "s"} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {options.map((option) => (
                        <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(value) => {
                                setSelectedOptions(
                                    options.find((priority) => priority.value === value) || null
                                );
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}


export default MultiSelect;