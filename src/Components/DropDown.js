import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DropDown = ({ list, label, onClick }) => {
	const [isListOpen, setIsListOpen] = useState(false);
	const [filterLabel, setFilterLabel] = useState(label);

	const handleClick = (value) => {
		value === "None" ? setFilterLabel("Filter") : setFilterLabel(value);
		onClick(value);
		setIsListOpen(!isListOpen);
	};

	return (
		<DropDownStyles>
			<div
				className='list-text list-label dog-list-actions'
				onClick={() => setIsListOpen(!isListOpen)}
			>
				{filterLabel}
				{isListOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
			</div>
			{isListOpen && (
				<ul className='list-container'>
					{list.map((item, index) => (
						<li
							className='list-item list-text'
							key={index}
							onClick={() => handleClick(item)}
							value={item}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</DropDownStyles>
	);
};

const DropDownStyles = styled.div`
	width: 100%;
	margin: 0px 10px;
	position: relative;
	font-size: 1rem;
	.list-label {
		position: relative;
		z-index: 1;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
	}
	.list-container {
		padding: 5px 20px;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		margin: 0px;
		background-color: #fcfcfc;
		border-top: none;
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 100px;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.list-item {
		text-align: left;
		list-style: none;
	}
	.list-text:hover {
		cursor: pointer;
		color: #219eb8;
	}

	.dog-list-actions {
		border: 1px solid black;
		background-color: #fcfcfc;
		padding: 10px 30px;
	}
`;

export default DropDown;
