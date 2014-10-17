define('board', [	
	'jquery'
]
, function($){

	var Board = function(options){
		this.options = options || {};
		
		this.container = $(options.container);

		this._col = options.col || 9;
		this._row = options.row || 9;

	};

	Board.prototype = {
		initialize: function(){
			console.log("Initializing board...");
			this._drawBoard();
		},

		_drawBoard: function() {
			var col, row, cellNumber,
					$row, $col, $board, $cell, $td;

			$board = $('<table>').addClass('sudoku-game');

			for (col = 0; col < this._col; col++){
				$row = $('<tr>');
				for (row = 0; row < this._row; row++){
					cellNumber = this._lookupCellNumber(row, col);
					
					$cell = $('<input>')
									.attr('maxlength', 1)
									.attr('name', 'c'+cellNumber);

					$td = $('<td>').append($cell);
					$row.append($td);
				}
				$board.append($row);
			}

			this.container.append($board);
		},

		_lookupCellNumber: function(row, col){
			return (col * this._col + row);
		}
	};

	return Board;

});