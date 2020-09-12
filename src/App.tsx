import React from 'react';
import styled from 'styled-components';
import { data } from './utility/data';
import { List } from './components/List';

function App() {
	return (
		<Container>
			<List items={data} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

export default App;
