import React, { useState, useEffect } from 'react';

const Numbers = () => {
	const [numbers, setNumbers] = useState(['one', 'two', 'three']);
	const [letters, setLetters] = useState(['a', 'b', 'c']);
	
	const addNumber = () => {
		setNumbers([...numbers, 'four'])
	}

	const addLetter = () => {
		setLetters([...letters, 'd'])
	}
	useEffect( () => {
		console.log('our use effect triggers')
	}, [numbers])
	return (
		<div>
		<h1>Numbers</h1>
		
			{ numbers.map( num => {
				return <h4 key={num}>{ num }</h4>
			}		)
			}

			{ letters.map( letter => {
				return <h4 key={letter}>{ letter }</h4>
			}		)
			}
		<button onClick={addNumber}>add Number</button>
		<button onClick={addLetter}>add Letter</button>
		</div>
)
}

export default Numbers;