//https://www.geeksforgeeks.org/all-topological-sorts-of-a-directed-acyclic-graph/

class CalculatePermutations {
	constructor(currentEdges) {
		this.permutationsCutoff = 2000;

		this.allTransitiveClosures = [];
		this.allTopologicalSorts = [];
		if (currentEdges.length > 0) {
			this.noOfVertices = currentEdges.length;
			this.runTransitiveClosure(currentEdges);
			this.runTopologicalSort(currentEdges);
		}
	}

	runTransitiveClosure(currentEdges) {
		let graphClosure = new GraphClosure(this.noOfVertices);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(currentEdges);
		let countTransitiveClosurePossibilities = new CountTransitiveClosurePossibilities(transitiveClosureMatrix);

		this.allTransitiveClosures = countTransitiveClosurePossibilities.getAllAnswers();
		this.checkIfTooManyPermutations();
		//console.log("All transitive closures")
		//console.log(this.allTransitiveClosures)

	}

	runTopologicalSort(currentEdges) {
		let graph = new TopologicalSort(this.noOfVertices);

		this.allTopologicalSorts = graph.allTopologicalSorts(currentEdges);
		this.checkIfTooManyPermutations();
		//console.log("All topological sorts")
		//console.log(this.allTopologicalSorts)

	};
	checkIfTooManyPermutations(){
		if (Array.isArray(this.allTopologicalSorts) && Array.isArray(this.allTransitiveClosures)){
			if (this.allTopologicalSorts.length >= this.permutationsCutoff || this.allTransitiveClosures.length >= this.permutationsCutoff) {
				this.allTopologicalSorts = "More than " + this.permutationsCutoff + " permutations were made. Aborting due to high number of permutations.";
				this.allTransitiveClosures = "More than " + this.permutationsCutoff + " permutations were made. Aborting due to high number of permutations.";
				return true;
			}
		}
		return false;

	}

	factorialize(num) {
		if (num < 0)
			return -1;
		else if (num == 0)
			return 1;
		else {
			return (num * this.factorialize(num - 1));
		}
	}

	getAllTransitiveClosures() {
		return this.allTransitiveClosures;
	}
	getAllTopologicalSorts() {
		return this.allTopologicalSorts;
	}
	getAllFalsePositives() {
		let falsePositives = [];
		if(this.checkIfTooManyPermutations()){
			return "More than " + this.permutationsCutoff + " permutations were made. Aborting due to high number of permutations.";
		}
		if (Array.isArray(this.allTopologicalSorts) && Array.isArray(this.allTransitiveClosures) && this.allTopologicalSorts.length != this.allTransitiveClosures.length) {
			for (let i = 0; i < this.allTransitiveClosures.length; i++) {
				let transitiveClosure = this.allTransitiveClosures[i];
				if (!this.isItemInArray(this.allTopologicalSorts, transitiveClosure)) {
					falsePositives.push(transitiveClosure)
				}
			}
		}
		return falsePositives;

	}
	isItemInArray(array, item) {
		for (var i = 0; i < array.length; i++) {
			// This if statement depends on the format of your array
			if (array[i].toString() == item.toString()) {
				return true;   // Found it
			}
		}
		return false;   // Not found
	}

	getErrorRates() {
		//Is not a directed asyclic graph
		if (!this.allTopologicalSorts[0] || this.allTopologicalSorts[0].length !== this.noOfVertices || !this.allTransitiveClosures[0] || this.allTransitiveClosures[0].length !== this.noOfVertices) {
			return null;
		}
		//let falsePositiveChance = (this.allTransitiveClosures.length / this.allTopologicalSorts.length) - 1;
		let randomlyCorrectChance = (this.allTransitiveClosures.length / this.factorialize(this.noOfVertices));
		return randomlyCorrectChance;
	};
}

class CountTransitiveClosurePossibilities {

	constructor(transitiveClosureMatrix) {
		this.noOfVertices = transitiveClosureMatrix.length;
		this.allAnswers = [];
		this.cutoff = 30000;
		this.currentDepth = 0;
		this.legalLinePlacements = this.createLegalPlacements(transitiveClosureMatrix);
		let emptyArray = new Array(this.noOfVertices);
		for (let i = 0; i < emptyArray.length; i++) {
			emptyArray[i] = -1;
		}
		this.placeNextNumber(emptyArray, 0);
		console.log(this.currentDepth)

		//console.log(this.allAnswers);
	}
	getAllAnswers() {
		if (this.currentDepth >= this.cutoff) {
			return "More than " + this.cutoff + " in depth were reached. Aborted transitive closure."
		}
		return this.allAnswers;
	}

	createLegalPlacements(transitiveClosureMatrix) {
		let nrEdgesOut = []; //Must be AFTER
		for (let i = 0; i < this.noOfVertices; i++) {
			let sum = 0;
			for (let j = 0; j < this.noOfVertices; j++) {
				sum += transitiveClosureMatrix[i][j];
			}
			nrEdgesOut[i] = sum - 1;
		}
		let nrEdgesIn = []; //Must be BEFORE
		for (let i = 0; i < this.noOfVertices; i++) {
			let sum = 0;
			for (let j = 0; j < this.noOfVertices; j++) {
				sum += transitiveClosureMatrix[j][i];
			}
			nrEdgesIn[i] = sum - 1;
		}

		let legalLinePlacements = new Array(this.noOfVertices);
		for (let i = 0; i < this.noOfVertices; i++) {
			legalLinePlacements[i] = [];
			for (let j = 0; j < this.noOfVertices; j++) {
				if (j >= nrEdgesIn[i] && j < (this.noOfVertices - nrEdgesOut[i])) {
					legalLinePlacements[i].push(j);
				};
			}
			//legalLinePlacements[i] = indexList.slice(nrEdgesIn[i],(indexList.length-nrEdgesOut[i]))
		}
		//console.log("Legal placements")
		//console.log(legalLinePlacements);
		return legalLinePlacements;

	}

	/**
	 * Recursively finds all permutations of the code lines.
	 * 
	 * this.legalLinePlacements is a 2D array where each element is all the legal positions
	 * of that code line.
	 * Eks: [
	 * [0,1], //Line 0 can be placed on position 0 and 1
	 * [1,2,3], //Line 1 can be placed on position 1,2 and 3
	 * [2,3], //Line 2 can be placed on position 2 and 3
	 * [1,2,3] //Line 3 can be placed on position 1,2 and 3
	 * ]
	 * 
	 * The function recursively tries every single position for each line, starting with line 0.
	 * 
	 * @param {Array} filledListOld The array to be filled out with the lines in different positions. Starts as [-1,-1,-1...].
	 * @param {Number} lineNumber Line number we are checking in current recursive call. Starts with line 0.
	 */
	placeNextNumber(filledListOld, lineNumber) {
		this.currentDepth += 1;
		if (this.currentDepth >= this.cutoff) {
			return;

		}
		//For each legal positions to this lineNumber
		for (let i = 0; i < this.legalLinePlacements[lineNumber].length; i++) {
			let filledList = [...filledListOld]; //Make copy to avoid working on same arrays
			//Can be placed on the following index
			let legalPlacementIndex = this.legalLinePlacements[lineNumber][i];
			//If this index is free, place the lineNumber here
			if (filledList[legalPlacementIndex] === -1 && !filledList.includes(lineNumber)) {
				filledList[legalPlacementIndex] = lineNumber;
				//If array is complete now, add to allAnswers
				if (lineNumber + 1 === this.noOfVertices) {
					this.allAnswers.push(filledList)
				}
				//If not, go deeper
				else {
					this.placeNextNumber(filledList, lineNumber + 1);
				}

			}
		}
	}
}

class TopologicalSort {

	constructor(noOfVertices) {
		this.noOfVertices = noOfVertices;
		this.solutionsMade = 0;
		this.cutoff = 20000; //If the solutionsMade ever exceeds the cutoff, cancel it! Can get crazy high

		this.allAnswers = [];

		this.adjListArray = new LinkedList(noOfVertices);

		for (let i = 0; i < this.noOfVertices; i++) {
			this.adjListArray[i] = new LinkedList(0);
		}
	};

	addEdge(src, dest) {
		this.adjListArray[src].add(dest);
	}

	allTopologicalSortsUtil(visited, indegree, stack) {
		//If we have gone too deep, stop everything. Factorial numbers are dangerous! Just 8!=40k
		let cutoffErrorMessage = "More than " + this.cutoff + " solutions were made. Aborted topological sorting.";
		if (this.solutionsMade > this.cutoff) {
			return cutoffErrorMessage;
		}
		let flag = false;

		for (let i = 0; i < this.noOfVertices; i++) {
			if (!visited[i] && indegree[i] == 0) {
				visited[i] = true;
				stack.push(i);
				//console.log(stack)
				let canGoDeeper = true;
				let node = this.adjListArray[i] && this.adjListArray[i].head;
				while (node && canGoDeeper) {
					indegree[node.element]--;
					if (node.next !== null) {
						node = node.next;
					}
					else {
						canGoDeeper = false;
					}
				};
				this.allTopologicalSortsUtil(visited, indegree, stack);

				visited[i] = false;
				stack.pop();
				canGoDeeper = true;
				node = this.adjListArray[i] && this.adjListArray[i].head;
				while (node && canGoDeeper) {
					indegree[node.element]++;
					if (node.next !== null) {
						node = node.next;
					}
					else {
						canGoDeeper = false;
					}
				};
				flag = true;
			}
		}
		if (this.solutionsMade > this.cutoff) {
			return cutoffErrorMessage;
		}
		if (!flag) {
			this.solutionsMade++;
			//console.log(this.solutionsMade);
			const newStack = [...stack];
			this.allAnswers.push(newStack);
		}
	}
	makeMatrixIntoEdges(currentEdges) {
		for (let i = 0; i < this.noOfVertices; i++) {
			for (let j = 0; j < this.noOfVertices; j++) {
				if (currentEdges[i][j] === 1 && i !== j) {
					this.addEdge(i, j);
				}
			}
		}
	}
	allTopologicalSorts(currentEdges) {
		this.makeMatrixIntoEdges(currentEdges);

		let visited = new Array(this.noOfVertices);
		let indegree = new Array(this.noOfVertices);
		for (let i = 0; i < this.noOfVertices; i++) {
			indegree[i] = 0;
		}
		for (let i = 0; i < this.noOfVertices; i++) {
			let canGoDeeper = true;
			let node = this.adjListArray[i] && this.adjListArray[i].head;
			while (node && canGoDeeper) {
				indegree[node.element]++;
				if (node.next !== null) {
					node = node.next;
				}
				else {
					canGoDeeper = false;
				}
			};
		}
		let stack = [];
		let errorMessage = this.allTopologicalSortsUtil(visited, indegree, stack);
		if (errorMessage) {
			return errorMessage;
		}
		return this.allAnswers;
	}

}
// linkedlist class 
class LinkedList {
	constructor(length) {
		this.head = null;
		this.size = length;
	}

	// functions to be implemented 
	// add(element) 
	// adds an element at the end 
	// of list 
	add(element) {
		// creates a new node 
		var node = new Node(element);

		// to store current node 
		var current;

		// if list is Empty add the 
		// element and make it head 
		if (this.head == null)
			this.head = node;
		else {
			current = this.head;

			// iterate to the end of the 
			// list 
			while (current.next) {
				current = current.next;
			}

			// add node 
			current.next = node;
		}
		this.size++;
	}
	// insert element at the position index 
	// of the list 
	insertAt(element, index) {
		if (index > 0 && index > this.size)
			return false;
		else {
			// creates a new node 
			var node = new Node(element);
			var curr, prev;

			curr = this.head;

			// add the element to the 
			// first index 
			if (index == 0) {
				node.next = head;
				this.head = node;
			} else {
				curr = this.head;
				var it = 0;

				// iterate over the list to find 
				// the position to insert 
				while (it < index) {
					it++;
					prev = curr;
					curr = curr.next;
				}

				// adding an element 
				node.next = curr;
				prev.next = node;
			}
			this.size++;
		}
	}

	// removes an element from the 
	// specified location 
	removeFrom(index) {
		if (index > 0 && index > this.size)
			return -1;
		else {
			var curr, prev, it = 0;
			curr = this.head;
			prev = curr;

			// deleting first element 
			if (index === 0) {
				this.head = curr.next;
			} else {
				// iterate over the list to the 
				// position to removce an element 
				while (it < index) {
					it++;
					prev = curr;
					curr = curr.next;
				}

				// remove the element 
				prev.next = curr.next;
			}
			this.size--;

			// return the remove element 
			return curr.element;
		}
	}

	// insertAt(element, location) 
	// removeFrom(location) 
	// removeElement(element) 

	// Helper Methods 
	// isEmpty 
	// size_Of_List 
	// PrintList 
}
// User defined class node 
class Node {
	// constructor 
	constructor(element) {
		this.element = element;
		this.next = null
	}
}

class GraphClosure {
	constructor(noOfVertices) {
		this.noOfVertices = noOfVertices;
	}

	transitiveClosure(graph) {
		let reach = new Array(this.noOfVertices);

		for (let i = 0; i < reach.length; i++) {
			reach[i] = new Array(this.noOfVertices);
		}
		let i, j, k;

		for (i = 0; i < this.noOfVertices; i++) {
			for (j = 0; j < this.noOfVertices; j++) {
				reach[i][j] = graph[i][j];
			}
		}

		for (k = 0; k < this.noOfVertices; k++) {
			for (i = 0; i < this.noOfVertices; i++) {
				for (j = 0; j < this.noOfVertices; j++) {
					reach[i][j] = (reach[i][j] != 0) || ((reach[i][k] != 0) && (reach[k][j] != 0)) ? 1 : 0;

				}
			}
		}
		return reach;
	}

}

module.exports._test = {
	CalculatePermutations: CalculatePermutations,
	GraphClosure: GraphClosure,
	CountTransitiveClosurePossibilities: CountTransitiveClosurePossibilities,
	TopologicalSort: TopologicalSort,
}