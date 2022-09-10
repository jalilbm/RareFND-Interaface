import React, { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "./Calendar.css";
import "./DatePicker.css";

export default function MyApp() {
	const [value, onChange] = useState(new Date());
	return (
		<div>
			<DatePicker onChange={onChange} value={value} />
		</div>
	);
}
