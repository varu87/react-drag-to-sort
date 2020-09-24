import React, { useState } from 'react';
import styled from 'styled-components';
import { IItem, Item } from './Item';

interface IListProps {
	items: IItem[];
}

export const List: React.FC<IListProps> = ({ items }) => {
	const [ isDragging, setIsDragging ] = useState<boolean>(false);
	const [ draggedFrom, setDraggedFrom ] = useState<number>(-1);
	const [ draggedTo, setDraggedTo ] = useState<number>(-1);
	const [ startPosition, setStartPosition ] = useState<number>(-1);
	const [ list, setList ] = useState<IItem[]>(items);

	const elementRefs: HTMLDivElement[] = [];
	const setElementRefs = (i: number, elementRef: HTMLDivElement | null) => {
		if (elementRef) elementRefs[i] = elementRef;
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.parentElement) {
			const itemDiv = e.currentTarget.parentElement.parentElement;
			if (itemDiv) {
				const itemIndex = itemDiv.dataset.position;
				if (itemIndex) {
					setIsDragging(true);
					setDraggedFrom(Number(itemIndex));
					setStartPosition(e.clientY);
					elementRefs.forEach((elementRef) => {
						elementRef.style.transition = 'all 0.1s ease';
					});
				}
				if (itemDiv) itemDiv.style.scale = '0.99';
			}
		}
	};

	const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging) {
			const itemIndex = e.currentTarget.dataset.position;
			const draggedFromElement = elementRefs[draggedFrom];
			if (itemIndex && draggedFromElement) {
				e.preventDefault();
				const yOffset = e.clientY - startPosition;
				const height = draggedFromElement.clientHeight;
				const marginBottom = Number(
					window.getComputedStyle(draggedFromElement).getPropertyValue('margin-bottom').replace('px', '')
				);
				if (yOffset > 0 && yOffset >= height) {
					const to = draggedFrom + Math.floor(yOffset / height);
					if (to > -1 && to < list.length) setDraggedTo(to);
					const elementsToBeMoved = elementRefs.filter(
						(elementRef) =>
							Number(elementRef.dataset.position) > draggedFrom &&
							Number(elementRef.dataset.position) <= to &&
							!elementRef.style.transform
					);
					if (elementsToBeMoved)
						elementsToBeMoved.forEach(
							(element) => (element.style.transform = `translate(0, -${height + marginBottom}px)`)
						);
				} else if (yOffset < 0 && -yOffset >= height) {
					const to = draggedFrom - Math.floor(-yOffset / height);
					if (to > -1 && to < list.length) setDraggedTo(to);
					const elementsToBeMoved = elementRefs.filter(
						(elementRef) =>
							Number(elementRef.dataset.position) < draggedFrom &&
							Number(elementRef.dataset.position) >= to &&
							!elementRef.style.transform
					);
					if (elementsToBeMoved)
						elementsToBeMoved.forEach(
							(element) => (element.style.transform = `translate(0, ${height + marginBottom}px)`)
						);
				}
				draggedFromElement.style.zIndex = '2';
				draggedFromElement.style.transform = `translate(0, ${yOffset}px)`;
				draggedFromElement.style.scale = '1.01';
			} else setIsDragging(false);
		}
	};

	const sortList = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const itemDragged = list[draggedFrom];
		if (draggedTo > -1) {
			const remainingItems = list.filter((_, index) => index !== draggedFrom);
			const newList = [ ...remainingItems.slice(0, draggedTo), itemDragged, ...remainingItems.slice(draggedTo) ];
			setList(newList);
		}
		elementRefs.forEach((elementRef) => {
			elementRef.style.removeProperty('transform');
			elementRef.style.removeProperty('z-index');
			elementRef.style.removeProperty('transition');
			elementRef.style.removeProperty('scale');
		});
		setIsDragging(false);
		setDraggedFrom(-1);
		setStartPosition(-1);
		setDraggedTo(-1);
	};

	return (
		<Container onMouseUp={sortList} onMouseLeave={sortList}>
			{list.map((item, index) => (
				<Item
					key={item.id}
					item={item}
					index={index}
					isDragging={isDragging}
					setElementRefs={setElementRefs}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
				/>
			))}
		</Container>
	);
};

const Container = styled.div`
	margin-top: 20px;
	width: 80%;
`;
