import React, { useState } from 'react';
import styled from 'styled-components';
import { IItem, Item } from './Item';

interface IListProps {
	items: IItem[];
}

export const List: React.FC<IListProps> = ({ items }) => {
	const [ list, setList ] = useState<IItem[]>(items);
	const [ draggedFrom, setDraggedFrom ] = useState<number>(-1);
	const [ draggedOver, setDraggedOver ] = useState<number>(-1);
	const [ draggedTo, setDraggedTo ] = useState<number>(-1);

	const onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
		setDraggedFrom(Number(e.currentTarget.dataset.position));
		e.dataTransfer.setData('text/html', '');
	};

	const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
		e.preventDefault();
		setDraggedOver(Number(e.currentTarget.dataset.position));
	};

	const onDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
		setDraggedOver(-1);
		setDraggedTo(-1);
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>): void => {
		const to = Number(e.currentTarget.dataset.position);
		if (to !== draggedTo) {
			const itemDragged = list[draggedFrom];
			const itemsRemaining = list.filter((item, index) => index !== draggedFrom);
			const newList = [ ...itemsRemaining.slice(0, to), itemDragged, ...itemsRemaining.slice(to) ];
			setList(newList);
			setDraggedTo(to);
		}

		setDraggedFrom(-1);
		setDraggedOver(-1);
		setDraggedTo(-1);
	};

	return (
		<Container>
			{list.map((item, index) => (
				<Item
					key={item.id}
					item={item}
					index={index}
					draggedOver={draggedOver}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
				/>
			))}
		</Container>
	);
};

const Container = styled.div`
	margin-top: 10px;
	width: 80%;
`;
