import React from 'react';
import styled from 'styled-components';

export interface IItem {
	id: number;
	title: string;
}

export enum DragDirection {
	'NONE',
	'UP',
	'DOWN'
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

interface IStyleProps {
	index: number;
	draggedOver: number;
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
			index={index}
			draggedOver={draggedOver}
		>
			<div>{item.title}</div>
		</Container>
	);
};

const Container =
	styled.div <
	IStyleProps >
	`
	display: grid;
	grid-template-columns: 1fr;
	padding: 20px;
	border-radius: 5px;
	position: relative;
	margin-bottom: 5px;
	border: ${({ index, draggedOver }) =>
		draggedOver > -1 && index === draggedOver ? '2px dashed #000' : '1px solid #000'};
	margin-left: ${({ index, draggedOver }) => (draggedOver > -1 && index === draggedOver ? '5%' : '0')};
	color: ${({ index, draggedOver }) => (draggedOver > -1 && index === draggedOver ? 'transparent' : '#000')};
	transition: margin-left 0.1s;
`;
