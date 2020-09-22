import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiList } from 'react-icons/fi';

export interface IItem {
	id: number;
	title: string;
	stringAttribute: string;
	booleanAttribute: boolean;
	numberAttribute: number;
}

export enum DragDirection {
	'NONE',
	'UP',
	'DOWN'
}

interface IItemProps {
	item: IItem;
	index: number;
	marginBottomProp: number;
	setElementRefs: (i: number, elementRef: HTMLDivElement | null) => void;
	onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface IStyleProps {
	marginBottomProp: number;
}

export const Item: React.FC<IItemProps> = ({
	item,
	index,
	marginBottomProp,
	setElementRefs,
	onMouseDown,
	onMouseMove
}) => {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setElementRefs(index, elementRef.current);
	});

	return (
		<Container ref={elementRef} data-position={index} onMouseMove={onMouseMove} marginBottomProp={marginBottomProp}>
			<InnerContainer>
				<ListIcon onMouseDown={onMouseDown}>
					<FiList />
				</ListIcon>
				<div>{item.title}</div>
				<div>{item.stringAttribute}</div>
				<div>
					<input type="checkbox" readOnly={true} checked={item.booleanAttribute} />
				</div>
				<div>{item.numberAttribute}</div>
			</InnerContainer>
		</Container>
	);
};

const Container =
	styled.div <
	IStyleProps >
	`
	margin-bottom: ${({ marginBottomProp }) => marginBottomProp}px;
	background-color: #fff;
	position: relative;
`;

const InnerContainer = styled.div`
	padding: 20px;
	border: 1px solid #000;
	border-radius: 5px;
	display: grid;
	grid-template-columns: 1fr 3fr 2fr 2fr 2fr;
	align-items: center;
`;

const ListIcon = styled.div`
	&:hover {
		cursor: grab;
	}
`;
