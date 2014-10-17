define('app', [ 'board' ], 
	function(Board){
	'use strict';

	var board = new Board({container:'.sudoku-board'});
	board.startGame();

});