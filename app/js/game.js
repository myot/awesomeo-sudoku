define('game', [ 'wikipedia_game_data'], 
	function(WikipediaGameData){
	'use strict';

	var Game = function(){ 
		this.initialize(); 
	};

	Game.prototype = {
		initialize: function(){
			//Generate game data to draw
			//For now, use the rig data from hardcoded data
			this.gameData = WikipediaGameData.generateData();
			
			//Store User input here
			this.userData = [];
		},

		solve: function(){
			var i, length;

			length = this.gameData.length;
			for (i=0; i<length; i++){
				if (this.gameData[i].val !== this.userData[i]){
					return false;
				}
			}

			return true;
		},

		getGameData: function(){
			return this.gameData;
		},

		setData: function(cellNumber, val){
			this.userData[cellNumber] = val;
		},

		getData: function(cellNumber){
			return this.userData[cellNumber];
		}
	};

	return Game;
});