document.addEventListener('DOMContentLoaded', () => {

	var pool = []; //this is the array that will contain all the current combatants.

	const mainDiv = document.querySelector('.main'); //used to target the main div (contains just the combat tracker)
	const wrapperDiv = document.querySelector('.wrapper'); //used to target the wrapper div (contains header, input fields, combat tracker, and page footer)
	const combatList = document.getElementById('combatList'); //used to target the combat list which is empty by default and populated by the event listener
	const filters = document.querySelector('.filters'); //used to target the div containing the filters between the input fields and the combat tracker. Empty by default and populated by the 'filters' section of this page
	const combatFilters = document.querySelector('.combatFilters'); //used to target the ul that holds the filters themselves





	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
	//creates new combatant. First function creates the element, second function appends the element onto a li, third section actually uses both previous functions to 
	//1) create the element 2) uses function 2 to append element from function 1 to an li and 3) returns the full li containing all the parameters described in the top function

	function createCombatant (pName, pInit, pHp, pAc, pDamage) {

		function createElement (elementName, property, value) {
			const element = document.createElement(elementName);
			element[property] = value;
			return element;
		};

		function appendtoLi (elementName, property, value) {
		const element = createElement(elementName, property, value);
		li.appendChild(element);
		return element;
	};

		const li = document.createElement('li');
		li.setAttribute('class', 'combatants');
		appendtoLi('span', 'textContent', pName).setAttribute('class', 'name');
		appendtoLi('span', 'textContent', pInit).setAttribute('class', 'init');
		appendtoLi('span', 'textContent', pHp).setAttribute('class', 'hp');
		appendtoLi('span', 'textContent', pAc).setAttribute('class', 'ac');
		appendtoLi('span', 'textContent', pDamage).setAttribute('class', 'damage');
		appendtoLi('button', 'textContent', 'Edit').setAttribute('id', 'edit');
		appendtoLi('button', 'textContent', 'Remove').setAttribute('id', 'remove');
		return li;
	};

	//First attempt at making 'combatant' an object so that I can add it to an array. Uses same paramaters required to fill the function above
	function Player(pName, pInit, pHp, pAc, pDamage) {
		var pObject = {pName, pInit, pHp, pAc, pDamage};
		return pObject;
	};

	//This is a simple function to reorder an array
	function reorder(oldPosition, newPosition){
		this.splice(newPosition, 0, this.splice(oldPosition, 1)[0]);
	};

	//Prints out pool
	function print(){
		console.log(pool);
	};

	//Loops through the pool array and creates classes with each object using the createCombatant function
	function addIt(){
		combatList.innerHTML = "";
		for (i=0; i<pool.length; i++){
			const li = createCombatant(pool[i].pName, pool[i].pInit, pool[i].pHp, pool[i].pAc, pool[i].pDamage);
			combatList.appendChild(li);
		}
	}

	//Attempt at a function to make these filters
	function createFilters (purpose, title) {
		const rDiv = document.createElement('div');
		const rLabel = document.createElement('label');
		const theButton = document.createElement('input');
		theButton.setAttribute('id', purpose);
		theButton.setAttribute('class', 'filterButtons');
		rLabel.textContent = title;
		theButton.type = 'button';
		rDiv.appendChild(rLabel);
		rDiv.appendChild(theButton);
		combatFilters.appendChild(rDiv);
	};

	//This next line is just to add default items to the pool so I don't have to do it every time I want to test my code
	pool.push(Player('Damage Highest: ', 1, 2, 3, 4));
	pool.push(Player('Armor Class Highest: ', 2, 3, 4, 1));
	pool.push(Player('HP Highest: ', 3, 4, 1, 2));
	pool.push(Player('Initiative Highest: ', 4, 1, 2, 3));
	print();



	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//ACTUAL CODE ACTUAL CODE ACTUAL CODE ACTUAL CODE ACTUAL CODE ACTUAL CODE ACTUAL CODE ACTUAL CODE ACTUAL CODE
	///////////////////////////////////////////////////////////////////////////////////////////////////////////// 



	//Takes all the input fields and adds them to the 'Player' function (creates a 'player' object) and then adds that object to an array (pool)
	document.addEventListener('click', (e) => {
		e.preventDefault();

		//These are for use in general
		const button = e.target;
		const action = button.textContent;

		//These are for the edit and remove buttons
		const oli = button.parentNode;
		const ul = oli.parentNode;
		var children = [];
		children = oli.children;
		const tName = children[0].innerHTML;
		var poolio = 0;

		//This is just to set the value of poolio for use in locating the object within pool
		for (i = 0; i < pool.length; i++) {
				if (tName == pool[i].pName) {
					poolio = i;
				}
			}

		const nameAction = {
			Add: () => {
				const name = document.getElementById('name');
				const init = document.getElementById('init');
				const hp = document.getElementById('hp');
				const ac = document.getElementById('ac');
				const damage = document.getElementById('damage');

				if (name.value) {
					const pName = name.value;
					name.value = '';
					var pInit = init.value;
					init.value = '';
					var pHp = hp.value;
					hp.value = '';
					var pAc = ac.value;
					ac.value = '';
					var pDamage = damage.value;
					damage.value = '';

					pool.push(Player(pName, pInit, pHp, pAc, pDamage));
				} else {
					console.log('You need to enter values into these!');
				}
				
				addIt();
			},
			Remove: () => {
					ul.removeChild(oli);
					var ded = pool.splice(poolio, 1);	
					console.log(poolio);			
				},
			Edit: () => {
				const holder = document.createElement('li');
				holder.setAttribute('class', 'combatants')
				const save = document.createElement('button');
				const remove = document.createElement('button');
				remove.textContent = 'Remove';
				for (i = 0; i < children.length - 2; i++) {
					const value = children[i].innerHTML;
					const nInput = document.createElement('input');
					nInput.type = 'text';
					nInput.value = children[i].innerHTML;
					holder.appendChild(nInput);
				}

				save.textContent = 'Save';
				holder.appendChild(save);
				holder.appendChild(remove);

				ul.insertBefore(holder, oli);
				ul.removeChild(oli);
			},
			Save: () => {
				console.log(pool[poolio]);
			}
		};
		if (action == 'Add') {
			nameAction[action] ();
		} else if (action == 'Remove') {
			nameAction[action] ();
		} else if (action == 'Edit') {
			nameAction[action] ();
		} else if (action == 'Save') {
			nameAction[action] ();
		} else {
			console.log('This isnt a button');
		}


		
	});


	//Let's add some functionality to these buttons

	// combatList.addEventListener('click', (e) => {
	// 	if (e.target.tagName === 'BUTTON') {
	// 		const button = e.target;
	// 		const oli = button.parentNode;
	// 		const ul = oli.parentNode;
	// 		const action = button.textContent;
	// 		var children = [];
	// 		children = oli.children;
	// 		const holder = document.createElement('li');
	// 		holder.setAttribute('class', 'combatants')
	// 		const save = document.createElement('button');
	// 		const remove = document.createElement('button');
	// 		remove.textContent = 'Remove';

	// 		const tName = children[0].innerHTML;
	// 		var poolio = 0;

	// 		for (i = 0; i < pool.length; i++) {
	// 			if (tName == pool[i].pName) {
	// 				poolio = i;
	// 			}
	// 		}



	// 		const nameAction = { 
	// 			Remove: () => {console.log('This is redundant');},
	// 			Edit: () => {
	// 				for (i = 0; i < children.length - 2; i++) {
	// 					const value = children[i].innerHTML;
	// 					const nInput = document.createElement('input');
	// 					nInput.type = 'text';
	// 					nInput.value = children[i].innerHTML;
	// 					holder.appendChild(nInput);
	// 				}

	// 				save.textContent = 'Save';
	// 				holder.appendChild(save);
	// 				holder.appendChild(remove);

	// 				ul.insertBefore(holder, oli);
	// 				ul.removeChild(oli);
	// 			},
	// 			Save: () => {
	// 				var nChildren = [];
	// 				nChildren = oli.children;
	// 				var classes = ['name', 'init', 'hp', 'ac', 'damage'];
	// 				for (i = 0; i < nChildren.length - 2; i++) {
	// 					const span = document.createElement('span');
	// 					span.setAttribute('class', classes[i]);
	// 					span.textContent = nChildren[i].value;
	// 					holder.appendChild(span);
	// 				}
	// 				save.textContent = 'Edit';
	// 				holder.appendChild(save);
	// 				holder.appendChild(remove);

	// 				ul.insertBefore(holder, oli);
	// 				ul.removeChild(oli);
	// 			}
	// 		};
	// 		nameAction[action] ();
	// 	}
	// })

	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS FIlTERS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////


	//Uses createFilters function to make all the filters I need
	const fDead = createFilters('dead', 'Hide those who have died');
	const fInit = createFilters('cInit', 'Sort by initiative');
	const fHP = createFilters('cHp', 'Sort by HP');
	const fAc = createFilters('cAc', 'Sort by Armor Class');
	const fDamage = createFilters('cDamage', 'Sort by Damage');


	//Creating functionality for these filters. I'm just freestyling here. I really have no idea how I'm going to do it but I'll figure it out as I go.
	filters.addEventListener('click', (e) => {
		//contains the target of the checkbox click
		const button = event.target;
		//contains the parent (div) of the checkbox
		const listItem = button.parentNode;
		const triggerB = button.id;
		var numOne;
		var numTwo;
		var holder;

		//Checks which box the user clicked on, and reorders the list based on which box
		if (triggerB == 'cInit') {
			console.log('You just clicked to sort by init');
			for (i = 0; i < pool.length; i++) {
				for (j = i + 1; j < pool.length; j++) {
					numOne = pool[i].pInit;
					numTwo = pool[j].pInit;
					if (numTwo > numOne) {
						holder = pool[j];
						pool[j] = pool[i];
						pool[i] = holder;						
					}
				}
			}
			console.log(pool);
		} else if (triggerB == 'cHp') {
			console.log('You just clicked to sort by HP')
			for (i = 0; i < pool.length; i++) {
				for (j = i + 1; j < pool.length; j++) {
					numOne = pool[i].pHp;
					numTwo = pool[j].pHp;
					if (numTwo > numOne) {
						holder = pool[j];
						pool[j] = pool[i];
						pool[i] = holder;						
					}
				}
			}
			console.log(pool);
		} else if (triggerB == 'cAc') {
			console.log('You just clicked to sort by AC');
			for (i = 0; i < pool.length; i++) {
				for (j = i + 1; j < pool.length; j++) {
					numOne = pool[i].pAc;
					numTwo = pool[j].pAc;
					if (numTwo > numOne) {
						holder = pool[j];
						pool[j] = pool[i];
						pool[i] = holder;						
					}
				}
			}
			console.log(pool);
		} else if (triggerB == 'cDamage') {		
			console.log('You just clicked to sort by Damage')
			for (i = 0; i < pool.length; i++) {
				for (j = i + 1; j < pool.length; j++) {
					numOne = pool[i].pDamage;
					numTwo = pool[j].pDamage;
					if (numTwo > numOne) {
						holder = pool[j];
						pool[j] = pool[i];
						pool[i] = holder;						
					}
				}
			}
			console.log(pool);
		};

		//Empties the element displaying the combat list and then refills it with the reordered array
		combatList.innerHTML = "";
		for (i=0; i<pool.length; i++){
			const li = createCombatant(pool[i].pName, pool[i].pInit, pool[i].pHp, pool[i].pAc, pool[i].pDamage);
			combatList.appendChild(li);
		}
	});
	
});





/////////////////////////////////////////////////////////////////
//TO DO LIST
/////////////////////////////////////////////////////////////////

//Add new rows (combatants) to init list (DONE)
//sort by init roll (ADDED FILTER CHECKBOX, NO FUNCTIONALITY YET) (DONE)
//sort by total HP, (ADDED FILTER CHECKBOX, NO FUNCTIONALITY YET) (DONE)
//sort by AC (ADDED FILTER CHECKBOX, NO FUNCTIONALITY YET) (DONE)
//sort by total damage (ADDED FILTER CHECKBOX, NO FUNCTIONALITY YET) (DONE)
//Filter by dead (ADDED FILTER CHECKBOX, NO FUNCTIONALITY YET) 
//functional edit button
//functional remove button
//made for use by mobile devices
//make a function for the button creation (DONE)
//switch from checkboxes to buttons (change class & styling when a button is 'selected') (DONE)

/////////////////////////////////////////////////////////////////
//STAT CODES
/////////////////////////////////////////////////////////////////

//Constants are titled like the element they represent (hp represents HP, damage represents total damage ect.)
//Direct classes for each element (name, ac, damage, ect.) target the class type of EACH element (targeting 'hp' will target EACH instance of the hp class for each element)
//The stats starting with 'p' (pAc, pInit, ect.) are used for the attributes for the 'Player' class and for the 'createCombatant' function
//The classes starting with 'c' (cDamage, cAc, ect.) are used to target the checkboxes representing that stat
//The variables that start with 't' (tHp, tDamage, ect) are just to fill in the input fields for the edit buttons
//Constants with fHp or fDamage are to create the filters


/////////////////////////////////////////////////////////////////
//WHAT I'VE DONE SO FAR
/////////////////////////////////////////////////////////////////

//Edit and remove buttons dont work. idk why. Working on figuring it out.
//Buttons appear but I haven't given them function yet. The 'span' items in the append to li function aren't filling in. Idk why yet.

//Every time the 'add' button is clicked, creates a class using the fields input by the user
//Creates an element using the above class and appends it to a li
//Adds that li to the 'pool' array
//Every time 'add' is clicked, adds that element to the 'pool' array, clears out the combat tracker ul, and then repopulates it with the contents of 'pool', including the new addition
//Each element in 'pool' has unique attributes representing each input field that can be targeted individually (pName, pInit, pHp, pAc, pDamage)

//April 4, 2019: Starting to keep a log of each time I work on this and what I'm adding to it. Today I reorganized some of my variables and added comments describing the functionality of most of the code in here. Added the rest of the filters. No functionality yet. That's what I'm going to work on now.
//April 9, 2019: Added statement which checks which checkbox user clicks on. Working on adding functionality now.

//May 9, 2019: Finally figured out why the checkboxes only worked sometimes. Got them all working 100% of the time now. I'm going to clean up my code and then add functionality to the 'edit' and 'remove' buttons.

//May 21, 2019: Working on adding functinality to Edit/Remove buttons. It always is a few weeks between whenever I work on this :(. I lied, I'm actually making a function to create the filters to cut down on the code. Finished making the function to create buttons
//May 23, 2019: Ok now I'm going to work on the Edit/Remove buttons.
//May 29, 2019: Finished working on the Edit/Remove buttons and they work but I feel like my code is a bit sloppy. Once I'm done with this project I might try to rewrite it in a way that works better.
//>>additional from last log. Need to change the remove button to take that item off the pool array.
//June 6, 2019: My edit button doesn't actually work. It edits the information on the page but not in the array so whenever I add new names it just goes back to what is in the array




























