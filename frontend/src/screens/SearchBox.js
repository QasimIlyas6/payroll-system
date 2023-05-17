import React, { useState } from "react";

const SearchBox = ({ employees }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = (e) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);

		const filteredResults = employees.filter((employee) =>
			employee.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		if (!filteredResults) {
			setSearchResults([]);
		}
		setSearchResults(filteredResults);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search employee..."
				value={searchTerm}
				onChange={handleSearch}
			/>
			{searchResults.length > 0 ? (
				<ul>
					{searchResults.map((employee) => (
						<li key={employee.id}>{employee.name}</li>
					))}
				</ul>
			) : (
				<p>No results found.</p>
			)}
		</div>
	);
};

export default SearchBox;
