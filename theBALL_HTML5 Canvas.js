(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"theBALL_HTML5 Canvas_atlas_1", frames: [[0,930,1397,758],[0,0,1827,928]]},
		{name:"theBALL_HTML5 Canvas_atlas_2", frames: [[0,0,1384,751],[0,753,1384,751]]},
		{name:"theBALL_HTML5 Canvas_atlas_3", frames: [[0,753,1378,676],[0,0,1384,751]]},
		{name:"theBALL_HTML5 Canvas_atlas_4", frames: [[0,678,1375,601],[0,0,1378,676],[0,1281,1375,601]]},
		{name:"theBALL_HTML5 Canvas_atlas_5", frames: [[0,681,1373,527],[0,1210,1373,527],[0,0,1143,679]]},
		{name:"theBALL_HTML5 Canvas_atlas_6", frames: [[0,1328,1368,377],[0,420,1370,452],[0,874,1370,452],[0,0,1623,418]]},
		{name:"theBALL_HTML5 Canvas_atlas_7", frames: [[0,379,1366,303],[0,0,1368,377],[0,684,1366,303],[0,989,909,418],[911,989,728,433],[0,1409,728,433],[730,1424,728,433]]},
		{name:"theBALL_HTML5 Canvas_atlas_8", frames: [[1732,0,303,342],[1688,772,297,341],[1631,1115,297,341],[1631,1458,297,341],[527,1296,382,266],[0,1098,374,293],[1363,742,323,354],[723,1564,238,426],[0,1591,239,426],[911,1098,238,426],[241,1591,239,426],[482,1591,239,426],[963,1526,238,426],[1151,1098,238,426],[1203,1526,238,426],[1391,1098,238,426],[1732,344,239,426],[0,772,1358,80],[0,460,1361,154],[0,0,1363,228],[0,230,1363,228],[0,616,1361,154],[0,854,1358,80],[1365,0,365,369],[1365,371,365,369],[0,1393,525,196],[1443,1801,525,191],[376,1098,525,196]]},
		{name:"theBALL_HTML5 Canvas_atlas_9", frames: [[835,0,302,312],[1731,423,254,232],[212,552,254,232],[835,412,387,219],[1139,0,386,244],[0,257,210,404],[1694,0,202,421],[387,0,223,428],[612,0,221,428],[468,552,254,232],[0,0,385,255],[724,667,528,106],[1224,423,505,120],[212,430,505,120],[1254,667,528,106],[1139,246,553,164],[1224,545,505,120]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_74 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(img.CachedBmp_21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2203,1266);


(lib.CachedBmp_20 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_9"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["theBALL_HTML5 Canvas_atlas_8"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2135,954);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2145,1224);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("wolt", "italic bold 15px 'Sitka Banner'", "#3300FF");
	this.text.textAlign = "center";
	this.text.lineHeight = 24;
	this.text.lineWidth = 34;
	this.text.parent = this;
	this.text.setTransform(26.707,16.3486,1,1,-0.779);

	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(-53.05,-60.05,0.3507,0.3507);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53,-60,106.2,119.9);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("wolt", "italic bold 15px 'Sitka Banner'", "#3300FF");
	this.text.textAlign = "center";
	this.text.lineHeight = 24;
	this.text.lineWidth = 34;
	this.text.parent = this;
	this.text.setTransform(27.9551,13.2948,1,1,-7.738);

	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(-58.5,-60.5,0.387,0.387);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.5,-60.5,116.9,120.8);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-57.65,-66.3,0.3889,0.3889);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.6,-66.3,115.5,132.6);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-57.65,-66.3,0.3889,0.3889);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.6,-66.3,115.5,132.6);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-57.65,-66.3,0.3889,0.3889);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.6,-66.3,115.5,132.6);


(lib.playAgain = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("play again?", "italic bold 22px 'Sitka Banner'", "#FF8F0F");
	this.text.textAlign = "center";
	this.text.lineHeight = 34;
	this.text.lineWidth = 193;
	this.text.parent = this;
	this.text.setTransform(98.65,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({color:"#6600CC"},0).wait(1).to({color:"#FF3333"},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,197.3,58.9);


(lib.כדורקווידיץ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-101.4,-42.7,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(-104.6,-47.6,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-107.6,-27.5,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_11();
	this.instance_3.setTransform(-112,-31.9,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_8();
	this.instance_4.setTransform(-103.75,-40.5,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_7();
	this.instance_5.setTransform(-106.95,-45.4,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_10();
	this.instance_6.setTransform(-101.4,-42.7,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_9();
	this.instance_7.setTransform(-104.6,-47.6,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_12();
	this.instance_8.setTransform(-107.6,-27.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},7).to({state:[{t:this.instance_5},{t:this.instance_4}]},7).to({state:[{t:this.instance_7},{t:this.instance_6}]},6).to({state:[{t:this.instance_3},{t:this.instance_8}]},7).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112,-47.6,276.5,98);


(lib.כדור = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFC786").ss(1,1,1).p("AibhSQCngqBKBOQBJBNgEAzQgFAzgwhuQgwhtjRAEg");
	this.shape.setTransform(30.1604,15.4958);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC786").s().p("ABmAXQgwhtjRAEQCngqBKBOQBJBNgEAzQgBAQgGAAQgNAAghhLg");
	this.shape_1.setTransform(30.1604,15.4958);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF8F0F").s().p("AihDAIgGgFIgKgJQhKhKAAhoQAAhnBKhKQBKhKBnAAQBoAABKBKQBJBKABBnQgBBohJBKIgKAJIgGAFQhFA8hdAAQhcAAhFg8gACYhJQAwBtAGgyQAEgzhKhOQhKhNinApIAPAAQDEAAAuBqg");
	this.shape_2.setTransform(25.15,25.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.כדור, new cjs.Rectangle(0,0,50.3,50.3), null);


(lib.ירךרגל = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CDB975").ss(1,1,1).p("Aj5kSQBHgBBHANID3CuQBIAfAmCcIjaCwIhziKIg1gI");
	this.shape.setTransform(19.25,26.9716);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDB975").s().p("AhTCJIg1gIIhwmTQBGgBBHANID3CuQBHAfAmCcIjZCwg");
	this.shape_1.setTransform(19.25,26.9716);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ירךרגל, new cjs.Rectangle(-6.7,-1.5,51.900000000000006,57), null);


(lib.שוקרגל = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CDB975").ss(1,1,1).p("AhDjRQAEABAEAAQBzB8CiBoQAcASAeARACcDnQkBhShNhSQhMhRAEgIQA0AEABgFQAFgRgGAIAhDjRQgKgDgCgMQAGAHAGAIQADAEADADAhPjgQkJgpBeDz");
	this.shape.setTransform(20.182,23.061);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#999999").ss(1,1,1).p("ABHhvIAkAhIALAJABHhvQgYgcgZAOQgIAFgIAJQgfBghYBOQgPAhAuAiIAdAAABHhvQgMBAghAWABrhOQgEBQg3Ao");
	this.shape_1.setTransform(47.1906,39.8026);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CDB975").s().p("AiyBDQhMhRAEgIIADAAIABAAIABAAIAQABIABAAIALABIAEAAIAAAAQAPAAABgDIABgBIAAgBQACgJgBAAIgBAAIAAAAIgBABIAAABIgBAAIAAAAIAAAAIABAAIAAgBIABgBIAAAAIABAAQABAAgCAJIAAABIgBABQgBADgPAAIAAAAIgEAAIgLgBIgBAAIgQgBIgBAAIgBAAIgDAAQhejzEJApIADgGIARAWIgIgBIAIABQBzB8CiBoIA6AjQggBhhYBPQkBhShNhSgAhDjRIAGAHIgGgHIgMgPQACAMAKADgAhPjgIAMAPQgKgDgCgMg");
	this.shape_2.setTransform(20.182,23.061);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AhTCCQgugiAPghQBYhOAfhgQAIgJAIgFQAZgOAYAcIAkAhIALAJIAAASQADAegEAZQgCAFgDADQgEADgBAIQAAADgDABQgBAJgCAGIgIAaIgCAFIAAADIgLAKIgHAEQgJADgNAAIgDADQgDADgHAAQgFABgBAGIgOAAIgJAKIgtAAIgDAAQgCAFgFABQgHACAAAGgAAvAqQA3goAEhQQgEBQg3AogAAZgZQAhgWAMhAQgMBAghAWg");
	this.shape_3.setTransform(47.2637,39.8026);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.שוקרגל, new cjs.Rectangle(-8.4,-1,68.4,54.9), null);


(lib.עיגוללעזרה = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.נעל = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#999999").ss(1,1,1).p("ABggMQgBABgBACQgDAIgFAHQgEAKgGAKQgDAFgCADQgBAAgBACQgFAIgKAJQgHAIgJAHQgJAKgNAKABXhaIAWAbAAcBQIAGgFAhDBbIgpgG");
	this.shape.setTransform(11.525,23.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFF33").ss(1,1,1).p("AAVgbIApgLIBKgUQAfAShDAcIhZgMAiRAlICgAWIAuguQhHANgtgcIhaAnIAAAA");
	this.shape_1.setTransform(40.8021,11.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#3333CC").ss(1,1,1).p("AjLACIgaAZIALgIQgJAJgXAKIhAgIIgGAtIAuBJQApA/BeAhQAwASAmhHIAzhZIFBkSQAKgqghgLQgNgSgdgDQgogBgfAEQgxAFgaAPQgCABgBACQgTAEgTAFIgFABQgBABAAAAIgDABQgkAKgeALQgyASgpAXQgTAKgSAMQgFAbgJAYIAAACIgBABIgfAr");
	this.shape_2.setTransform(36.1913,29.8884);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(1,1,1).p("AkABnIDLAnIEvjiIAIg5Ig8A1Ij9ClIiegUIgIgBIgUAeIgFAFIgFAH");
	this.shape_3.setTransform(40.05,21.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("AhDBWIgpgFQAAgGAHgBQAFgBADgEIADgBIAtAHIALgJIANACQACgGAGAAQAGABAEgDIADgDQASAEAMgHIALgHIABgDQAFgOAIgQQADgGACgIQABAAABAAQABAAAAgBQABAAAAgBQAAAAAAgBQACgHAEgDQAEgDACgEQAIgaACgeQAAgJABgJIAWAbQgEAbgJAYIgCADIgeAqIgVAeIgbAZIAMgIQgJAJgXAKg");
	this.shape_4.setTransform(11.525,24.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF33").s().p("AiRAlIBagnQAtAcBHgNIguAugAALgYIADAAIACgBIAFgCIAlgJIAEgCIBKgUQAfAShDAcg");
	this.shape_5.setTransform(40.8271,11.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3333CC").s().p("AiLD0Qheghgpg/IguhJIAGgtIBAAIQAXgKAJgJIDMAoIEujiIAIg6Ig8A1Ij8CmIifgUIAFgHIALgUIAIgRIgIARIgLAUIgFAHIgHgBIAfgrIABgBIAAgCQAJgYAFgbQASgMATgKIABAAICgAWIAugvQhJANgrgdQAegLAkgKIBYAMQBDgdgegSQAfgEAoABQAdADANASQAhALgKAqIlBESIgzBZQgeA4glAAQgJAAgKgDg");
	this.shape_6.setTransform(36.1913,29.8884);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AkABnIAGgFIAEgHIAFgFIAVgeIAHABICeAUID8ilIA8g1IgIA5IkuDigAjXA6QgFAJgKAJIgQAPIAQgPQAKgJAFgJIACgBIgCABg");
	this.shape_7.setTransform(40.05,21.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.נעל, new cjs.Rectangle(-0.4,4.2,69.80000000000001,51.5), null);


(lib.buttonball = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FDE6C8").ss(1,1,1).p("AhIiMQBWgyBmBJQBmBIARAjQARAiASAiQATAjg4ggQg4gghbgfQhZgfhvBlQhvBlgbgIQgagJAFhEQAFhDA2g2QA2g2BYgxg");
	this.shape.setTransform(324.1312,-3.4424,1.5158,0.8735,29.9991);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDE9CB").s().p("Aj8ChQgagJAFhEQAFhDA2g2QA2g2BYgxQBWgyBmBJQBmBIARAjQARAiASAiQATAjg4ggQg4gghbgfQhZgfhvBlQhmBdgfAAIgFAAg");
	this.shape_1.setTransform(324.1312,-3.4424,1.5158,0.8735,29.9991);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(253,230,200,0.349)").ss(1,1,1).p("AKVAAQAAESjBDCQjCDBkSAAQkRAAjBjBQjCjCAAkSQAAkRDCjCQDBjBERAAQESAADCDBQDBDCAAERg");
	this.shape_2.setTransform(300.3,32.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9900").s().p("AnTHUQjBjCAAkSQAAkRDBjBQDCjCERAAQESAADBDCQDCDBAAERQAAESjCDCQjBDBkSAAQkRAAjCjBg");
	this.shape_3.setTransform(300.3,32.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(253,230,200,0.349)").ss(1,1,1).p("AKVAAQAAESjBDCQjCDBkSAAQkRAAjBjBQjCjCAAkSQAAkRDCjBQDBjCERAAQESAADCDCQDBDBAAERg");
	this.shape_4.setTransform(300.35,32.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC33").s().p("AnSHUQjCjCAAkSQAAkRDCjBQDBjCERAAQESAADCDCQDBDBAAERQAAESjBDCQjCDBkSAAQkRAAjBjBg");
	this.shape_5.setTransform(300.35,32.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF6600").s().p("AnSHUQjCjCAAkSQAAkRDCjBQDBjCERAAQESAADCDCQDBDBAAERQAAESjBDCQjCDBkSAAQkRAAjBjBg");
	this.shape_6.setTransform(300.25,32.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{x:324.1312,y:-3.4424}},{t:this.shape,p:{x:324.1312,y:-3.4424}}]}).to({state:[{t:this.shape_5},{t:this.shape_4,p:{x:300.35}},{t:this.shape_1,p:{x:324.1812,y:-3.4924}},{t:this.shape,p:{x:324.1812,y:-3.4924}}]},1).to({state:[{t:this.shape_6},{t:this.shape_4,p:{x:300.25}},{t:this.shape_1,p:{x:324.0812,y:-3.4924}},{t:this.shape,p:{x:324.0812,y:-3.4924}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(233.2,-34.4,134.3,134.2);


(lib.עציץנופל = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.כדור();
	this.instance.setTransform(-99.9,-69.95);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30).to({_off:false},0).wait(1).to({regX:25.1,regY:25.1,rotation:-0.6066,x:-58.05,y:-45.1},0).wait(1).to({rotation:-1.2131,x:-50.25,y:-46.15},0).wait(1).to({rotation:-1.8197,x:-42.5,y:-47.15},0).wait(1).to({rotation:-2.4262,x:-31,y:-47.4},0).wait(1).to({rotation:-3.0328,x:-19.5,y:-47.75},0).wait(1).to({rotation:-3.6393,x:-8,y:-46.5},0).wait(1).to({rotation:-4.2459,x:3.5,y:-45.25},0).wait(1).to({rotation:-4.8524,x:14.2,y:-43.3},0).wait(1).to({rotation:-5.459,x:25,y:-41.35},0).wait(1).to({rotation:-6.0655,x:28.2,y:-39.25},0).wait(1).to({rotation:-6.6721,x:31.45,y:-37.15},0).wait(1).to({rotation:-7.2786,x:34.7,y:-35.15},0).wait(1).to({rotation:-7.8852,x:37.9,y:-33.1},0).wait(1).to({rotation:-8.4917,x:41.1,y:-31.05},0).wait(1).to({rotation:-9.0983,x:44.35,y:-28.95},0).wait(1).to({rotation:-9.7048,x:47.6,y:-26.95},0).wait(1).to({rotation:-10.3114,x:57.3,y:-12.1},0).wait(1).to({rotation:-10.9179,x:67.05,y:2.75},0).wait(1).to({rotation:-11.5245,x:81.2,y:16.1},0).wait(1).to({rotation:-12.131,x:95.4,y:29.4},0).wait(1).to({rotation:-12.7376,x:108.9,y:41.05},0).wait(1).to({rotation:-13.3441,x:122.35,y:52.75},0).wait(1).to({rotation:-13.9507,x:136.8,y:68.55},0).wait(1).to({rotation:-14.5572,x:151.25,y:84.4},0).wait(1).to({rotation:-15.1638,x:168,y:93.1},0).wait(1).to({rotation:-15.7703,x:184.75,y:101.8},0).wait(1).to({rotation:-16.3769,x:205.95,y:92.4},0).wait(1).to({rotation:-16.9834,x:227.1,y:83.05},0).wait(1).to({rotation:-17.59,x:245.25,y:66.6},0).wait(1).to({rotation:-18.1965,x:263.4,y:50.15},0).wait(1).to({rotation:-18.8031,x:322.9,y:34.85},0).wait(1));

	// כדור_כתום
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFC786").ss(1,1,1).p("AhYgvQBfgYAqAtQAqArgCAeQgDAdgcg/Qgbg+h3ACg");
	this.shape.setTransform(-304.893,-128.2884);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC786").s().p("AA6ANQgbg+h3ACQBfgYAqAtQAqArgCAeQgBAJgDAAQgIAAgTgrg");
	this.shape_1.setTransform(-304.893,-128.2884);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF8F0F").s().p("AhlBmQgqgqAAg8QAAg6AqgrQAqgqA7AAQA7AAAqAqQArArAAA6QAAA8grAqQgqAqg7AAQg7AAgqgqgABXgpQAbA+ADgcQADgegqgtQgrgshfAYIAKAAQBvAAAaA9g");
	this.shape_2.setTransform(-307.75,-122.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFC786").ss(1,1,1).p("AhagwQBhgYAsAtQArAtgDAeQgDAegchBQgcg/h6ACg");
	this.shape_3.setTransform(-296.9681,-125.6159);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFC786").s().p("AA8ANQgcg/h6ACQBhgYAsAtQArAtgDAeQgBAJgDAAQgIAAgTgsg");
	this.shape_4.setTransform(-296.9681,-125.6159);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF8F0F").s().p("AhnBoQgsgrAAg9QAAg8AsgsQArgrA8AAQA9AAArArQAsAsAAA8QAAA9gsArQgrAsg9AAQg8AAgrgsgABZgrQAdBAADgdQACgegrguQgrgthiAYIAJAAQByAAAbA+g");
	this.shape_5.setTransform(-299.925,-119.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFC786").ss(1,1,1).p("AhdgxQBkgZAtAvQAsAtgCAgQgEAegchCQgdhBh+ACg");
	this.shape_6.setTransform(-289.0683,-122.9547);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFC786").s().p("AA+AOQgdhBh+ACQBkgZAtAvQAsAtgCAgQgBAJgEAAQgIAAgTgtg");
	this.shape_7.setTransform(-289.0683,-122.9547);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF8F0F").s().p("AhqBrQgsgtAAg+QAAg+AsgsQAsgsA+AAQA/AAAsAsQAsAsAAA+QAAA+gsAtQgsAsg/AAQg+AAgsgsgABcgsQAcBBAEgdQACgfgsgvQgtgvhkAaIAJAAQB2AAAcA/g");
	this.shape_8.setTransform(-292.075,-117.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFC786").ss(1,1,1).p("AhfgyQBmgaAuAwQAtAvgCAfQgEAggdhEQgehDiAADg");
	this.shape_9.setTransform(-281.1435,-120.2831);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFC786").s().p("AA/AOQgehDiAADQBmgaAuAwQAtAvgCAfQgBAKgEAAQgIAAgUgug");
	this.shape_10.setTransform(-281.1435,-120.2831);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF8F0F").s().p("AhtBtQgtgtAAhAQAAg/AtguQAugtA/AAQBAAAAtAtQAuAuAAA/QAABAguAtQgtAuhAAAQg/AAgugugABegtQAdBDAEgeQACgggtgwQgugwhmAaIALAAQB3AAAcBBg");
	this.shape_11.setTransform(-284.225,-114.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFC786").ss(1,1,1).p("Ahhg0QBogaAvAxQAvAwgDAhQgDAggfhGQgehEiDACg");
	this.shape_12.setTransform(-273.2409,-117.6212);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFC786").s().p("ABAAOQgehEiDACQBogaAvAxQAvAwgDAhQgBAKgEAAQgIAAgVgwg");
	this.shape_13.setTransform(-273.2409,-117.6212);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF8F0F").s().p("AhvBwQgvguAAhCQAAhBAvguQAugvBBAAQBCAAAuAvQAvAuAABBQAABCgvAuQguAvhCAAQhBAAgugvgABgguQAfBFADgfQADghgvgxQgvgxhpAaIAKAAQB7AAAdBDg");
	this.shape_14.setTransform(-276.4,-111.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFC786").ss(1,1,1).p("Ahkg1QBsgbAwAzQAvAxgDAhQgDAhgfhHQgfhGiHACg");
	this.shape_15.setTransform(-265.3411,-114.9601);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFC786").s().p("ABCAPQgfhGiHACQBsgbAwAzQAvAxgDAhQgBAKgEAAQgIAAgVgwg");
	this.shape_16.setTransform(-265.3411,-114.9601);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8F0F").s().p("AhyByQgvgvAAhDQAAhCAvgwQAwgvBCAAQBDAAAvAvQAxAwAABCQAABDgxAvQgvAxhDAAQhCAAgwgxgABigvQAfBGADgfQAEgigwgyQgwgzhsAcIAKgBQB+AAAeBFg");
	this.shape_17.setTransform(-268.55,-108.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#FFC786").ss(1,1,1).p("Ahmg2QBugcAxA0QAxAygDAiQgEAhgghIQgfhIiKADg");
	this.shape_18.setTransform(-257.4163,-112.2875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFC786").s().p("ABDAPQgfhIiKADQBugcAxA0QAxAygDAiQgBALgEAAQgJAAgWgyg");
	this.shape_19.setTransform(-257.4163,-112.2875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF8F0F").s().p("Ah1B1QgwgxAAhEQAAhEAwgxQAxgwBEAAQBFAAAwAwQAxAxAABEQAABEgxAxQgwAxhFAAQhEAAgxgxgABkgwQAgBHAEggQADgigxgzQgxg0huAcIAJAAQCCAAAeBGg");
	this.shape_20.setTransform(-260.725,-105.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#FFC786").ss(1,1,1).p("Ahog3QBwgcAyA0QAyA0gDAiQgEAjgghLQghhJiMADg");
	this.shape_21.setTransform(-249.4914,-109.616);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFC786").s().p("ABFAPQghhJiMADQBwgcAyA0QAyA0gDAiQgBALgEAAQgJAAgWgzg");
	this.shape_22.setTransform(-249.4914,-109.616);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF8F0F").s().p("Ah3B4QgygxAAhHQAAhFAygyQAygyBFAAQBHAAAxAyQAyAyAABFQAABHgyAxQgxAyhHAAQhFAAgygygABngxQAhBJADghQADgigxg1Qgzg1hwAcIALAAQCDAAAfBIg");
	this.shape_23.setTransform(-252.9,-103.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#FFC786").ss(1,1,1).p("Ahrg4QBzgdAzA1QAzA1gDAkQgEAjghhMQghhLiQADg");
	this.shape_24.setTransform(-241.5941,-106.9579);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFC786").s().p("ABGAQQghhLiQADQBzgdAzA1QAzA1gDAkQgBALgEAAQgJAAgXg0g");
	this.shape_25.setTransform(-241.5941,-106.9579);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FF8F0F").s().p("Ah6B6QgzgyAAhIQAAhHAzgzQAzgzBHAAQBIAAAyAzQAzAzAABHQAABIgzAyQgyA0hIAAQhHAAgzg0gABpgyQAhBLAEgiQACgkgyg2Qgzg1hzAdIALAAQCGAAAgBJg");
	this.shape_26.setTransform(-245.05,-100.275);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FFC786").ss(1,1,1).p("Ahtg6QB1gdA1A2QAzA2gDAlQgDAjgihNQgihNiTADg");
	this.shape_27.setTransform(-233.6917,-104.2854);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFC786").s().p("ABIAQQgihNiTADQB1gdA1A2QAzA2gDAlQgBALgEAAQgJAAgXg1g");
	this.shape_28.setTransform(-233.6917,-104.2854);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FF8F0F").s().p("Ah9B9Qg0g0AAhJQAAhIA0g1QA1gzBIAAQBJAAA0AzQA1A1AABIQAABJg1A0Qg0A0hJAAQhIAAg1g0gABrgzQAiBMADgiQADglgzg3Qg1g2h0AdIAKAAQCJAAAhBLg");
	this.shape_29.setTransform(-237.2,-97.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#FFC786").ss(1,1,1).p("Ahvg7QB4geA1A4QA1A3gDAlQgEAkgjhPQgihOiWADg");
	this.shape_30.setTransform(-225.7669,-101.6128);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFC786").s().p("ABJAQQgihOiWADQB4geA1A4QA1A3gDAlQgBALgFAAQgJAAgYg2g");
	this.shape_31.setTransform(-225.7669,-101.6128);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FF8F0F").s().p("Ah/B/Qg1g0AAhLQAAhKA1g1QA1g1BKAAQBLAAA1A1QA1A1AABKQAABLg1A0Qg1A2hLAAQhKAAg1g2gABtg0QAjBNAEgiQADgmg1g4Qg1g3h4AdIALAAQCMAAAhBNg");
	this.shape_32.setTransform(-229.375,-94.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#FFC786").ss(1,1,1).p("Ahxg8QB6gfA3A5QA1A5gDAlQgEAmgjhRQgjhQiZADg");
	this.shape_33.setTransform(-217.867,-98.9632);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFC786").s().p("ABLARQgjhQiZADQB6gfA3A5QA1A5gDAlQgBAMgEAAQgKAAgYg3g");
	this.shape_34.setTransform(-217.867,-98.9632);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FF8F0F").s().p("AiCCDQg2g2AAhNQAAhLA2g3QA3g2BLAAQBMAAA2A2QA3A3AABLQAABNg3A2Qg2A2hMAAQhLAAg3g2gABwg1QAjBQAEglQADglg2g6Qg3g5h6AfIALAAQCQAAAiBOg");
	this.shape_35.setTransform(-221.525,-91.875);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#FFC786").ss(1,1,1).p("Ah0g+QB9gfA3A6QA3A6gDAmQgEAmgkhSQgkhSicADg");
	this.shape_36.setTransform(-209.9422,-96.2907);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFC786").s().p("ABMARQgkhSicADQB9gfA3A6QA3A6gDAmQgBAMgEAAQgKAAgZg4g");
	this.shape_37.setTransform(-209.9422,-96.2907);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FF8F0F").s().p("AiFCFQg3g3AAhOQAAhNA3g4QA4g3BNAAQBOAAA3A3QA3A4AABNQAABOg3A3Qg3A3hOAAQhNAAg4g3gAByg2QAkBRAEglQADgng3g6Qg3g6h9AfIALAAQCSAAAjBQg");
	this.shape_38.setTransform(-213.7,-89.05);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#FFC786").ss(1,1,1).p("Ah2g/QB/gfA5A7QA4A6gDAoQgEAmglhUQglhTifADg");
	this.shape_39.setTransform(-202.0174,-93.6182);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFC786").s().p("ABOARQglhTifADQB/gfA5A7QA4A6gDAoQgCAMgEAAQgKAAgZg6g");
	this.shape_40.setTransform(-202.0174,-93.6182);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FF8F0F").s().p("AiHCHQg4g4AAhPQAAhPA4g4QA5g4BOAAQBQAAA4A4QA4A4AABPQAABPg4A4Qg4A5hQAAQhOAAg5g5gAB0g4QAlBTAEglQADgog4g7Qg4g7h/AfIALAAQCVAAAjBRg");
	this.shape_41.setTransform(-205.875,-86.225);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#FFC786").ss(1,1,1).p("Ah4hAQCBggA6A8QA5A8gDAoQgEAngmhVQglhViiADg");
	this.shape_42.setTransform(-194.1175,-90.957);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFC786").s().p("ABPASQglhViiADQCBggA6A8QA5A8gDAoQgBAMgFAAQgKAAgag6g");
	this.shape_43.setTransform(-194.1175,-90.957);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FF8F0F").s().p("AiKCKQg5g5AAhRQAAhQA5g6QA6g5BQAAQBRAAA5A5QA6A6AABQQAABRg6A5Qg5A6hRAAQhQAAg6g6gAB2g5QAmBVAEgmQADgpg5g8Qg6g9iBAhIALAAQCZAAAjBSg");
	this.shape_44.setTransform(-198.025,-83.425);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#FFC786").ss(1,1,1).p("Ah6hBQCEghA7A9QA6A9gEApQgEAogmhXQgmhXilAEg");
	this.shape_45.setTransform(-186.215,-88.2855);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFC786").s().p("ABRASQgmhXilAEQCEghA7A9QA6A9gEApQgBANgFAAQgKAAgag8g");
	this.shape_46.setTransform(-186.215,-88.2855);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FF8F0F").s().p("AiMCNQg7g6AAhTQAAhRA7g7QA6g7BSAAQBSAAA7A7QA7A7AABRQAABTg7A6Qg7A7hSAAQhSAAg6g7gAB5g6QAmBXAEgoQADgog6g+Qg7g+iEAhIANAAQCaAAAlBUg");
	this.shape_47.setTransform(-190.175,-80.625);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FFC786").ss(1,1,1).p("Ah9hCQCHgiA8A/QA7A+gDApQgFApgmhZQgnhYipAEg");
	this.shape_48.setTransform(-178.3152,-85.6243);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFC786").s().p("ABTASQgnhYipAEQCHgiA8A/QA7A+gDApQgCANgFAAQgKAAgag9g");
	this.shape_49.setTransform(-178.3152,-85.6243);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FF8F0F").s().p("AiPCQQg7g8AAhUQAAhTA7g8QA8g7BTAAQBUAAA7A7QA8A8AABTQAABUg8A8Qg7A7hUAAQhTAAg8g7gAB7g7QAmBYAFgoQADgpg7g/Qg8g/iHAiIANAAQCdAAAmBVg");
	this.shape_50.setTransform(-182.325,-77.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#FFC786").ss(1,1,1).p("Ah/hDQCJgjA9BAQA8A/gDArQgFApgnhaQgohairAEg");
	this.shape_51.setTransform(-170.3904,-82.9518);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFC786").s().p("ABUATQgohairAEQCJgjA9BAQA8A/gDArQgCANgEAAQgLAAgbg+g");
	this.shape_52.setTransform(-170.3904,-82.9518);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FF8F0F").s().p("AiSCSQg8g9AAhVQAAhVA8g8QA+g9BUAAQBVAAA9A9QA9A8AABVQAABVg9A9Qg9A9hVAAQhUAAg+g9gAB9g8QAoBaAEgpQAEgqg9hBQg9g/iJAiIANAAQCgAAAmBXg");
	this.shape_53.setTransform(-174.5,-75);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#FFC786").ss(1,1,1).p("AiBhFQCLgjA+BBQA+BAgEAsQgEAqgphcQgohbiuADg");
	this.shape_54.setTransform(-162.4656,-80.2793);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFC786").s().p("ABVATQgohbiuADQCLgjA+BBQA+BAgEAsQgBANgFAAQgLAAgcg/g");
	this.shape_55.setTransform(-162.4656,-80.2793);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF8F0F").s().p("AiUCUQg+g9AAhXQAAhWA+g+QA+g+BWAAQBXAAA+A+QA+A+AABWQAABXg+A9Qg+A/hXAAQhWAAg+g/gAB/g9QApBbAEgpQAEgsg+hBQg+hBiLAjIAMAAQCkAAAmBZg");
	this.shape_56.setTransform(-166.675,-72.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#FFC786").ss(1,1,1).p("AiEhGQCOgkBABDQA+BBgDAsQgFArgpheQgphdiyAEg");
	this.shape_57.setTransform(-154.5657,-77.6297);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFC786").s().p("ABXATQgphdiyAEQCOgkBABDQA+BBgDAsQgCAOgFAAQgLAAgchBg");
	this.shape_58.setTransform(-154.5657,-77.6297);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FF8F0F").s().p("AiXCXQg+g+AAhZQAAhYA+g+QA/g/BYAAQBZAAA+A/QA/A+AABYQAABZg/A+Qg+BAhZgBQhYABg/hAgACCg+QAoBdAFgrQAEgrg/hCQg/hDiOAjIAMAAQCnAAAoBbg");
	this.shape_59.setTransform(-158.825,-69.4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FFC786").ss(1,1,1).p("AiGhHQCQgkBBBDQA/BDgDAsQgFAsgqhfQgphfi1AEg");
	this.shape_60.setTransform(-146.6409,-74.9572);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFC786").s().p("ABYAUQgphfi1AEQCQgkBBBDQA/BDgDAsQgCAOgFAAQgLAAgdhBg");
	this.shape_61.setTransform(-146.6409,-74.9572);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FF8F0F").s().p("AiZCaQhAhAAAhaQAAhZBAhAQBAhABZAAQBbAAA/BAQBABAAABZQAABahABAQg/BAhbAAQhZAAhAhAgACEg/QApBeAGgrQADgsg/hEQhBhDiQAkIAMAAQCqAAAoBcg");
	this.shape_62.setTransform(-151,-66.575);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#FFC786").ss(1,1,1).p("AiIhJQCSgkBCBEQBBBEgEAtQgFAtgqhhQgrhgi3ADg");
	this.shape_63.setTransform(-138.7383,-72.2847);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFC786").s().p("ABaAUQgrhgi3ADQCSgkBCBEQBBBEgEAtQgCAOgFAAQgLAAgdhCg");
	this.shape_64.setTransform(-138.7383,-72.2847);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FF8F0F").s().p("AicCdQhBhBAAhcQAAhbBBhBQBBhBBbAAQBcAABABBQBCBBAABbQAABchCBBQhABBhcAAQhbAAhBhBgACGhAQAqBgAFgsQAEgthBhFQhChEiSAkIANAAQCsAAApBeg");
	this.shape_65.setTransform(-143.15,-63.775);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#FFC786").ss(1,1,1).p("AiLhKQCWglBCBFQBCBFgEAvQgFAtgrhjQgrhhi7ADg");
	this.shape_66.setTransform(-130.8411,-69.6266);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFC786").s().p("ABbAUQgrhhi7ADQCWglBCBFQBCBFgEAvQgBAOgFAAQgMAAgehEg");
	this.shape_67.setTransform(-130.8411,-69.6266);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FF8F0F").s().p("AifCfQhChCAAhdQAAhcBChDQBDhCBcAAQBdAABCBCQBCBDAABcQAABdhCBCQhCBChdAAQhcAAhDhCgACIhBQArBhAFgsQADguhBhGQhDhGiVAlIANAAQCvAAAqBgg");
	this.shape_68.setTransform(-135.3,-60.95);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#FFC786").ss(1,1,1).p("AiNhLQCYgmBEBHQBCBGgDAvQgFAugshkQgshki+AEg");
	this.shape_69.setTransform(-122.9162,-66.955);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFC786").s().p("ABdAVQgshki+AEQCYgmBEBHQBCBGgDAvQgCAOgFAAQgMAAgehEg");
	this.shape_70.setTransform(-122.9162,-66.955);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FF8F0F").s().p("AihCiQhDhDAAhfQAAheBDhDQBDhDBeAAQBfAABDBDQBDBDAABeQAABfhDBDQhDBDhfAAQheAAhDhDgACLhCQArBjAFgtQAEgvhDhHQhEhHiXAmIAOAAQCxAAArBhg");
	this.shape_71.setTransform(-127.475,-58.175);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#FFC786").ss(1,1,1).p("AiPhMQCagnBFBIQBDBHgDAwQgFAvgthmQgshljBAEg");
	this.shape_72.setTransform(-114.9914,-64.2825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFC786").s().p("ABeAVQgshljBAEQCagnBFBIQBDBHgDAwQgCAPgFAAQgMAAgfhGg");
	this.shape_73.setTransform(-114.9914,-64.2825);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FF8F0F").s().p("AikClQhEhEAAhhQAAhfBEhFQBFhEBfAAQBgAABEBEQBFBFAABfQAABhhFBEQhEBEhgAAQhfAAhFhEgACNhDQAtBkAEguQAEgvhEhIQhEhIibAmIAPAAQC0AAArBjg");
	this.shape_74.setTransform(-119.65,-55.35);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#FFC786").ss(1,1,1).p("AiShNQCdgoBGBJQBFBJgEAwQgFAwgthoQgthmjFAEg");
	this.shape_75.setTransform(-107.0915,-61.6213);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFC786").s().p("ABgAVQgthmjFAEQCdgoBGBJQBFBJgEAwQgBAPgGAAQgMAAgfhHg");
	this.shape_76.setTransform(-107.0915,-61.6213);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FF8F0F").s().p("AimCnQhFhFgBhiQABhhBFhGQBFhFBhAAQBiAABFBFQBFBGABBhQgBBihFBFQhFBGhiAAQhhAAhFhGgACPhFQAtBnAGgvQADgwhEhKQhHhJidAoIAPAAQC4AAArBjg");
	this.shape_77.setTransform(-111.8,-52.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#FFC786").ss(1,1,1).p("AiUhPQCfgnBIBKQBFBJgEAyQgFAwguhpQguhojHADg");
	this.shape_78.setTransform(-99.1891,-58.9594);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFC786").s().p("ABhAWQguhojHADQCfgnBIBKQBFBJgEAyQgBAPgGAAQgMAAgghIg");
	this.shape_79.setTransform(-99.1891,-58.9594);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FF8F0F").s().p("AipCqQhGhHAAhjQAAhiBGhHQBHhGBiAAQBjAABHBGQBGBHAABiQAABjhGBHQhHBGhjAAQhiAAhHhGgACRhGQAuBoAFgvQAEgxhFhLQhIhKifAoIANAAQC8AAAsBlg");
	this.shape_80.setTransform(-103.975,-49.725);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#FFC786").ss(1,1,1).p("AiWhQQCigoBIBLQBHBLgEAxQgFAygvhrQgvhqjKAEg");
	this.shape_81.setTransform(-91.2643,-56.2878);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFC786").s().p("ABjAWQgvhqjKAEQCigoBIBLQBHBLgEAxQgCAQgGAAQgMAAgghJg");
	this.shape_82.setTransform(-91.2643,-56.2878);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FF8F0F").s().p("AisCsQhHhHAAhlQAAhkBHhIQBIhHBkAAQBlAABHBHQBIBIAABkQAABlhIBHQhHBIhlAAQhkAAhIhIgACThHQAvBqAFgwQAEgyhHhMQhIhLihAoIAOAAQC9AAAtBng");
	this.shape_83.setTransform(-96.125,-46.925);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#FFC786").ss(1,1,1).p("AiYhRQCkgpBJBMQBIBMgEAzQgFAygvhtQgwhrjNAEg");
	this.shape_84.setTransform(-83.3645,-53.6267);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFC786").s().p("ABlAWQgwhrjNAEQCkgpBJBMQBIBMgEAzQgCAQgFAAQgNAAgghLg");
	this.shape_85.setTransform(-83.3645,-53.6267);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FF8F0F").s().p("AivCvQhIhIAAhnQAAhlBIhJQBJhJBmAAQBmAABJBJQBJBJAABlQAABnhJBIQhJBJhmAAQhmAAhJhJgACWhIQAvBsAFgxQAEgzhIhNQhJhMikApIAOAAQDBAAAuBog");
	this.shape_86.setTransform(-88.275,-44.125);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#FFC786").ss(1,1,1).p("AibhSQCngqBKBOQBJBNgEAzQgFAzgwhuQgwhtjRAEg");
	this.shape_87.setTransform(-75.4396,-50.9542);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFC786").s().p("ABmAXQgwhtjRAEQCngqBKBOQBJBNgEAzQgBAQgGAAQgNAAghhLg");
	this.shape_88.setTransform(-75.4396,-50.9542);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FF8F0F").s().p("AixCxQhJhJAAhoQAAhnBJhKQBKhJBnAAQBoAABJBJQBLBKAABnQAABohLBJQhJBLhoAAQhnAAhKhLgACYhJQAwBtAFgyQAFgzhJhOQhLhOimAqIAOAAQDEAAAuBqg");
	this.shape_89.setTransform(-80.45,-41.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},1).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]},1).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]},1).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]},1).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},1).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},1).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39}]},1).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},1).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45}]},1).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_53},{t:this.shape_52},{t:this.shape_51}]},1).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54}]},1).to({state:[{t:this.shape_59},{t:this.shape_58},{t:this.shape_57}]},1).to({state:[{t:this.shape_62},{t:this.shape_61},{t:this.shape_60}]},1).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},1).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]},1).to({state:[{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]},1).to({state:[{t:this.shape_74},{t:this.shape_73},{t:this.shape_72}]},1).to({state:[{t:this.shape_77},{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.shape_78}]},1).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81}]},1).to({state:[{t:this.shape_86},{t:this.shape_85},{t:this.shape_84}]},1).to({state:[{t:this.shape_89},{t:this.shape_88},{t:this.shape_87}]},1).to({state:[]},1).wait(32));

	// עציץ
	this.instance_1 = new lib.CachedBmp_49();
	this.instance_1.setTransform(-100.55,-177.15,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_50();
	this.instance_2.setTransform(-100,-177.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_51();
	this.instance_3.setTransform(-100.05,-177.6,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_52();
	this.instance_4.setTransform(-100.05,-177.6,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_53();
	this.instance_5.setTransform(-100.05,-177.6,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_54();
	this.instance_6.setTransform(-101.55,-178.6,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_55();
	this.instance_7.setTransform(-100.55,-179.6,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_56();
	this.instance_8.setTransform(-101.05,-177.6,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_57();
	this.instance_9.setTransform(-101.55,-178.6,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_58();
	this.instance_10.setTransform(-102.05,-178.6,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_59();
	this.instance_11.setTransform(-100.8,-177.35,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_60();
	this.instance_12.setTransform(-96.25,-178.7,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_61();
	this.instance_13.setTransform(-71,-176.1,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_62();
	this.instance_14.setTransform(-51.8,-169.05,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_63();
	this.instance_15.setTransform(-39.65,-143.55,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_64();
	this.instance_16.setTransform(-38.7,-116.3,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_65();
	this.instance_17.setTransform(-33.05,-100.45,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_66();
	this.instance_18.setTransform(-32.3,-89.05,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_67();
	this.instance_19.setTransform(-31.65,-72.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},5).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},2).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},2).to({state:[{t:this.instance_15}]},2).to({state:[{t:this.instance_16}]},2).to({state:[{t:this.instance_17}]},3).to({state:[{t:this.instance_18}]},2).to({state:[{t:this.instance_19}]},2).wait(18));

	// חלון_שלט
	this.instance_20 = new lib.CachedBmp_68();
	this.instance_20.setTransform(-344.15,-178.1,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_69();
	this.instance_21.setTransform(-344.15,-178.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20}]}).to({state:[{t:this.instance_21}]},61).wait(1));

	// שולחן_ספה
	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#C8A89C").ss(2,1,1).p("AKtAAQAABbjJBAQjIBBkcAAQkbAAjIhBQjJhAAAhbQAAhaDJhBQDIhAEbAAQEcAADIBAQDJBBAABag");
	this.shape_90.setTransform(-28.35,32.7);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#96583F").ss(2,1,1).p("AH/kmQAABEiVAwQiWAwjUAAQjTAAiWgwQiWgwAAhEQAAhECWgxQCWgwDTAAQDUAACWAwQCVAxAABEgABLEIQCAAKAaA7QAZA7iIAsQiGArimgjQimgiA+hbQAvgoBdgRAifE1QAHgSAGgSQAGgTAEgTQAGgYACgXQABgGAAgFQAJh7hGhxABCg7IAyAAQg+B4AFB0QAAAGABAFQABAXAFAYQADAUAGAUQAFARAHASABCDrIjKAA");
	this.shape_91.setTransform(-28.2,60.9679);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#96583F").s().p("Ai1HSQimgjA/hbQAugoBegQQgIAXgKAYIAFAAIANglQAGgTAEgTQAFgXADgYIABgKQAJh8hGhxID+AAIAyAAQg/B4AGB1IAAAKQACAYAEAXQAEAUAGAUQAFASAHARIAAAAIAEAAQgJgXgHgWQCAAKAZA7QAZA7iHArQhLAYhUAAQhEAAhKgPgABDEAIjJAAgAnjhpQjJhAAAhbQAAhbDJhBQDIhAEbAAQEcAADIBAQDJBBAABbQAABbjJBAQjIBBkcAAQkbAAjIhBgAn9kRQAABECWAwQCVAxDUAAQDTAACWgxQCWgwAAhEQAAhEiWgwQiWgwjTAAQjUAAiVAwQiWAwAABEIAAAAgAlnidQiWgwAAhEQAAhECWgwQCVgwDUAAQDTAACWAwQCWAwAABEQAABEiWAwQiWAxjTAAQjUAAiVgxgAIBkRIAAAAg");
	this.shape_92.setTransform(-28.35,58.8179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_92},{t:this.shape_91},{t:this.shape_90}]}).wait(62));

	// קיר
	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#E9DBC2").s().p("Eg2dAVAMgAXgp/MBtVAAAIAAK6IAUAAIAALhIgUAAIAAQRIAUAAIAADTg");
	this.shape_93.setTransform(-0.425,-67.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_93).wait(62));

	// רצפה
	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#F8E7E1").s().p("Eg2tAKhIAA1BMBtbAAAIAAVBg");
	this.shape_94.setTransform(0.225,133.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_94).wait(62));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-351.3,-202.3,701.8,403.4);


(lib.סצנה5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// טלוויזיה
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(431,227.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_25();
	this.instance_1.setTransform(-0.5,-0.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_26();
	this.instance_2.setTransform(287,227.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance_2}]},40).wait(6));

	// כדור
	this.instance_3 = new lib.כדור();
	this.instance_3.setTransform(885.4,233.7,1.0914,1.0914,0,0,0,25.2,25.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:25.1,regY:25.1,scaleX:1.0985,scaleY:1.0985,rotation:6.7433,x:870.5,y:244.65},0).wait(1).to({scaleX:1.1055,scaleY:1.1055,x:855.65,y:255.8},0).wait(1).to({scaleX:1.1126,scaleY:1.1126,rotation:8.0794,x:840.8,y:267},0).wait(1).to({scaleX:1.1196,scaleY:1.1196,rotation:6.7433,x:825.85,y:278.2},0).wait(1).to({scaleX:1.1266,scaleY:1.1266,x:811.05,y:289.35},0).wait(1).to({scaleX:1.1336,scaleY:1.1336,rotation:8.0794,x:796.1,y:300.45},0).wait(1).to({scaleX:1.1406,scaleY:1.1406,rotation:6.7433,x:781.25,y:311.6},0).wait(1).to({scaleX:1.1476,scaleY:1.1476,rotation:8.0794,x:766.35,y:322.65},0).wait(1).to({scaleX:1.1545,scaleY:1.1545,x:751.55,y:333.75},0).wait(1).to({scaleX:1.1615,scaleY:1.1615,x:736.6,y:344.75},0).wait(1).to({scaleX:1.1684,scaleY:1.1684,x:721.75,y:355.8},0).wait(1).to({scaleX:1.1753,scaleY:1.1753,x:706.85,y:366.8},0).wait(1).to({scaleX:1.1823,scaleY:1.1823,rotation:6.7433,x:691.95,y:377.75},0).wait(1).to({scaleX:1.1892,scaleY:1.1892,x:677.1,y:388.7},0).wait(1).to({scaleX:1.1926,scaleY:1.1926,rotation:63.763,x:662.65,y:391.7},0).wait(1).to({rotation:75.708,x:654,y:386.25},0).wait(1).to({x:645.35,y:380.8},0).wait(1).to({x:636.7,y:375.35},0).wait(1).to({x:628,y:369.95},0).wait(1).to({x:619.35,y:364.5},0).wait(1).to({x:610.7,y:359.1},0).wait(1).to({x:602,y:353.7},0).wait(1).to({x:593.35,y:348.35},0).wait(1).to({rotation:74.407,x:584.65,y:343},0).wait(1).to({rotation:75.708,x:576,y:337.6},0).wait(1).to({rotation:74.407,x:567.3,y:332.3},0).wait(1).to({x:558.65,y:326.95},0).wait(1).to({x:549.95,y:321.65},0).wait(1).to({rotation:75.708,x:541.35,y:316.3},0).wait(1).to({x:532.65,y:311},0).wait(1).to({rotation:8.0386,x:523.5,y:311.2},0).wait(1).to({rotation:23.6225,x:506.7,y:317.3},0).wait(1).to({x:489.75,y:323.45},0).wait(1).to({rotation:24.5585,x:472.8,y:329.55},0).wait(1).to({x:455.8,y:335.65},0).wait(1).to({rotation:23.6225,x:438.85,y:341.7},0).wait(1).to({rotation:24.5585,x:421.9,y:347.8},0).wait(1).to({x:404.9,y:353.85},0).wait(1).to({rotation:23.6225,x:387.95,y:359.9},0).wait(1).to({rotation:43.878,x:371.15,y:364.55},0).wait(1).to({x:371.05},0).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-0.5,1243,464);


(lib.סצנה4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CDB975").ss(1,1,1).p("AtF7aIRCAAIJJAAMAAAA21IpJAAIxCAAAD9bbMAAAg21");
	this.shape.setTransform(263.925,22.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDB975").s().p("AogbbIAA2qIEEAAIAA1WIkEAAIAAq1IRBAAMAAAA21gAogC5IAAgTIByAAIAAxMIABAAIAARfg");
	this.shape_1.setTransform(234.675,22.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#96583F").s().p("AiBKrIAAh3IBzAAIAAxfIgBAAIAAgUIhyAAIAAhsIEDAAIAAVWg");
	this.shape_2.setTransform(193.15,-15.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C4A378").s().p("AkkbbMAAAg21IJIAAMAAAA21g");
	this.shape_3.setTransform(318.45,22.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},45).wait(6));

	// כדור
	this.instance = new lib.כדור();
	this.instance.setTransform(-298.85,139.55,1,1,-19.498);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:25.1,regY:25.1,rotation:-19.4988,x:-262.2,y:147.55},0).wait(1).to({x:-257.6,y:140.3},0).wait(1).to({x:-253.05,y:133.05},0).wait(1).to({x:-249.3,y:129.05},0).wait(1).to({x:-245.6,y:125.05},0).wait(1).to({x:-241.9,y:121.05},0).wait(1).to({x:-238.2,y:117.05},0).wait(1).to({x:-232.85,y:111.3},0).wait(1).to({x:-227.5,y:105.55},0).wait(1).to({x:-222.15,y:99.85},0).wait(1).to({x:-217.55,y:94.1},0).wait(1).to({x:-212.95,y:88.4},0).wait(1).to({x:-208.4,y:82.7},0).wait(1).to({x:-205.9,y:79.5},0).wait(1).to({x:-203.4,y:76.3},0).wait(1).to({y:76.7},0).wait(1).to({x:-190.95,y:66.45},0).wait(1).to({x:-178.5,y:56.25},0).wait(1).to({x:-166.05,y:46.05},0).wait(1).to({x:-158.6,y:40.6},0).wait(1).to({x:-151.15,y:35.15},0).wait(1).to({x:-143.7,y:29.7},0).wait(1).to({x:-136.3,y:24.3},0).wait(1).to({x:-124,y:16.85},0).wait(1).to({x:-111.7,y:9.4},0).wait(1).to({x:-99.4,y:1.95},0).wait(1).to({x:-87.1,y:-5.5},0).wait(1).to({x:-74.5,y:-10.35},0).wait(1).to({x:-61.9,y:-15.2},0).wait(1).to({x:-49.3,y:-20.05},0).wait(1).to({x:-36.75,y:-24.95},0).wait(1).to({x:-25.7,y:-24.45},0).wait(1).to({x:-14.65,y:-24},0).wait(1).to({x:-3.6,y:-23.5},0).wait(1).to({x:7.4,y:-23.05},0).wait(1).to({x:25.45},0).wait(1).to({x:43.5},0).wait(1).to({x:61.55},0).wait(1).to({x:72.75,y:-13.5},0).wait(1).to({x:83.95,y:-3.95},0).wait(1).to({x:95.2,y:5.55},0).wait(1).to({x:120.25},0).wait(1).to({x:145.35},0).wait(1).to({x:161,y:6.1},0).wait(1).to({x:176.7,y:6.65},0).wait(1).to({x:192.4,y:7.2},0).wait(1).to({x:206.85,y:18.05},0).wait(1).to({x:221.35,y:28.95},0).wait(3));

	// Armature_7
	this.ikNode_20 = new lib.ירךרגל();
	this.ikNode_20.name = "ikNode_20";
	this.ikNode_20.setTransform(-349.6,90.35,0.9999,0.9999,15.6413,0,0,4.2,14.6);

	this.ikNode_4 = new lib.שוקרגל();
	this.ikNode_4.name = "ikNode_4";
	this.ikNode_4.setTransform(-329.55,126.65,0.9989,0.9989,30.4214,0,0,5.8,12.5);

	this.ikNode_6 = new lib.נעל();
	this.ikNode_6.name = "ikNode_6";
	this.ikNode_6.setTransform(-306.3,195.3,0.9989,0.9989,35.3692,0,0,23.2,41.3);

	this.ikNode_14 = new lib.עיגוללעזרה();
	this.ikNode_14.name = "ikNode_14";
	this.ikNode_14.setTransform(-287.85,231.4,0.9993,0.9993,13.6944,0,0,6.7,6.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_14,p:{regY:6.4,scaleX:0.9993,scaleY:0.9993,rotation:13.6944,x:-287.85,y:231.4,regX:6.7}},{t:this.ikNode_6,p:{regY:41.3,scaleX:0.9989,scaleY:0.9989,rotation:35.3692,x:-306.3,y:195.3}},{t:this.ikNode_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:30.4214,x:-329.55,y:126.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:15.6413,x:-349.6,y:90.35,regY:14.6}}]}).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:10.2365,x:-279.35,y:227.45,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:31.9119,x:-299.85,y:192.45}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:26.9647,x:-327.2,y:125.3,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9998,scaleY:0.9998,rotation:12.1828,x:-349.45,y:90.25,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.4,scaleX:0.9992,scaleY:0.9992,rotation:4.796,x:-266.55,y:220.1,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:26.4742,x:-290.35,y:187.3}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:21.5266,x:-323.95,y:123,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:6.7431,x:-349.4,y:90.2,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-0.0411,x:-255.75,y:212.85,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:21.6278,x:-282.2,y:182.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:16.6806,x:-321.2,y:120.75,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9998,scaleY:0.9998,rotation:1.8978,x:-349.3,y:90.3,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.4226,x:-250.7,y:208.75,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:19.2441,x:-278.45,y:179.1}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:14.2961,x:-319.95,y:119.45,regX:5.7,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-0.4783,x:-349.3,y:90.2,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-4.3256,x:-246.6,y:205.45,regX:6.8}},{t:this.ikNode_6,p:{regY:41.3,scaleX:0.9988,scaleY:0.9988,rotation:17.3401,x:-275.45,y:176.65}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.3916,x:-318.9,y:118.55,regX:5.8,regY:12.6}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-2.379,x:-349.2,y:90.25,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-7.6648,x:-240.05,y:199.2,regX:6.7}},{t:this.ikNode_6,p:{regY:41.3,scaleX:0.9988,scaleY:0.9988,rotation:13.9968,x:-270.45,y:172.1}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:9.0489,x:-317.2,y:116.6,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-5.7176,x:-349,y:90.25,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-9.6253,x:-236.35,y:195.4,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:12.0358,x:-267.65,y:169.45}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:7.0878,x:-316.25,y:115.5,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-7.6773,x:-349,y:90.15,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-11.5857,x:-232.8,y:191.55,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:10.0733,x:-265.05,y:166.65}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:5.1264,x:-315.45,y:114.3,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-9.6374,x:-349,y:90.15,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-13.9932,x:-228.55,y:186.55,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:7.6635,x:-261.75,y:163.1}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:2.7153,x:-314.3,y:112.8,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-12.0441,x:-348.9,y:90.15,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-17.5907,x:-222.65,y:178.85,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:4.0649,x:-257.35,y:157.4}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.8762,x:-312.85,y:110.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-15.6414,x:-348.9,y:89.95,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-19.849,x:-219.15,y:173.8,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:1.8026,x:-254.65,y:153.8}},{t:this.ikNode_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.1342,x:-312,y:109.1,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9998,scaleY:0.9998,rotation:-17.9004,x:-348.75,y:90.1,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-24.1935,x:-213.05,y:163.6,regX:6.7}},{t:this.ikNode_6,p:{regY:41.3,scaleX:0.9988,scaleY:0.9988,rotation:-2.5375,x:-250,y:146.35}},{t:this.ikNode_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.4786,x:-310.65,y:106.3,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.2442,x:-348.75,y:90,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.4,scaleX:0.9992,scaleY:0.9992,rotation:-25.962,x:-210.8,y:159.3,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-4.3045,x:-248.3,y:143.35}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-9.2475,x:-310.2,y:104.9,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-24.0138,x:-348.7,y:90.05,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-28.107,x:-208.25,y:154.15,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-6.4463,x:-246.25,y:139.65}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-11.3899,x:-309.5,y:103.45,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9998,scaleY:0.9998,rotation:-26.1564,x:-348.65,y:89.95,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-28.0776,x:-208.1,y:154.3,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-6.418,x:-246.2,y:139.65}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-11.3602,x:-309.5,y:103.4,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-26.1267,x:-348.6,y:89.95,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-31.5103,x:-204.55,y:145.7,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-9.852,x:-243.35,y:133.35}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-14.7946,x:-308.65,y:101,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9998,scaleY:0.9998,rotation:-29.5615,x:-348.5,y:90,regY:14.6}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).to({state:[{t:this.ikNode_14,p:{regY:6.5,scaleX:0.9992,scaleY:0.9992,rotation:-34.9456,x:-201.45,y:137,regX:6.7}},{t:this.ikNode_6,p:{regY:41.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.2853,x:-241,y:127.05}},{t:this.ikNode_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2293,x:-308.1,y:98.65,regX:5.8,regY:12.5}},{t:this.ikNode_20,p:{scaleX:0.9999,scaleY:0.9999,rotation:-32.996,x:-348.55,y:89.9,regY:14.5}}]},1).wait(1));

	// בית_
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CDB975").ss(1,1,1).p("AT9bbIxDAAIhBAAI++AAMAAGg21Ie4AAIBBAAIRDAAIJJAAMAAAA21IpJAAMAAAg21");
	this.shape_4.setTransform(161.525,22.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EEDB8B").s().p("AqRIwIAAxfIUjAAIAAATIAARMg");
	this.shape_5.setTransform(125.75,-16.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#96583F").s().p("AsiKrIAA1WIZFAAIAAVWgAqSIhIAAATIUkAAIAAxfIgBAAIAAgUI0jAAg");
	this.shape_6.setTransform(125.85,-15.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C4A378").s().p("AkkbbMAAAg21IJIAAMAAAA21g");
	this.shape_7.setTransform(318.45,22.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CDB975").s().p("AHfbbIhCAAI+9AAMAAGg21Ie3AAIBCAAIRCAAMAAAA21gAtiExIZFAAIAA1WI5FAAgArSC5IAAgTIUjAAIAAxMIABAAIAARfg");
	this.shape_8.setTransform(132.275,22.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#CDB975").ss(1,1,1).p("AQAbbIhBAAI++AAMAAGg21Ie4AAIBBAA");
	this.shape_9.setTransform(77.75,22.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EEDB8B").s().p("AIgIwIyxAAIAAxfISxAAIByAAIAARfg");
	this.shape_10.setTransform(125.75,-16.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#96583F").s().p("AqgKrIAA1WIVBAAIAABsIyxAAIAARgIAAATISxAAIAAB3g");
	this.shape_11.setTransform(112.85,-15.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CDB975").s().p("AO/bbI++AAMAAGg21Ie4AAIBBAAIAAK1I1BAAIAAVWIVBAAIAAWqgAixC5IAAgTISxAAIAAATg");
	this.shape_12.setTransform(77.75,22.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},45).wait(6));

	// דשא
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#339933").ss(1,1,1).p("AbOuSIADgbQr8CupXCdQjIAxi2AvA7QOuMAy0AAA");
	this.shape_13.setTransform(-175.425,104.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#339933").s().p("AW/OuMgyzAAAIgrAAQABmHgKmXIAAAAIAAgXIgBAAIgBgtQE6jHRnknIFlhfQC2gwDIgxQJaiNL1ijICCgbIj/dbg");
	this.shape_14.setTransform(-171.8,104.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13}]}).wait(51));

	// שמיים
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#3366CC").ss(1,1,1).p("Eg2fAAAMBs/AAB");
	this.shape_15.setTransform(-1.05,198.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3366CC").s().p("EA2sAfRMhs+gADIgZAAIgDkKQAJougFofIgPAAIAAgIIAFAAIAAwdIgPgDIAAsgIgBAAIAAhxIASgEIAAqKIAZAAMBteAAAMAAAA+hg");
	this.shape_16.setTransform(-2.275,-1.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15}]}).wait(51));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-370.5,-201.7,720.7,434.7);


(lib.סצנה_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// MergedLayer_1
	this.instance = new lib.Tween9("synched",0);
	this.instance.setTransform(14.85,-29.6,1.4258,1.2594);

	this.instance_1 = new lib.Tween8("synched",0);
	this.instance_1.setTransform(284.2,-35.05,1.292,1.2505,0,0,0,0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},51).to({state:[{t:this.instance_1}]},1).wait(33));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:279.15,y:-40.45},51).to({_off:true,regX:0.1,regY:-0.1,scaleX:1.292,scaleY:1.2505,x:284.2,y:-35.05},1).wait(33));

	// כדור
	this.instance_2 = new lib.כדור();
	this.instance_2.setTransform(474.3,89.95,1.5695,1.5695,0,0,0,25.2,25.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(75).to({regX:25.3,regY:25.3,rotation:-29.9977,x:467.35,y:90.7},0).to({regX:25.1,regY:25.2,rotation:-44.9988,x:474.3,y:91.3},9).wait(1));

	// סלון
	this.instance_3 = new lib.CachedBmp_22();
	this.instance_3.setTransform(447.05,-200.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_21();
	this.instance_4.setTransform(-87.4,-223.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).wait(85));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.4,-223.9,1106,633);


(lib.scene2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.כדור();
	this.instance.setTransform(350.4,4.25,1,1,-19.4989,0,0,-0.1,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:25.1,regY:25.1,rotation:-19.8884,x:506.4,y:293.55},0).wait(1).to({rotation:-20.2773,x:-432.35,y:241.4},0).wait(1).to({rotation:-20.6661,x:-323.45,y:50},0).wait(1).to({rotation:-21.055,x:-317.85,y:21.35},0).wait(1).to({rotation:-21.4439,x:-306.75,y:-7.4},0).wait(1).to({rotation:-21.8328,x:-290.2,y:-36.35},0).wait(1).to({rotation:-22.2216,x:-268.25,y:-65.55},0).wait(1).to({rotation:-22.6105,x:-235.05,y:-85.95},0).wait(1).to({rotation:-22.9994,x:-192.65,y:-105.4},0).wait(1).to({rotation:-23.3883,x:-158.1,y:-112.35},0).wait(1).to({rotation:-23.7772,x:-139.15,y:-110.1},0).wait(1).to({rotation:-24.166,x:-110.8,y:-111.3},0).wait(1).to({rotation:-24.5549,x:-92.8,y:-107.5},0).wait(1).to({rotation:-24.9438,x:-76.45,y:-99.8},0).wait(1).to({rotation:-25.3327,x:-56.1,y:-82.05},0).wait(1).to({rotation:-25.7215,x:-46.05,y:-76.35},0).wait(1).to({rotation:-26.1104,x:-36,y:-70.6},0).wait(1).to({rotation:-26.4993,x:-25.95,y:-64.9},0).wait(1).to({rotation:-26.8882,x:-15.85,y:-59.1},0).wait(1).to({rotation:-27.2771,x:-10,y:-50.9},0).wait(1).to({rotation:-27.6659,x:-4.1,y:-42.6},0).wait(1).to({rotation:-28.0548,x:1.75,y:-34.35},0).wait(1).to({rotation:-28.4437,x:2.05,y:-28.65},0).wait(1).to({rotation:-28.8326,x:2.4,y:-22.85},0).wait(1).to({rotation:-29.2214,x:2.75,y:-17.1},0).wait(1).to({rotation:-29.6103,x:-3.5,y:-2.35},0).wait(1).to({rotation:-29.9992,x:-17.75,y:2.45},0).wait(24));

	// עציץ
	this.instance_1 = new lib.CachedBmp_13();
	this.instance_1.setTransform(-28.25,-89.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},3).wait(48));

	// חלון_שלט
	this.instance_2 = new lib.CachedBmp_14();
	this.instance_2.setTransform(-344.15,-178.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_16();
	this.instance_3.setTransform(-10.9,-187.3,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_15();
	this.instance_4.setTransform(-64.05,15.8,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_18();
	this.instance_5.setTransform(-10.9,-187.3,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_19();
	this.instance_6.setTransform(-64.05,15.8,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_20();
	this.instance_7.setTransform(-10.9,-187.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_4},{t:this.instance_3}]},3).to({state:[{t:this.instance_6},{t:this.instance_5}]},25).to({state:[{t:this.instance_6},{t:this.instance_7}]},22).wait(1));

	// שולחן_ספה
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#C8A89C").ss(2,1,1).p("AKtAAQAABbjJBAQjIBBkcAAQkbAAjIhBQjJhAAAhbQAAhaDJhBQDIhAEbAAQEcAADIBAQDJBBAABag");
	this.shape.setTransform(-28.35,32.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#96583F").ss(2,1,1).p("AH/kmQAABEiVAwQiWAwjUAAQjTAAiWgwQiWgwAAhEQAAhECWgxQCWgwDTAAQDUAACWAwQCVAxAABEgAiIDrQAGgYACgXQABgGAAgFQAJh7hGhxAifE1QAHgSAGgSQAGgTAEgTABLEIQCAAKAaA7QAZA7iIAsQiGArimgjQimgiA+hbQAvgoBdgRABCDrQADAUAGAUQAFARAHASABCg7IAyAAQg+B4AFB0QAAAGABAFQABAXAFAYIjKAA");
	this.shape_1.setTransform(-28.2,60.9679);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#96583F").s().p("Ai1HSQimgjA/hbQAugoBegQQgIAXgKAYIAFAAIANglQAGgTAEgTIDJAAQAEAUAGAUQAFASAHARIAAAAIAEAAQgJgXgHgWQCAAKAZA7QAZA7iHArQhLAYhUAAQhEAAhKgPgAiGEAQAFgXADgYIABgKQAJh8hGhxID+AAIAyAAQg/B4AGB1IAAAKQACAYAEAXgAnjhpQjJhAAAhbQAAhbDJhBQDIhAEbAAQEcAADIBAQDJBBAABbQAABbjJBAQjIBBkcAAQkbAAjIhBgAn9kRQAABECWAwQCVAxDUAAQDTAACWgxQCWgwAAhEQAAhEiWgwQiWgwjTAAQjUAAiVAwQiWAwAABEIAAAAgAlnidQiWgwAAhEQAAhECWgwQCVgwDUAAQDTAACWAwQCWAwAABEQAABEiWAwQiWAxjTAAQjUAAiVgxgAIBkRIAAAAg");
	this.shape_2.setTransform(-28.35,58.8179);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#2D5200").ss(2,1,1).p("AKLgEQAAANgGAMQgEAEgEAEQgOAOgTAAQgUAAgPgOQgLgMgCgQQAAgBAAgEQAAgUANgOQAHgHAJgDQAIgEALAAQAKAAAKAFQAHADAGAGQAGAGADAHQAFAJAAAMgAoqAFQAAAUgPANQgEAFgFADQgLAHgNAAQgUAAgOgPQgOgNAAgUQAAgTAOgOQALgLAPgCQAEgBAEAAQALAAAJAEQAHADAGAHQAFAEADAGQAHALAAAMg");
	this.shape_3.setTransform(41.975,-30.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#2D5200").ss(1,1,1).p("AKogsQg/AFgfAxIgdAKIAHgfAIBhJQAQAcgFAhQgBAIgCAHAH5AcQgFAGgEAEQglgmgtAXAqjhgQAUA0gQAnQgEAHgEAHAoag1Qg+AFgWBCIgkAeIAPgxAp/BTQBOgSANAg");
	this.shape_4.setTransform(48.05,-33.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#387F00").ss(2,1,1).p("AJfivQDOAXEWA0QAKACAMACQAkAkAUAmQAvBWgvBdASRgWIAACzQgKATgNATAJfivQDRAQELA0AgFAGQAFgvAag3QACgQAKgOQBKhqHvA5AgwhkQARAZALgQAyFheQAQgCAQgCQAFgBAFgBQBygNBvgHIDjgMICJAFIFAALIBwAEQASACARACAgFAGQgEgbAEgoQAFgJADgIQAXgmAMgKAgFAGQgEAjAHAeAgFAGQAFAggCAhAARB5QgOgXgFgbQgEA7gaBBIxHAAIgIAAAyMB5Qg3hvA3hgIAABnQADBvADATQABACAAACQAHAVAPAXQgHgSgDgO");
	this.shape_5.setTransform(39.6375,31.9003);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4B331C").ss(1,1,1).p("AVUAUIhIAAIAAghIAAgGIBIACIAAAFgA0LgNIhIgCIAAAhIBIAAg");
	this.shape_6.setTransform(39.6,74.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#4B331C").ss(2,1,1).p("AglhCIDvAAIOrAAIAACFMgjoAAAIAAhhIgBgk");
	this.shape_7.setTransform(40.1,58.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#2C7900").ss(2,1,1).p("Ak/o+QgBAAgBACQizhYkGgBIg7AAAM2iSIAAljQguiHiNgQQjsgbiLgCAklKqQgSgQgMgSQgCgCgBgCQgCgDgCgEIgUAtgAlLo3IglPf");
	this.shape_8.setTransform(74.4,-19.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#336600").ss(2,1,1).p("AAzipQgHgvgGgtQgdkHA9ieQDxhiEngMQpgAkAoHvASPIyIAADEQAVAIAUAGQCJAqBqgqQAPgGAPgIIAAv4QidhiidBiIAAJ/AydokIAADRQA+jMDoh5QB1g9EngwQk9ASh+AhQjVA3gyB3gAyOE9IgVpXQgCAIgIgEQiOhHiNBZIAAP3QAVAIAUAGQCJArBqgrQAPgGAPgIIAAjlIAAho");
	this.shape_9.setTransform(39.825,-8.5375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D5200").s().p("Ap8AmQgOgNAAgUQAAgTAOgOQALgLAPgCIAIgBQALAAAJAEQAHADAGAHIAIAKQAHALAAAMQAAAUgPANQgEAFgFADQgLAHgNAAQgUAAgOgPgApVALIAkgdIgkAdIAPgxIgPAxgApqgbIAIgOIgIAOgAI5AdQgLgMgCgQIAJgIIgJAIIAAgFQAAgUANgOQAHgHAJgDQAIgEALAAQAKAAAKAFQAHADAGAGQAGAGADAHQAFAJAAAMQAAANgGAMIgIAIQgOAOgTAAQgUAAgPgOgAJpgPIAdgKIgdAKIAHggIgHAggAJGghIADgPIgDAPgApVALgAJpgPg");
	this.shape_10.setTransform(41.975,-30.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#387F00").s().p("ADaDDQhPgNhJgQQgSgQgNgSIgCgEIgEgHQgPgXgFgbQACghgFggQgEAjAHAeQgFA7gZBBIxHAAIgIAAQgHgSgCgOQACAOAHASQgOgXgHgVIgBgEQgEgTgDhvIAAhnQFQgpEuAAIFAALQBRAGBOAKQARAZAKgQIAOAeQgEAoAFAbQAGgvAag3QACgQAKgOQBJhpHwA4QDNAXEWA0IAWAEQAlAkAUAmIAACzQgKATgOATgAyBhWIAABnIAABoQg2hvA2hggAAJBHIAAAAgAyBARg");
	this.shape_11.setTransform(38.4625,31.9003);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#4B331C").s().p("AUMB9IAAgFIAAgiIBIACIAAAgIhIAAIBIAAIAAAFgA1TB3IAAgjIBIACIAAAhgAxuAIIAAhhQADgDAEgBIAAgfIRHAAIDuAAIOsAAIAACEg");
	this.shape_12.setTransform(39.6,63.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C7900").s().p("AgYK5QAZhCAFg6QAFAaAPAYIAEAHIACADQANASASAQIg5AAIAUgsIgUAsIA5AAQBJARBPANgARhGVIgWgEIgHgIQkLg0jRgPQnwg5hJBpQgMALgXAmIgKAQIgOgeIAkveIgkPeQgBgMglgEIgkgEIhwgEIlAgMIiIgFIjjANQhvAHhyANIgLABIgfAEIAfgEIALgBQBygNBvgHQiJANiKAUIgVpXIAHg5IgHipQABgUAGgUQAahgCKg6IBjgUQjVA3gyB3IAADRQA9jMDoh5QB1g9EogwIA7AAQEAAICtBXQAFgEAFgCQABAAAAgBQAAAAAAAAQABAAAAAAQAAAAABAAQASgGAZAJQCPhzGJAFQCMACDrAaQCNARAuCHIAAFiIAAJ/QgUglglgkgAnHg6IgBgBIAAAAQgIgTgiAAIgBAAIAAAAQgSAAgaAFIAAAAIgDABIADgBIAAAAQAagFASAAIAAAAIABAAQAiAAAIATIAAAAIABABIAAAAgApCigQgPACgLALQgOAOAAAUQAAAUAOANQAOAPAUAAQANAAALgHQAFgDAEgFQAPgNAAgUQAAgNgHgLQAWhDA+gEQg+AEgWBDIgIgKQgGgHgHgDQgJgEgLAAIgIABQAHgSAAgVQAAgYgLgdQALAdAAAYQAAAVgHASIAAAAgAA9hIIgMhcIAMBcgAJpinQgJADgHAHQgNAOAAAUIAAAGQACAQALAMQAPAOAUAAQATAAAOgOIAIgIQAGgMAAgOQAAgMgFgJQAggzA/gFQg/AFggAzQgDgHgGgGQgGgGgHgDQgKgFgKAAQgLAAgIAEIABgPQAAgZgMgWQAMAWAAAZIgBAPIAAAAgAJMh1IgBgBQgWgWgZAAIAAAAIgBAAQgOAAgQAIIgCABIACgBQAQgIAOAAIABAAIAAAAQAZAAAWAWIABABIAAAAgABQpJQg9CeAeEHQgpnvJggkQkmAMjyBigApCigIAAAAgAJpinIAAAAg");
	this.shape_13.setTransform(38.775,-18.2085);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#339900").s().p("AyLBcIAIAAIAAAeQgFACgCADgAR1h+QAvBYgvBbg");
	this.shape_14.setTransform(42.45,42.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#336600").s().p("AS4MEQgUgGgVgIIAAjEQAvhdgvhYIAAp/QCdhiCdBiIAAP4QgPAIgPAGQg1AVg9AAQg8AAhFgVgA2fMBQgUgGgVgIIAAv3QCNhZCOBHQAIAEACgIIAVJXQg3BhA3BwIAADlQgPAIgPAGQg1AWg8AAQg9AAhFgWgABGqqQDxhiEngMQpgAkAoHvQgdkHA9iegAydokQAyh3DVg3QB+ghE9gSQknAwh1A9QjoB5g+DMg");
	this.shape_15.setTransform(39.825,-8.5375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},3).wait(48));

	// קיר
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E9DBC2").s().p("Eg2dAVAMgAXgp/MBtVAAAIAAK6IAUAAIAALhIgUAAIAAQRIAUAAIAADTg");
	this.shape_16.setTransform(1.125,-67.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E9AFBD").s().p("Eg2dAVAMgAXgp/MBtVAAAIAAK6IAUAAIAALhIgUAAIAAQRIAUAAIAADTg");
	this.shape_17.setTransform(1.125,-67.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16}]}).to({state:[{t:this.shape_17,p:{x:1.125}}]},3).to({state:[{t:this.shape_17,p:{x:-0.425}}]},47).wait(1));

	// רצפה
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F8E7E1").s().p("Eg2tAKhIAA1BMBtbAAAIAAVBg");
	this.shape_18.setTransform(0.225,133.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(51));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-457.5,-202.3,989.3,521.2);


(lib.האריפוטר = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(57.2,26.25);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(57.2,64.05);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);
	this.instance_2.setTransform(57.2,43.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},28).to({state:[{t:this.instance_2}]},31).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:64.05},28).wait(32));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},28).to({_off:true,y:43.35},31).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.4,-40,115.5,170.4);


(lib.סצנהטלוויזיה5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// מסגרת_עליונה
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(26,1,1).p("Eg3MgeiMBuZAAAMAAAA9FMhuZAAAg");
	this.shape.setTransform(646.95,19.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(26,1,1).p("Eg3uge1MBvdAAAMAAAA9rMhvdAAAg");
	this.shape_1.setTransform(651.175,17.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},119).wait(36));

	// הארי_פוטר
	this.instance = new lib.האריפוטר();
	this.instance.setTransform(259.5,34.15,1.2734,1.2734,0,0,0,57.2,65.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(21).to({_off:false},0).to({regY:65.9,x:482.4,y:158.25},18).to({x:640.6,y:135.35},18).to({regY:65.8,x:736.8,y:55.9},20).to({regY:65.9,x:882.85,y:159.9},17).to({regX:57.3,regY:65.8,scaleX:1.2856,scaleY:1.2856,x:990.6,y:58.7},25).to({x:1090.45,y:15.45},11).to({_off:true},1).wait(24));

	// כדור_קוודיץ
	this.instance_1 = new lib.כדורקווידיץ();
	this.instance_1.setTransform(615.05,59.1,0.3414,0.3414,0,0,0,25.4,25.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(21).to({_off:false},0).to({x:654.95,y:8.55},12).to({x:718.15,y:-56.45},14).to({x:793.9,y:-77.45},9).to({x:865.85,y:-81.75},9).to({x:927.65,y:-9.55},7).to({x:955.2,y:55.45},9).to({x:1000.25,y:59.1},6).to({x:1029.35,y:24.65},6).to({x:1085.3},6).to({regY:24.9,scaleX:0.3446,scaleY:0.3446,x:1119.65,y:-112.5},20).to({_off:true},11).wait(25));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("Ag7AQIAAgfIB3AAIAAAfg");
	this.shape_2.setTransform(642.85,22.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AmIAPIAAgdIMRAAIAAAdg");
	this.shape_3.setTransform(643,22.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("ArVAOIAAgbIWrAAIAAAbg");
	this.shape_4.setTransform(643.175,21.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("AwhAOIAAgaMAhEAAAIAAAag");
	this.shape_5.setTransform(643.3,21.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#666666").s().p("A1uANIAAgZMArdAAAIAAAZg");
	this.shape_6.setTransform(643.475,21.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#666666").s().p("A67AMIAAgXMA13AAAIAAAXg");
	this.shape_7.setTransform(643.625,21.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#666666").s().p("EggHAALIAAgVMBAPAAAIAAAVg");
	this.shape_8.setTransform(643.775,20.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#666666").s().p("EglUAAKIAAgTMBKpAAAIAAATg");
	this.shape_9.setTransform(643.95,20.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#666666").s().p("EgqhAAJIAAgRMBVDAAAIAAARg");
	this.shape_10.setTransform(644.075,20.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#666666").s().p("EgvuAAJIAAgQMBfcAAAIAAAQg");
	this.shape_11.setTransform(644.25,19.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#666666").s().p("Eg06AAHIAAgOMBp1AAAIAAAOg");
	this.shape_12.setTransform(644.4,19.6);

	this.instance_2 = new lib.CachedBmp_27();
	this.instance_2.setTransform(304.5,-0.5,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_28();
	this.instance_3.setTransform(303.3,-19.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_29();
	this.instance_4.setTransform(302.1,-38.2,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_30();
	this.instance_5.setTransform(300.9,-57.05,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_31();
	this.instance_6.setTransform(299.7,-75.9,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_32();
	this.instance_7.setTransform(298.45,-94.75,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_33();
	this.instance_8.setTransform(297.25,-113.6,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_34();
	this.instance_9.setTransform(296.05,-132.45,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_35();
	this.instance_10.setTransform(294.85,-151.3,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_36();
	this.instance_11.setTransform(293.15,-170.15,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_37();
	this.instance_12.setTransform(293.15,-170.15,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_38();
	this.instance_13.setTransform(294,-173.8,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_39();
	this.instance_14.setTransform(293.15,-170.15,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_40();
	this.instance_15.setTransform(294.85,-151.3,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_41();
	this.instance_16.setTransform(296.05,-132.45,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_42();
	this.instance_17.setTransform(297.25,-113.6,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_43();
	this.instance_18.setTransform(298.45,-94.75,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_44();
	this.instance_19.setTransform(299.7,-75.9,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_45();
	this.instance_20.setTransform(300.9,-57.05,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_46();
	this.instance_21.setTransform(302.1,-38.2,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_47();
	this.instance_22.setTransform(303.3,-19.35,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_48();
	this.instance_23.setTransform(304.5,-0.5,0.5,0.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#666666").s().p("EgwlAAIIAAgPMBhLAAAIAAAPg");
	this.shape_13.setTransform(644.275,19.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#666666").s().p("EgsQAAJIAAgRMBYgAAAIAAARg");
	this.shape_14.setTransform(644.15,20.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#666666").s().p("Egn6AAKIAAgTMBP1AAAIAAATg");
	this.shape_15.setTransform(644.025,20.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#666666").s().p("EgjlAAKIAAgTMBHLAAAIAAATg");
	this.shape_16.setTransform(643.875,20.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#666666").s().p("A/QALIAAgVMA+hAAAIAAAVg");
	this.shape_17.setTransform(643.75,20.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#666666").s().p("A2lANIAAgYMAtLAAAIAAAYg");
	this.shape_18.setTransform(643.5,21.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#666666").s().p("AyQANIAAgaMAkhAAAIAAAag");
	this.shape_19.setTransform(643.375,21.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#666666").s().p("At7AOIAAgbIb3AAIAAAbg");
	this.shape_20.setTransform(643.25,21.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#666666").s().p("ApmAPIAAgdITNAAIAAAdg");
	this.shape_21.setTransform(643.1,22.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#666666").s().p("AlRAQIAAgeIKjAAIAAAeg");
	this.shape_22.setTransform(642.975,22.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2}]}).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},98).to({state:[{t:this.instance_14}]},11).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_2).to({_off:true},1).wait(151).to({_off:false},0).wait(3));

	// מסגרת
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(26,1,1).p("Eg3MgeiMBuZAAAMAAAA9FMhuZAAAg");
	this.shape_23.setTransform(646.95,19.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("Eg3MAejMAAAg9FMBuZAAAMAAAA9Fg");
	this.shape_24.setTransform(646.95,19.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(26,1,1).p("Eg3uge1MBvdAAAMAAAA9rMhvdAAAg");
	this.shape_25.setTransform(651.175,17.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Eg3uAe2MAAAg9rMBvdAAAMAAAA9rg");
	this.shape_26.setTransform(651.175,17.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23}]}).to({state:[{t:this.shape_26},{t:this.shape_25}]},119).wait(36));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(186.1,-193.1,979.1999999999999,420.79999999999995);


// stage content:
(lib.theBALL_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,48,236,245,258,443,449];
	this.streamSoundSymbolsList[48] = [{id:"Glassbreakingsound",startFrame:48,endFrame:236,loop:1,offset:0}];
	this.streamSoundSymbolsList[236] = [{id:"Tvturnoffsoundeffect",startFrame:236,endFrame:244,loop:1,offset:0}];
	this.streamSoundSymbolsList[245] = [{id:"TVstaticnoise",startFrame:245,endFrame:258,loop:1,offset:0}];
	this.streamSoundSymbolsList[258] = [{id:"Flutemagicaltransiotion",startFrame:258,endFrame:369,loop:1,offset:0}];
	this.streamSoundSymbolsList[443] = [{id:"Snowballhitsoundeffect",startFrame:443,endFrame:449,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var self = this;
		
		self.stop();
		
		self.Butt.addEventListener("click",start);
		function start(){
			
			self.gotoAndPlay(1);
		}
	}
	this.frame_48 = function() {
		var soundInstance = playSound("Glassbreakingsound",0);
		this.InsertIntoSoundStreamData(soundInstance,48,236,1);
	}
	this.frame_236 = function() {
		var soundInstance = playSound("Tvturnoffsoundeffect",0);
		this.InsertIntoSoundStreamData(soundInstance,236,244,1);
	}
	this.frame_245 = function() {
		var soundInstance = playSound("TVstaticnoise",0);
		this.InsertIntoSoundStreamData(soundInstance,245,258,1);
	}
	this.frame_258 = function() {
		var soundInstance = playSound("Flutemagicaltransiotion",0);
		this.InsertIntoSoundStreamData(soundInstance,258,369,1);
	}
	this.frame_443 = function() {
		var soundInstance = playSound("Snowballhitsoundeffect",0);
		this.InsertIntoSoundStreamData(soundInstance,443,449,1);
	}
	this.frame_449 = function() {
		var self = this;
		
		self.stop();
		
		self.pan.addEventListener("click",start);
		function start(){
			
			self.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(48).call(this.frame_48).wait(188).call(this.frame_236).wait(9).call(this.frame_245).wait(13).call(this.frame_258).wait(185).call(this.frame_443).wait(6).call(this.frame_449).wait(1));

	// בועת_דיבור
	this.text = new cjs.Text("press to kick the ball", "38px 'Showcard Gothic'", "#FFB525");
	this.text.textAlign = "center";
	this.text.lineHeight = 49;
	this.text.lineWidth = 453;
	this.text.parent = this;
	this.text.setTransform(338.55,48);

	this.timeline.addTween(cjs.Tween.get(this.text).to({_off:true},1).wait(449));

	// MergedLayer_1
	this.Butt = new lib.buttonball();
	this.Butt.name = "Butt";
	this.Butt.setTransform(338,213.9,1,1,0,0,0,300.3,32.6);
	new cjs.ButtonHelper(this.Butt, 0, 1, 2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("Eg2fgewMBs/AAAMAAAA9hMhs/AAAg");
	this.shape.setTransform(350.075,198.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Eg2fAexMAAAg9hMBs/AAAMAAAA9hg");
	this.shape_1.setTransform(350.075,198.225);

	this.pan = new lib.playAgain();
	this.pan.name = "pan";
	this.pan.setTransform(378.05,226,1.2154,1.2154,14.9993,0,0,98.7,29.4);
	new cjs.ButtonHelper(this.pan, 0, 1, 2);

	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(34.3,-101.85,0.5,0.5);

	this.instance_1 = new lib.כדור();
	this.instance_1.setTransform(204.55,201.65,3.0517,3.0517,44.9976,0,0,25.4,25.2);

	this.instance_2 = new lib.CachedBmp_1();
	this.instance_2.setTransform(-23.15,-207.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.Butt}]}).to({state:[]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.pan}]},448).wait(1));

	// סצנה_3
	this.instance_3 = new lib.scene2();
	this.instance_3.setTransform(700.5,404,1,1,0,0,0,349.2,201.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFC786").ss(1,1,1).p("AMK/gMAAAA/BI4TAA");
	this.shape_2.setTransform(620.7,199.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.instance_3}]},107).to({state:[]},51).wait(292));

	// סצנה_5
	this.instance_4 = new lib.סצנהטלוויזיה5();
	this.instance_4.setTransform(-224.9,247.05,1,1,0,0,0,68.5,68.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(245).to({_off:false},0).to({_off:true},158).wait(47));

	// סצנה_6
	this.instance_5 = new lib.סצנה5();
	this.instance_5.setTransform(-198.95,-30.1,1,1,0,0,0,35.9,35.9);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(403).to({_off:false},0).to({_off:true},46).wait(1));

	// סצנה4
	this.instance_6 = new lib.סצנה_4();
	this.instance_6.setTransform(-179.75,155.9,1,1,0,0,0,34.6,34.6);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(158).to({_off:false},0).to({_off:true},87).wait(205));

	// סצנה_1
	this.instance_7 = new lib.סצנה4();
	this.instance_7.setTransform(704.1,399.75,1,1,0,0,0,350.6,198);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({_off:false},0).to({_off:true},47).wait(402));

	// סצנה2
	this.instance_8 = new lib.עציץנופל();
	this.instance_8.setTransform(700.5,400.65,1,1,0,0,0,349.2,201.7);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(48).to({_off:false},0).to({_off:true},59).wait(343));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(48.3,-7.9,1053.5,538.3);
// library properties:
lib.properties = {
	id: 'F9F170185B26D34AAA10D046FAA26EEC',
	width: 700,
	height: 400,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_21.png?1650372128221", id:"CachedBmp_21"},
		{src:"images/CachedBmp_2.png?1650372128221", id:"CachedBmp_2"},
		{src:"images/CachedBmp_1.png?1650372128221", id:"CachedBmp_1"},
		{src:"images/theBALL_HTML5 Canvas_atlas_1.png?1650372128109", id:"theBALL_HTML5 Canvas_atlas_1"},
		{src:"images/theBALL_HTML5 Canvas_atlas_2.png?1650372128109", id:"theBALL_HTML5 Canvas_atlas_2"},
		{src:"images/theBALL_HTML5 Canvas_atlas_3.png?1650372128109", id:"theBALL_HTML5 Canvas_atlas_3"},
		{src:"images/theBALL_HTML5 Canvas_atlas_4.png?1650372128109", id:"theBALL_HTML5 Canvas_atlas_4"},
		{src:"images/theBALL_HTML5 Canvas_atlas_5.png?1650372128109", id:"theBALL_HTML5 Canvas_atlas_5"},
		{src:"images/theBALL_HTML5 Canvas_atlas_6.png?1650372128109", id:"theBALL_HTML5 Canvas_atlas_6"},
		{src:"images/theBALL_HTML5 Canvas_atlas_7.png?1650372128110", id:"theBALL_HTML5 Canvas_atlas_7"},
		{src:"images/theBALL_HTML5 Canvas_atlas_8.png?1650372128110", id:"theBALL_HTML5 Canvas_atlas_8"},
		{src:"images/theBALL_HTML5 Canvas_atlas_9.png?1650372128110", id:"theBALL_HTML5 Canvas_atlas_9"},
		{src:"sounds/Flutemagicaltransiotion.mp3?1650372128221", id:"Flutemagicaltransiotion"},
		{src:"sounds/Glassbreakingsound.mp3?1650372128221", id:"Glassbreakingsound"},
		{src:"sounds/Snowballhitsoundeffect.mp3?1650372128221", id:"Snowballhitsoundeffect"},
		{src:"sounds/TVstaticnoise.mp3?1650372128221", id:"TVstaticnoise"},
		{src:"sounds/Tvturnoffsoundeffect.mp3?1650372128221", id:"Tvturnoffsoundeffect"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F9F170185B26D34AAA10D046FAA26EEC'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;