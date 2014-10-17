define('board', [	
	'jquery',
	'game' ]
, function($, Game){

	var Board = function(options){
		this.options = options || {};
		
		this.$container = $(options.container);
		this._col = options.col || 9;
		this._row = options.row || 9;
	};

	Board.prototype = {

		newGame: function(){
			console.log("Starting new game...");
		},

		startGame: function(){
			console.log("Initializing board...");
			this.game = new Game();

			this._addButtons();
			this._drawBoard();
		},

		solveGame: function(){
			console.log("Solving game...");
		},

		_addButtons: function() {
			var that = this,
				$newGame, $solveGame, $buttonBar;

			$newGame = $('<button>')
									.text('New Game')
									.addClass('button')
									.click(function(){
										that.newGame();
									});

			$solveGame = $('<button>')
											.text('Solve Game')
											.addClass('button')
											.click(function(){
												that.solveGame();
											});

			$buttonBar = $('<div>').addClass('action-buttons');
			$buttonBar.append($newGame);
			$buttonBar.append($solveGame);

			this.$container.prepend($buttonBar);
		},

		_drawBoard: function() {
			var col, row, cellNumber, gameData, cellData,
					$row, $board, $cell, $td;

			$board = $('<table>').addClass('sudoku-game');
			gameData = this.game.getGameData();

			for (col = 0; col < this._col; col++){
				$row = $('<tr>');
				for (row = 0; row < this._row; row++){
					
					cellNumber = this._lookupCellNumber(row, col);
					cellData = gameData[cellNumber];

					$cell = $('<input>')
									.attr('maxlength', 1)
									.attr('name', 'c'+cellNumber)
									.val(cellData);


					$td = $('<td>').append($cell);
					$row.append($td);
				}
				$board.append($row);
			}

			this.$container.append($board);
		},

		_lookupCellNumber: function(row, col){
			return (col * this._col + row);
		}
	};

	return Board;

});