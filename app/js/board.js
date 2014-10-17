define('board', [ 'jquery', 'game' ], 
	function($, Game){
	'use strict';

	var Board = function(options){
		this.options = options || {};
		
		this.$container = $(options.container);

		this._col = options.col || 9;
		this._row = options.row || 9;
	};

	Board.prototype = {

		newGame: function(){
			console.log("Starting new game...");
			
			this.$container.empty();
			this.startGame();
		},

		startGame: function(){
			console.log("Initializing board...");
			
			//Init Game data.
			this.game = new Game();

			//Init UI.
			this._addButtons();
			this._addMessageBar();
			this._drawBoard();
		},

		solveGame: function(){
			console.log("Solving game...");

			if (this.game.solve()){
				//congrats!
				console.log("Congratulations!");
			} else {
				//oh oh..
				console.log("Try again?");
			}
		},

		_addMessageBar: function() {
			this.$message = $('<div>').addClass('message-bar');
			this.$container.append(this.$message);
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

			this.$container.append($buttonBar);
		},

		_drawBoard: function() {
			var col, row, cellNumber, gameData, cellData,
					gridX, gridY, evenGrid,
					$row, $board, $cell, $td;

			$board = $('<table>').addClass('sudoku-game');
			gameData = this.game.getGameData();

			for (col = 0; col < this._col; col++){
				$row = $('<tr>');
				gridY = Math.floor(col / 3);

				for (row = 0; row < this._row; row++){
					
					cellNumber = this._lookupCellNumber(row, col);
					cellData = gameData[cellNumber];
					gridX = Math.floor(row / 3);

					//cache user data with the data with we are going to show by default
					this.game.setData(cellNumber, (cellData.show ? cellData.val : 0));

					evenGrid = ((gridX + gridY) % 2 === 0);

					$cell = $('<input>')
									.attr('maxlength', 1)
									.data('cell', cellNumber)
									.change(this, this._onUserInput);

					if (cellData.show){
						$cell.val(cellData.val).attr('disabled', true);
					}


					$td = $('<td>')
									.addClass(evenGrid? 'even' : 'odd')
									.append($cell);
					$row.append($td);
				}
				$board.append($row);
			}

			this.$container.append($board);
		},

		_onUserInput: function(event){
			var context = event.data,
					$cell = $(event.target),
					cellNumber = $cell.data('cell'),
					val = $cell.val(),
					oldValue = context.game.getData(cellNumber); //remember the old value in case we want to rollback

			if (context._validateCell(cellNumber, val)) {
				context.game.setData(cellNumber, parseInt(val, 10));
				context.$message.html('');
			} else {
				$cell.val(oldValue > 0 ? oldValue : '');
				$cell.focus();
				context.$message.html('Invalid input!');
			}

		},

		_validateCell: function(cellNumber, val){
			if (isNaN(val)){
				return false;
			}

			var row, col, i, j, gridStartX, gridStartY,
					num = parseInt(val, 10);

			//check for validity in row
			row = Math.floor(cellNumber / this._row);
			for (i=0; i < this._row; i++){
				if (this.game.getData((row*this._row)+i) === num){
					return false;
				}
			}

			//check for validity in col
			col = cellNumber % this._col;
			for (j=0; j < this._col; j++){
				if (this.game.getData((j*this._col)+col) === num){
					return false;
				}
			}

			//check for validity in sub-grid
			gridStartX = row - row % 3;
			gridStartY = col - col % 3;
			for (i=gridStartX; i<gridStartX+3; i++){
				for (j=gridStartY; j<gridStartY+3; j++){
					if (this.game.getData((i*this._row)+j) === num){
						return false;
					}
				}
			}
			return true;
		},

		_lookupCellNumber: function(row, col){
			return (col * this._col + row);
		}
	};

	return Board;

});