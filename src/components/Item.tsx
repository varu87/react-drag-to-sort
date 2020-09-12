import React from 'react';
import styled from 'styled-components';

export interface IItem {
	id: number;
	title: string;
}

interface IItemProps {
	item: IItem;
	index: number;
	draggedOver: number;
	onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
	onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const Item: React.FC<IItemProps> = ({
	item,
	index,
	draggedOver,
	onDragStart,
	onDragOver,
	onDragLeave,
	onDrop
}) => {
	return (
		<Container
			draggable
			data-position={index}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			<div>{item.title}</div>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	padding: 20px;
	border: 1px solid #000;
	border-radius: 5px;
	margin-bottom: 5px;
`;
