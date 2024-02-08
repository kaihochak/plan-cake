import React, { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils"
import { RxCross1 } from "react-icons/rx";


const MultiSelect = ({ options, label, selected: parentSelected, setSelected: parentSetSelected, separator }) => {

    const isDesktop = useMediaQuery('only screen and (min-width: 768px)')
    const [open, setOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState(parentSelected);

    useEffect(() => {
        setSelectedOptions(parentSelected);
    }, [parentSelected]);

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild >
                    <Button variant="outline" 
                            className={cn(
                                "w-full justify-start",
                                {'bg-secondary text-secondary-foreground': selectedOptions.length !== 0},
                            )}
                    >
                        {selectedOptions.length === 0 ? <>{label}</> : 
                            <>{selectedOptions.map((option, index) => (
                                    <span key={option.value}>
                                        {option}{index < selectedOptions.length - 1 ? ',' : ''}
                                    </span>
                            ))}</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <OptionList
                        options={options}
                        selectedOptions={selectedOptions}
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
        <div className="relative">
            <Drawer open={open} onOpenChange={setOpen} className="py-2 absolute">
                <DrawerTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start",
                        {'bg-secondary text-secondary-foreground': selectedOptions.length !== 0},
                    )}>
                        {selectedOptions.length === 0 ? <>{label}</> : 
                            <>{selectedOptions.map((option, index) => (
                                    <span key={index}>
                                        {option}{index < selectedOptions.length - 1 ? separator : ''}
                                    </span>
                            ))}</>}
                    </Button>
                </DrawerTrigger>

                {/* Drawer Content */}
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <OptionList
                            options={options}
                            selectedOptions={selectedOptions}
                            label={label}
                            setOpen={setOpen}
                            setSelectedOptions={setSelectedOptions}
                            parentSetSelected={parentSetSelected}
                        />
                    </div>
                </DrawerContent>

            </Drawer>

            {/* Cross Symbol */}
            <div className="absolute z-40 top-0 right-0">
                {selectedOptions.length !== 0 &&
                    <ClearSelection
                        setSelectedOptions={setSelectedOptions}
                        parentSetSelected={parentSetSelected}
                    />
                }
            </div>

        </div>
        
    )

}

function OptionList({ options, selectedOptions, label, setOpen, setSelectedOptions, parentSetSelected }) {

    // Handle selection change
    const handleSelect = (value) => {
        const newSelectedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter(item => item !== value) // Remove the item if it's already selected
            : [...selectedOptions, value]; // Add the item to the selection array

        setSelectedOptions(newSelectedOptions); // Update local state
        parentSetSelected(newSelectedOptions); // Update parent state
    };

    // Reset options
    const resetOptions = () => {
        setSelectedOptions([]);
        parentSetSelected([]);
        setOpen(false);
    };

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
                            isSelected={selectedOptions.includes(option.value)}
                            onSelect={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
            <div className='flex justify-between space-x-2 px-4 pb-4'>
                {/* reset */}
                <button 
                    onClick={resetOptions}
                    className="rounded-md flex-grow border border-secondary-default text-secondary-default bg-transparent/10 py-2 px-4"
                >
                    Reset
                </button>
                {/* apply */}
                <button 
                    onClick={() => setOpen(false)}
                    className="rounded-md flex-grow border border-secondary-default text-secondary-default bg-transparent/10 py-2 px-4"
                >
                    Apply
                </button>
            </div>
        </Command>
    );
}

function ClearSelection({ setSelectedOptions, parentSetSelected }) {

    const handleClear = () => {
        setSelectedOptions([]);
        parentSetSelected([]);
    };

    return (
        <div>
            <button 
                className="p-4 text-secondary-foreground"
                onClick={handleClear}
            >
                <RxCross1/>
            </button>
        </div>
    );
}


export default MultiSelect;