import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/timeSelect";

const HourMinutePicker = ({ formData, setFormData }) => {

	console.log(formData.date.getHours(), formData.date.getMinutes());

	return (
		<div className="flex w-full gap-2">
			<Select
				value={formData.date.getHours().toString().padStart(2, "0")}
				onValueChange={(value) => {
					setFormData({ ...formData, date: new Date(formData.date.setHours(value)) });
				}}
			>
				<SelectTrigger className={`w-full text-primary-foreground`}>
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
				value={formData.date.getMinutes().toString().padStart(2, "0")}
				onValueChange={(value) =>
					setFormData({ ...formData, date: new Date(formData.date.setMinutes(value)) })
				}
			>
				<SelectTrigger className={`w-full text-primary-foreground`}>
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
