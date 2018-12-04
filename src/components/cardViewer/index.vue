<template>
	<canvas id="cardImg"></canvas>
</template>

<script>
	function cardTxt(id) {
		this.id = id;
		this.font = "微软雅黑";
		this.visible = true;
		this.type = "txt";
		this.lock = false;
		this.setTxt = function(x, y, w, fs, color, txt, align, space) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = fs + 4;
			this.fs = fs;
			this.color = color;
			this.txt = txt;
			this.align = align;
			this.space = space;
		}
		this.clone = function(o) {
			for(var k in o) {
				if(typeof(o[k]) != "function") {
					this[k] = o[k];
				}
			}
		}
		this.draw = function(ctx) {
			if(!this.visible)
				return;
			ctx.textAlign = this.align;
			ctx.textBaseline = "top";
			ctx.fillStyle = this.color;
			ctx.font = this.fs + "px " + this.font;
			var ox = 0;
			var oy = 0;
			for(var i = 0; i < this.txt.length; i++) {
				ctx.fillText(this.txt[i], this.x + ox, this.y + oy);
				//var size = GetCharSize(this.txt.charCodeAt(i));
				//ox += this.fs * size / 2 + this.space;
				ox += ctx.measureText(this.txt[i]).width + this.space;
				if(ox > this.w) {
					ox = 0;
					oy += this.fs + 4;
				}
			}
		}
		this.mouseinit = function(x, y) {
			if(!this.visible)
				return false;
			if(x > this.x && y > this.y && x < this.x + this.w && y < this.y + this.h)
				return true;
			return false;
		}
		this.mousedown = function(x, y) {
			if(!this.visible)
				return null;
			if(this.mouseinit(x, y))
				return this;
			return null;
		}
		this.mousemove = function(x, y) {
			if(!this.visible)
				return null;
			if(this.mouseinit(x, y))
				return this;
			return null;
		}
		this.mouseup = function(x, y) {

		}
	}

	function cardImg(id) {
		this.id = id;
		this.type = "img";
		this.round = false;
		this.lock = false;
		this.setURL = function(url) {
			this.url = url;
			this.img = new Image();
			this.img.src = url;
			this.visible = true;
			this.img.onload = function() {
				this.loadover = true;
			}
		}
		this.setImg = function(x, y, w, h, url) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.setURL(url);
		}
		this.clone = function(o) {
			for(var k in o) {
				if(typeof(o[k]) != "function") {
					this[k] = o[k];
				}
			}
		}
		this.draw = function(ctx) {
			if(!this.visible)
				return;
			if(this.img == null)
				return;
			if(this.round) {
				ctx.save();
				ctx.beginPath();
				var a = this.w / 2;
				var b = this.h / 2;
				var x = this.x + this.w / 2;
				var y = this.y + this.h / 2;
				var k = .5522848;
				var ox = a * k;
				var oy = b * k;
				ctx.moveTo(x - a, y);
				ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
				ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
				ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
				ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
				ctx.closePath();
				ctx.clip();
				ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h);
				ctx.restore();
				return;
			}
			ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h);
		}
		this.mouseinit = function(x, y) {
			if(!this.visible)
				return false;
			if(x > this.x && y > this.y && x < this.x + this.w && y < this.y + this.h)
				return true;
			return false;
		}
		this.mousedown = function(x, y) {
			if(!this.visible)
				return null;
			if(this.mouseinit(x, y))
				return this;
			return null;
		}
		this.mousemove = function(x, y) {
			if(!this.visible)
				return null;
			if(this.mouseinit(x, y))
				return this;
			return null;
		}
		this.mouseup = function(x, y) {

		}
	}

	function cardData() {
		this.w = 500;
		this.h = 250;
		this.item = [];
		this.itemId = 0;
		//		var bg = new cardImg("bg");
		//		bg.setImg(0, 0, this.w, this.h, defaultBg);
		//		bg.lock = true;
		//		this.item.push(bg);
		//		var face = new cardImg("face");
		//		face.setImg(10, 30, 150, 150, defaultFace);
		//		this.item.push(face);
		//		var name = new cardTxt("name");
		//		name.setTxt(200, 30, 200, 16, "#00F", "Name", "left", 0);
		//		this.item.push(name);
		//		var career = new cardTxt("career");
		//		career.setTxt(200, 50, 200, 16, "#00F", "Career", "left", 0);
		//		this.item.push(career);
		//		var companyName = new cardTxt("companyName");
		//		companyName.setTxt(10, 10, 200, 16, "#00F", "companyName", "left", 0);
		//		this.item.push(companyName);
		//		var address = new cardTxt("address");
		//		address.setTxt(10, 200, 200, 16, "#00F", "address", "left", 0);
		//		this.item.push(address);
		//		var mail = new cardTxt("mail");
		//		mail.setTxt(200, 70, 200, 16, "#00F", "mail", "left", 0);
		//		this.item.push(mail);
		//		var phone = new cardTxt("phone");
		//		phone.setTxt(200, 90, 200, 16, "#00F", "phone", "left", 0);
		//		this.item.push(phone);
		//		var mobile = new cardTxt("mobile");
		//		mobile.setTxt(200, 110, 200, 16, "#00F", "mobile", "left", 0);
		//		this.item.push(mobile);

		this.loadJSON = function(json) {
			var obj = JSON.parse(json);
			this.w = obj.w;
			this.h = obj.h;
			this.itemId = obj.itemId;
			this.item = [];
			for(var i = 0; i < obj.item.length; i++) {
				var item = obj.item[i];
				if(item.type == "txt") {
					var txt = new cardTxt();
					txt.clone(item);
					this.item.push(txt);
				} else if(item.type == "img") {
					var img = new cardImg();
					img.clone(item);
					img.setURL(img.url);
					this.item.push(img);
				}
			}
		}
		this.getItem = function(id) {
			for(var i = 0; i < this.item.length; i++) {
				var item = this.item[i];
				if(item.id == id)
					return item;
			}
			return null;
		}
		this.addTxt = function() {
			this.itemId++;
			var txt = new cardTxt(this.itemId);
			txt.add = true;
			txt.setTxt(this.w / 2, this.h / 2, 200, 16, "#00F", "新增文本" + txt.id, "left", 0);
			this.item.push(txt);
		}
		this.addImg = function() {
			this.itemId++;
			var img = new cardImg(this.itemId);
			img.add = true;
			img.txt = "新增图片" + img.id;
			img.setImg(this.w / 2 - 50, this.h / 2 - 50, 100, 100, defaultImg);
			this.item.push(img);
		}
		this.deleteItem = function(item) {
			var index = this.item.indexOf(item);
			this.item.splice(index, 1);
		}
	}

	function cardOper(vue) {
		this.vue = vue;
		this.resize = false;
		this.init = function(data) {
			this.data = data;
			this.cav = document.getElementById("cardImg");
			this.cav.width = this.data.w;
			this.cav.height = this.data.h;
			this.ctx = this.cav.getContext("2d");
			setInterval(this.draw.bind(this), 25);
			//this.cav.addEventListener("mousedown", this.mousedown.bind(this));
			//this.cav.addEventListener("mousemove", this.mousemove.bind(this));
			//this.cav.addEventListener("mouseup", this.mouseup.bind(this));
			//this.cav.addEventListener("mouseout", this.mouseout.bind(this));
		}
		this.useCardInfor = function(){
			var name = this.data.getItem("name");
			name.txt = this.vue.cardInfor.card_name;
			var face = this.data.getItem("face");
			face.setURL(this.vue.cardInfor.image);
			var career = this.data.getItem("career");
			career.txt = this.vue.cardInfor.job;
			var companyName = this.data.getItem("companyName");
			companyName.txt = this.vue.cardInfor.company;			
			var mail = this.data.getItem("mail");
			mail.txt = this.vue.cardInfor.email;
			var phone = this.data.getItem("phone");
			phone.txt = this.vue.cardInfor.tel;			
			var mobile = this.data.getItem("mobile");
			mobile.txt = this.vue.cardInfor.phone;
			var weixin = this.data.getItem("weixin");
			weixin.txt = this.vue.cardInfor.weixin;
			var address = this.data.getItem("address");
			address.txt = this.vue.cardInfor.address;
		}
		this.draw = function() {
			this.useCardInfor();
			this.ctx.clearRect(0, 0, this.cav.width, this.cav.height);
			if(!this.data)
				return;
			for(var i = 0; i < this.data.item.length; i++) {
				var item = this.data.item[i];
				item.draw(this.ctx);
			}
			this.drawMove(this.ctx);
			this.drawDown(this.ctx);
		}
		this.drawMove = function(ctx) {
			if(this.nowMove == null)
				return;
			ctx.beginPath();
			ctx.strokeStyle = "#CCC";
			ctx.lineWidth = 2;
			ctx.strokeRect(this.nowMove.x, this.nowMove.y, this.nowMove.w, this.nowMove.h);
		}
		this.drawDown = function(ctx) {
			if(this.nowDown == null)
				return;
			ctx.beginPath();
			ctx.strokeStyle = "#CCC";
			ctx.lineWidth = 2;
			ctx.strokeRect(this.nowDown.x, this.nowDown.y, this.nowDown.w, this.nowDown.h);

			ctx.fillStyle = "#FFF";
			ctx.fillRect(this.nowDown.x + this.nowDown.w - 3, this.nowDown.y + this.nowDown.h - 3, 6, 6);
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.strokeRect(this.nowDown.x + this.nowDown.w - 3, this.nowDown.y + this.nowDown.h - 3, 6, 6);
		}
		this.inresize = function(x, y) {
			if(this.nowDown == null)
				return false;
			if(x > this.nowDown.x + this.nowDown.w - 3 && x < this.nowDown.x + this.nowDown.w + 3 && y > this.nowDown.y + this.nowDown.h - 3 && y < this.nowDown.y + this.nowDown.h + 3)
				return true;
			return false;
		}
		this.mousedown = function(e) {
			this.mdx = e.layerX;
			this.mdy = e.layerY;
			this.md = true;
			if(this.inresize(this.mdx, this.mdy)) {
				this.resize = true;
				return;
			}
			this.nowDown = null;
			for(var i = 0; i < this.data.item.length; i++) {
				var item = this.data.item[this.data.item.length - i - 1];
				var ret = item.mousedown(e.layerX, e.layerY);
				if(ret != null) {
					this.nowDown = ret;
					this.oriX = this.nowDown.x;
					this.oriY = this.nowDown.y;
					this.oriW = this.nowDown.w;
					this.oriH = this.nowDown.h;
					this.vue.nowEdit = this.nowDown;
					break;
				}
			}
		}
		this.mousemove = function(e) {
			this.mmx = e.layerX;
			this.mmy = e.layerY;
			if(this.resize && !this.nowDown.lock) {
				this.nowDown.w = this.oriW + this.mmx - this.mdx;
				this.nowDown.h = this.oriH + this.mmy - this.mdy;
				if(this.nowDown.w < 3)
					this.nowDown.w = 3
				if(this.nowDown.h < 3)
					this.nowDown.h = 3
				return;
			}
			if(this.md) {
				if(this.nowDown != null && !this.nowDown.lock) {
					this.nowDown.x = this.oriX + this.mmx - this.mdx;
					this.nowDown.y = this.oriY + this.mmy - this.mdy;
				}
				return;
			}
			this.nowMove = null;
			for(var i = 0; i < this.data.item.length; i++) {
				var item = this.data.item[this.data.item.length - i - 1];
				var ret = item.mousemove(e.layerX, e.layerY);
				if(ret != null) {
					this.nowMove = ret;
					break;
				}
			}
		}
		this.mouseup = function(e) {
			this.md = false;
			this.resize = false;
			for(var i = 0; i < this.data.item.length; i++) {
				var item = this.data.item[this.data.item.length - i - 1];
				item.mouseup(e.layerX, e.layerY);
			}
		}
		this.mouseout = function() {
			this.md = false;
			this.resize = false;
		}
	}

	function GetCharSize(code) {
		var ret = 0;
		if(code > 127 || code == 94) {
			return 2;
		} else {
			return 1;
		}
		return 2;
	}

	export default {
		name: 'cardViewer',
		components: {

		},
		data() {
			return {
				cardData: new cardData(),
				cardOper: new cardOper(this),
				cardInfor: {}
			}
		},
		methods: {
			loadData(json, cardinfor) {
          		this.cardInfor = cardinfor;
				this.cardData.loadJSON(json);
				this.cardOper.init(this.cardData);
			}
		},
		watch: {

		},
		computed: {

		},
		mounted() {

		}
	}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
	#cardImg {
		width: 100%;
	}
</style>