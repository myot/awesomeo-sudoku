define('app', [	
	'board'
]
, function(Board){

	this.board = new Board({container:'.sudoku-board'});
	this.board.startGame();

});