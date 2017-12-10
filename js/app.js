// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random()*100 + 150;
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
   // console.log(dt);
    this.x = this.x + this.speed*dt;
    if (this.x > 454) {
        this.x = this.random_Location(randomCol);
        this.y = this.random_Location(randomRow);
        this.speed = Math.random()*100 + 150;
    }
   // console.log(this.x);
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy的位置随机刷新方法，通过这个方法可以将走完全程的enemy刷新初始位置重新进入游戏中。
Enemy.prototype.random_Location = function (arr) {
    return(arr[Math.floor(Math.random() * arr.length)]);
};

var Player = function () {
    this.x = 202;
    this.y = 292;
    this.sprite = 'images/char-boy.png';
};
// 现在实现你自己的玩家类

//玩家的update方法，需要根据坐标区分是否可以移动。
Player.prototype.update = function(key) {
    switch (key) {
        case 'left':
            if(this.x > 0)
            this.x = this.x - 101;
            break;
        case 'right':
            if (this.x < 404)
            this.x = this.x + 101;
            break;
        case 'up':
            if (this.y > 43)
            {
                this.y = this.y - 83;
                console.log(this.x);
                console.log(this.y);
            }
            else if(this.y === 43 && this.x !== 202)
             this.reset();
            else if(this.y === 43 && this.x === 202)
            {
                console.log(this.y);
                this.y = this.y -83;
                console.log(this.y);
            }
            break;
        case 'down':
            if (this.y < 292)
            this.y = this.y + 83;
            break;
    }
};

//玩家的reset方法，用于将玩家打回最初的位置。
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 292;
};

//玩家的render方法
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//玩家的handleInput方法，来向update传送具体的动作。
Player.prototype.handleInput = function (key) {
  console.log(key);
  this.update(key);
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var enemy1 = new Enemy(0, 43);
var enemy2 = new Enemy(202, 126);
var enemy3 = new Enemy(0, 209);
var enemy4 = new Enemy(-101, 209);
var randomCol = [-101, 0];
var randomRow = [43, 126, 209];
console.log(enemy1.speed);
console.log(enemy2.speed);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player();
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
