function Clock(dateobj) {
    this.time = dateobj || new Date();
    this.warpFactor = 1;
    this.running = false;
    this.callback = null;
    this.eachTime = null;
}
Clock.prototype.tick = function(time) {
    delta = time || 1000;
    this.time.setTime(this.time.getTime() + delta);
};
Clock.prototype.run = function() {
    this.running = true;
    this.callback = null;
    this.eachTime = null;
    var self = this;
    var runningClock = setInterval(function() {
        if (!self.running) {
            clearInterval(runningClock);
            return;
        }
        self.tick();
    }, 1000 * (function(){return self.warpFactor;})());
};
Clock.prototype.each = function(numberOfMilliseconds, callback) {
    this.running = true;
    this.callback = callback;
    this.eachTime = numberOfMilliseconds;
    var self = this;
    var runningClock = setInterval(function() {
        if (!self.running) {
            clearInterval(runningClock);
            return;
        }
        callback();
        self.tick(numberOfMilliseconds);
    }, numberOfMilliseconds * this.warpFactor);
};
Clock.prototype.pause = function() {
    this.running = false;
};
Clock.prototype.toggle = function() {
    if (this.running) { 
        this.pause(); 
    }
    else if (this.callback) {
        this.each(this.eachTime, this.callback);
    }
    else {
        this.run();
    };
}