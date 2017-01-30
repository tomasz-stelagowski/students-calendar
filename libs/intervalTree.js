define([
	"jquery",
	"underscore"
	], function($, _){
		function TreeConstructor(options){
			if(!(this instanceof TreeConstructor)){
				return new TreeConstructor(options);
			}

			options = options || {size: 0};
			if(typeof options == "number"){
				var size = options;
				options = {size: size};
			}

			_.extend(this, options);

			this.height = Math.ceil( Math.log2( this.size ) );
			this.range = Math.pow(2, this.height);

			this.arr = new Array(2*this.range);


			var self = this;

			function loop(l, r, k){
				var sr = Math.floor((l+r)/2);
				self.arr[k] = {min: l, max: r, maxonrange: 0, k: k, sr: sr, sum: 0};
				
				if(r == l) return;
				
				loop(l, sr, k*2);
				loop(sr+1, r, (k*2)+1);
			}
			loop (1, this.range, 1);

		}

		TreeConstructor.prototype.maxrange = function(x, y) {
			x = Math.max(x, 1);
			y = Math.min(y, this.range)
			var self = this;
			function loop(x, y, k){
				var sr = self.arr[k].sr;
				var wyn;
				if(self.arr[k].min == x && self.arr[k].max == y) {
					wyn = self.arr[k].maxonrange;
				} else if (y <= sr){
					wyn = loop(x, y, k*2);
				} else if (x > sr){
					wyn = loop(x, y, k*2+1);
				} else {
					wyn = Math.max(loop(x, sr, k*2), loop(sr+1, y, k*2+1));
				}
				return (wyn+self.arr[k].sum);
			}
			return (loop(x, y, 1));
		};

		TreeConstructor.prototype.insert = function(x, y, am) {
			x = Math.max(x, 1);
			y = Math.min(y, this.range)
			var self = this;
			function loop(x, y, k){
				var sr = self.arr[k].sr;
				if(self.arr[k].min == x && self.arr[k].max == y) {
					self.arr[k].sum += am;
				} else if (y <= sr){
					loop(x, y, k*2);
				} else if (x > sr){
					loop(x, y, k*2+1);
				} else {
					loop(x, sr, k*2);
					loop(sr+1, y, k*2+1);
				}
				if(k < self.range) self.arr[k].maxonrange = Math.max(self.arr[k*2].maxonrange+self.arr[k*2].sum, 
																	self.arr[k*2+1].maxonrange+self.arr[k*2+1].sum);				
			}
			loop(x, y, 1);
		};



		return TreeConstructor;
})