import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/timeSelect";

const HourMinutePicker = ({ formData, setFormData }) => {
    return (
        <div className="flex w-full gap-2">
            <Select
                value={formData.hour}
                onValueChange={(value) => setFormData({ ...formData, hour: value })}
            >
                <SelectTrigger
                    className={`w-full ${formData.hour ? "text-primary-foreground" : " "
                        }`}
                >
                    <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Array.from({ length: 24 }, (_, i) => i).map((i) => (
                            <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                                {i.toString().padStart(2, "0")}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                value={formData.minute}
                onValueChange={(value) => setFormData({ ...formData, minute: value })}
            >
                <SelectTrigger
                    className={`w-full ${formData.minute ? "text-primary-foreground" : " "
                        }`}
                >
                    <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {/* iterate and render 00 - 55 per each 5 minutes */}
                        {Array.from({ length: 60 }, (_, i) => i)
                            .filter((i) => i % 5 === 0)
                            .map((i) => (
                                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                                    {i.toString().padStart(2, "0")}
                                </SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default HourMinutePicker
