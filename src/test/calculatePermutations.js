
const assert = require('assert')

var app = require('../scripts/calculatePermutations.js');


/**
 * UNIT TESTS for calculatePermutations.js
 * 
 * To run: npm run test
 * 
 */
const smallMatrix = [
	[1, 1, 0],
	[0, 1, 0],
	[0, 0, 1],
];
const smallMatrix1 = [
	[1, 1, 0, 0],
	[0, 1, 0, 1],
	[0, 0, 1, 1],
	[0, 0, 0, 1],
];

const mediumMatrix = [
	[1, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0],
	[0, 1, 0, 1, 0, 0],
	[1, 1, 0, 0, 1, 0],
	[1, 0, 1, 0, 0, 1],
];
const largeMatrix = [
	//  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],//0
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],//1
	[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],//2
	[0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0],//3
	[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],//4
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],//5
	[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//6
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],//7
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],//8
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],//9
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],//10
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],//11
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],//12
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],//13
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],//14
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//15
];

function test_CalculatePermutationsClass_medium() {
	it('Test CalculatePermutations class on medium matrix', () => {
		let calculatePermutations = new app._test.CalculatePermutations(mediumMatrix);
		const errorRatesObject = calculatePermutations.getErrorRates();
		const allTopologicalSorts = calculatePermutations.getAllTopologicalSorts();
		const allTransitiveClosures = calculatePermutations.getAllTransitiveClosures();

		assert.equal(allTopologicalSorts.length, 13);
		assert.equal(allTransitiveClosures.length, 18);

		assert.equal(errorRatesObject.randomlyCorrectChance, 0.025);
		assert.equal(errorRatesObject.falsePositiveChance, 0.3846153846153846);

	})
}

function test_CalculatePermutationsClass_small() {
	it('Test CalculatePermutations class on small matrix', () => {
		let calculatePermutations = new app._test.CalculatePermutations(smallMatrix);
		const errorRatesObject = calculatePermutations.getErrorRates();
		assert.equal(errorRatesObject.randomlyCorrectChance, 0.5);
		assert.equal(errorRatesObject.falsePositiveChance, 0);
	});
}
function test_CalculatePermutationsClass_error1() {
	it('Test CalculatePermutations class with cycle error 1', () => {
		currentEdges = [
			[1, 1, 0],
			[1, 1, 0],
			[0, 0, 1],
		];
		let calculatePermutations = new app._test.CalculatePermutations(currentEdges);
		const errorRatesObject = calculatePermutations.getErrorRates();
		assert.equal(errorRatesObject, null);
	});
}
function test_CalculatePermutationsClass_error2() {
	it('Test CalculatePermutations class with cycle error 2', () => {
		currentEdges = [
			[1, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0],
			[0, 0, 1, 1, 0, 0],
			[0, 1, 1, 1, 0, 0],
			[1, 1, 0, 0, 1, 0],
			[1, 0, 1, 0, 0, 1],
		];
		let calculatePermutations = new app._test.CalculatePermutations(currentEdges);
		const errorRatesObject = calculatePermutations.getErrorRates();
		assert.equal(errorRatesObject, null);
	});
}

function test_GraphClosure() {
	it('Test GraphClosure on small matrix', () => {

		transitiveClosureAnswer = [
			[1, 1, 0, 1],
			[0, 1, 0, 1],
			[0, 0, 1, 1],
			[0, 0, 0, 1],
		]

		let graphClosure = new app._test.GraphClosure(4);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(smallMatrix1);

		assert.equal(transitiveClosureMatrix.toString(), transitiveClosureAnswer.toString());
	});
}

function test_GraphClosure1() {
	it('Test GraphClosure class on medium matrix', () => {

		transitiveClosureAnswer = [
			[1, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 0],
			[0, 1, 0, 1, 0, 0],
			[1, 1, 0, 0, 1, 0],
			[1, 1, 1, 1, 0, 1],
		];

		let graphClosure = new app._test.GraphClosure(6);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(mediumMatrix);

		assert.equal(transitiveClosureMatrix.toString(), transitiveClosureAnswer.toString());
	});
}

function test_GraphClosure2() {
	it('Test GraphClosure class on large matrix', () => {
		//https://i.stack.imgur.com/zuLmn.png
		transitiveClosureAnswer = [
			//   0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],//0
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],//1
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],//2
			[0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1],//3
			[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],//4
			[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],//5
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//6
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],//7
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],//8
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],//9
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],//10
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],//11
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],//12
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],//13
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],//14
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//15
		];

		let graphClosure = new app._test.GraphClosure(16);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(largeMatrix);

		assert.equal(transitiveClosureMatrix.toString(), transitiveClosureAnswer.toString());
	});
}
function test_GraphClosure3() {
	it('Test GraphClosure class on medium matrix reaching all', () => {

		currentEdges = [
			[1, 1, 0, 0, 0, 0],
			[0, 1, 1, 0, 0, 0],
			[0, 0, 1, 1, 1, 0],
			[0, 1, 0, 1, 1, 1],
			[1, 1, 0, 0, 1, 1],
			[1, 0, 1, 0, 0, 1],
		];
		transitiveClosureAnswer = [
			[1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1],
		]

		let graphClosure = new app._test.GraphClosure(6);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(currentEdges);

		assert.equal(transitiveClosureMatrix.toString(), transitiveClosureAnswer.toString())
	});
}
function test_countTransitiveClosurePossibilities() {
	it('Test GraphClosure class and CountTransitiveClosurePossibilities class on small matrix', () => {

		let graphClosure = new app._test.GraphClosure(4);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(smallMatrix1);
		let countTransitiveClosurePossibilities = new app._test.CountTransitiveClosurePossibilities(transitiveClosureMatrix);

		let allTransitiveClosures = countTransitiveClosurePossibilities.getAllAnswers();
		assert.equal(allTransitiveClosures.toString(), [[0, 1, 2, 3], [0, 2, 1, 3], [2, 0, 1, 3]].toString());
	});
}
function test_countTransitiveClosurePossibilities1() {
	it('Test GraphClosure class and CountTransitiveClosurePossibilities class on medium matrix', () => {

		expectedAnswer = [
			[5, 2, 0, 4, 3, 1],
			[4, 5, 0, 2, 3, 1],
			[5, 4, 0, 2, 3, 1],
			[5, 2, 4, 0, 3, 1],
			[4, 5, 2, 0, 3, 1],
			[5, 4, 2, 0, 3, 1],
			[5, 2, 3, 4, 0, 1],
			[5, 2, 4, 3, 0, 1],
			[4, 5, 2, 3, 0, 1],
			[5, 4, 2, 3, 0, 1],
			[4, 5, 3, 2, 0, 1],
			[5, 4, 3, 2, 0, 1],
			[5, 2, 3, 4, 1, 0],
			[5, 2, 4, 3, 1, 0],
			[4, 5, 2, 3, 1, 0],
			[5, 4, 2, 3, 1, 0],
			[4, 5, 3, 2, 1, 0],
			[5, 4, 3, 2, 1, 0]
		];

		let graphClosure = new app._test.GraphClosure(6);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(mediumMatrix);
		let countTransitiveClosurePossibilities = new app._test.CountTransitiveClosurePossibilities(transitiveClosureMatrix);

		let allTransitiveClosures = countTransitiveClosurePossibilities.getAllAnswers();

		assert.equal(allTransitiveClosures.length, 18);
		assert.equal(allTransitiveClosures.toString(), expectedAnswer.toString());
	});
}
/**
 * Testing to see if the createLegalPlacements function in the CountTransitiveClosurePossibilities class 
 * returns the correct positions given a medium size matrix
 */
function test_countTransitiveClosurePossibilities2() {
	it('Test functions in CountTransitiveClosurePossibilities class', () => {

		allLegalLinePlacementsExpectedAnswer = [
			[2, 3, 4, 5],
			[4, 5],
			[1, 2, 3],
			[2, 3, 4],
			[0, 1, 2, 3],
			[0, 1]
		];

		let graphClosure = new app._test.GraphClosure(6);
		let transitiveClosureMatrix = graphClosure.transitiveClosure(mediumMatrix);
		let countTransitiveClosurePossibilities = new app._test.CountTransitiveClosurePossibilities(transitiveClosureMatrix);

		let allLegalLinePlacements = countTransitiveClosurePossibilities.legalLinePlacements;
		let emptyArray = new Array(6);
		for (let i = 0; i < emptyArray.length; i++) {
			emptyArray[i] = -1;
		}
		let expectedAnswer = [
			[5, 2, 0, 4, 3, 1],
			[4, 5, 0, 2, 3, 1],
			[5, 4, 0, 2, 3, 1],
			[5, 2, 4, 0, 3, 1],
			[4, 5, 2, 0, 3, 1],
			[5, 4, 2, 0, 3, 1],
			[5, 2, 3, 4, 0, 1],
			[5, 2, 4, 3, 0, 1],
			[4, 5, 2, 3, 0, 1],
			[5, 4, 2, 3, 0, 1],
			[4, 5, 3, 2, 0, 1],
			[5, 4, 3, 2, 0, 1],
			[5, 2, 3, 4, 1, 0],
			[5, 2, 4, 3, 1, 0],
			[4, 5, 2, 3, 1, 0],
			[5, 4, 2, 3, 1, 0],
			[4, 5, 3, 2, 1, 0],
			[5, 4, 3, 2, 1, 0]
		];

		assert.equal(allLegalLinePlacements.length, 6);
		assert.equal(allLegalLinePlacements.toString(), allLegalLinePlacementsExpectedAnswer.toString());
		assert.equal(expectedAnswer.toString(), countTransitiveClosurePossibilities.getAllAnswers().toString());
	});
}
function test_topologicalSort() {
	it('Test TopologicalSort class', () => {
		let matrixLength = 6;
		let graph = new app._test.TopologicalSort(matrixLength);

		let expectedAnswer =
			[[4, 5, 0, 2, 3, 1],
			[4, 5, 2, 0, 3, 1],
			[4, 5, 2, 3, 0, 1],
			[4, 5, 2, 3, 1, 0],
			[5, 2, 3, 4, 0, 1],
			[5, 2, 3, 4, 1, 0],
			[5, 2, 4, 0, 3, 1],
			[5, 2, 4, 3, 0, 1],
			[5, 2, 4, 3, 1, 0],
			[5, 4, 0, 2, 3, 1],
			[5, 4, 2, 0, 3, 1],
			[5, 4, 2, 3, 0, 1],
			[5, 4, 2, 3, 1, 0]];

		let allTopologicalSorts = graph.allTopologicalSorts(mediumMatrix);
		assert.equal(allTopologicalSorts.length, 13);
		assert.equal(allTopologicalSorts.toString(), expectedAnswer.toString());
	});
}
function test_topologicalSort1() {
	it('Test TopologicalSort class when reaching cutoff (Error)', () => {
		const manyTopologicalSortsMatrix = [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//0
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//1
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//2
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//3
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//4
			[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//5
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//6
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],//7
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],//8
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],//9
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],//10
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],//11
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],//12
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],//13
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],//14
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//15
		];
		let graph = new app._test.TopologicalSort(16);
		let allTopologicalSorts = graph.allTopologicalSorts(manyTopologicalSortsMatrix);
		assert.equal(allTopologicalSorts.includes("Aborted topological sorting."), true);

	});
}
function test_topologicalSort2() {
	it('Test TopologicalSort class when reaching cutoff (Error)', () => {
		let graph = new app._test.TopologicalSort(smallMatrix1.length);
		let allTopologicalSorts = graph.allTopologicalSorts(smallMatrix1);

		let expectedAnswer = [
			[0, 1, 2, 3],
			[0, 2, 1, 3],
			[2, 0, 1, 3]
		];
		assert.equal(allTopologicalSorts.toString(), expectedAnswer.toString());

	});
}
/*
let graph = new Graph(6);
	
graph.addEdge(5, 2);
graph.addEdge(5, 0);
graph.addEdge(4, 0);
graph.addEdge(4, 1);
graph.addEdge(2, 3);
graph.addEdge(3, 1);
/*
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(5, 6);
	
console.log("All topological sorts")
console.log(graph.allTopologicalSorts());
	
let graphClosure = new GraphClosure(6);
	
let transitiveClosureMatrix = graphClosure.transitiveClosure(currentEdges);
let TCPossibilities = new CountTransitiveClosurePossibilities(transitiveClosureMatrix);
*/

test_CalculatePermutationsClass_medium();
test_CalculatePermutationsClass_small();
test_CalculatePermutationsClass_error1();
test_CalculatePermutationsClass_error2();

test_GraphClosure();
test_GraphClosure1();
test_GraphClosure2();
test_GraphClosure3();

test_countTransitiveClosurePossibilities();
test_countTransitiveClosurePossibilities1();
test_countTransitiveClosurePossibilities2();

test_topologicalSort();
test_topologicalSort1();
test_topologicalSort2();