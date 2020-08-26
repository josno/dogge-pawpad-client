import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DropDown = (props) => {
	const [isListOpen, setIsListOpen] = useState(false);
	const [filterLabel, setFilterLabel] = useState(props.label);

	const handleClick = (value) => {
		value === "None" ? setFilterLabel("Filter") : setFilterLabel(value);
		props.onClick(value);
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
					{props.list.map((item, index) => (
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
	margin: 20px;
	@media (min-width: 500px) {
		width: 120px;
		margin: 0px 10px;
	}
	.list-label {
		position: relative;
		z-index: 1;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
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
		position: relative;
		z-index: 1;
	}
	.list-item {
		text-align: left;
		list-style: none;
	}
	.list-text:hover {
		cursor: pointer;
		color: #219eb8;
	}
`;

export default DropDown;
