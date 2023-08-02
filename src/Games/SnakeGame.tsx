import { useEffect, useState } from "react";

enum GameState{
    Stopped,
    Paused,
    Running,
    Ended
}

enum Direction{
    None,
    Up,
    Right,
    Down,
    Left
}

class SnakePart{
    x: number;
    y: number;
    prev: SnakePart | null;
    next: SnakePart | null;

    constructor(x: number, y: number, prev: SnakePart | null, next: SnakePart | null){
        this.x = x;
        this.y = y;
        this.prev = prev;
        this.next = next;
    }
}

class SnakeClass{
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    endGameCallback: () => void = () => {};

    width: number;
    height: number;

    gameStarted: boolean = false;

    gameState: GameState = GameState.Stopped

    snakeHead: SnakePart = new SnakePart(0, 0, null, null);
    snakeTail: SnakePart | null = null;

    snakeSize: number = 1;

    cellDimensions: number = 16;

    frameDelay:number = 10;
    framesPerMove: number = 6;
    currentFrame: number = 0;

    snakeDirection: Direction = Direction.Right;
    bufferedDirections: Direction[] = [Direction.None];

    snakePoints: Set<string> = new Set();
    foodPoints: Set<string> = new Set();

    foodAmount: number = 10;


    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, width: number, height: number){
        this.context = ctx;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
    }

    lastKeypress: number = 0;
    keyPressListener = (e: KeyboardEvent) => {
        let delta = Date.now() - this.lastKeypress;
        let bufferDelta = 100

        switch(e.key){
            case "Escape":
                this.setGameState(GameState.Paused)
                this.endGameCallback();
                break;
            case "w":
            case "ArrowUp":
                if(this.snakeDirection != Direction.Down){
                    this.bufferedDirections[0] = Direction.Up;
                }

                if(delta < bufferDelta){
                    this.bufferedDirections[1] = Direction.Up;
                }
                break;
            case "a":
            case "ArrowLeft":
                if(this.snakeDirection != Direction.Right)
                    this.bufferedDirections[0] = Direction.Left;

                if(delta < bufferDelta){
                    this.bufferedDirections[1] = Direction.Left;
                }
                break;
            case "s":
            case "ArrowDown":
                if(this.snakeDirection != Direction.Up)
                    this.bufferedDirections[0] = Direction.Down;

                if(delta < bufferDelta){
                    this.bufferedDirections[1] = Direction.Down;
                }
                break;
            case "d":
            case "ArrowRight":
                if(this.snakeDirection != Direction.Left)
                    this.bufferedDirections[0] = Direction.Right;
                
                if(delta < bufferDelta){
                    this.bufferedDirections[1] = Direction.Right;
                }
                break;
            case "c":
                this.appendNextSnakeHead(this.snakeHead.x + 1, this.snakeHead.y);
                break;
            case "=":
                this.framesPerMove++;
                break;
            case "-":
                if(this.framesPerMove > 1)
                    this.framesPerMove--;
                break;
            case "[":
                this.cellDimensions++;
                this.clear()
                break;
            case "]":
                this.clear()
                if(this.cellDimensions > 1)
                    this.cellDimensions--;
                break;
        }

        this.lastKeypress = Date.now();
    }

    clear(){
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(0, 0, this.width, this.height);
    }

    onResize(width: number, height: number){
        width -= width % this.cellDimensions
        height -= height % this.cellDimensions

        this.width = width;
        this.height = height;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.clear();
    }

    setRunning(shouldRun: boolean){
        
        this.setGameState(shouldRun ? GameState.Running : GameState.Paused)
    }

    setGameState(state: GameState){
        switch(state){
            case GameState.Paused:
                if(this.gameState != GameState.Paused && this.gameState != GameState.Ended)
                    this.drawPauseText();
                
                break;
            case GameState.Running:
                if(!this.gameStarted){
                    this.startGame();
                }

                if(this.gameState == GameState.Paused || this.gameState == GameState.Ended){
                    this.clear();
                    //redraw game
                }

                break;
            case GameState.Stopped:

                break;
            case GameState.Ended:
                this.drawEndText();
                
                this.gameStarted = false;

                this.endGameCallback();
                break;
        }

        this.gameState = state;
    }

    startGame(){
        this.gameStarted = true;
        this.clear();
        //start promise with game loop
        this.snakePoints.clear();

        this.snakeHead.x = Math.floor(this.width / this.cellDimensions / 2)
        this.snakeHead.y = Math.floor(this.height / this.cellDimensions / 2)
        this.snakeHead.next = null;
        this.snakeHead.prev = null;

        this.snakeTail = null;

        this.snakeSize = 1
        this.snakeDirection = Direction.Right

        this.snakePoints.add(this.snakeHead.x + "," + this.snakeHead.y)

        this.appendNextSnakeHead(this.snakeHead.x + 1, this.snakeHead.y)

        this.bufferedDirections = [Direction.Right]

        this.foodPoints.clear();
        this.generateFood();

        this.gameLoop();
    }

    drawTitle(){
        this.context.font = "30px proxima-nova sans-serif";
        this.context.fillStyle = "black"
        this.context.textAlign = "center"
        this.context.fillText("Snake Game", this.width / 2, 50);

        this.context.font = "16px proxima-nova sans-serif";
        this.context.fillText("click to begin playing", this.width / 2, 76);
        this.context.fillText("use wasd or arrow keys to move ", this.width / 2, 97);
    }

    drawPauseText(){
        this.context.font = "30px proxima-nova sans-serif";
        this.context.fillStyle = "black"
        this.context.textAlign = "center"
        this.context.fillText("Game Paused", this.width / 2, 50);

        this.context.font = "16px proxima-nova sans-serif";
        this.context.fillText("click to resume", this.width / 2, 76);
    }

    drawEndText(){
        this.context.font = "30px proxima-nova sans-serif";
        this.context.fillStyle = "black"
        this.context.textAlign = "center"
        this.context.fillText("Game Over", this.width / 2, 50);

        this.context.font = "16px proxima-nova sans-serif";
        this.context.fillText("final score: " + this.snakeSize, this.width / 2, 76);
    }

    advanceSnake(){
        let advanceX = 0;
        let advanceY = 0;

        switch(this.snakeDirection){
            case Direction.Up:
                advanceY = -1;
                break;
            case Direction.Right:
                advanceX = 1;
                break;
            case Direction.Down:
                advanceY = 1;
                break;
            case Direction.Left:
                advanceX = -1;
                break;
        }

        advanceX = this.snakeHead.x + advanceX;
        advanceY = this.snakeHead.y + advanceY;

        let cellsX = this.width / this.cellDimensions - 1;
        let cellsY = this.height / this.cellDimensions - 1;

        let cellString = advanceX + "," + advanceY;

        if(this.snakePoints.has(cellString)){
            this.setGameState(GameState.Ended);
            return;
        }

        this.appendNextSnakeHead(advanceX, advanceY);

        if(this.foodPoints.has(cellString)){
            this.foodPoints.delete(cellString);
            this.generateFood();
            this.snakeSize++;
        }
        else{
            this.clearSnakeTail();
            this.removeSnakeTail();
        }

        this.drawSnake();
        this.drawPartialSnakeMovement();

        if(advanceX > cellsX || advanceX < 0 || advanceY > cellsY || advanceY < 0){
            this.setGameState(GameState.Ended);
            return;
        }
    }

    drawSnake(){
        let curr: SnakePart | null = this.snakeHead;

        let segments = 0;

        while(curr != null){

            if(!(curr == this.snakeHead)){
                // this.context.fillStyle = "#" + ((segments * 8) % 256).toString(16).padStart(2, "0") + "0000"
                this.context.fillStyle = "#000000"

                this.context.fillRect(curr.x * this.cellDimensions, curr.y * this.cellDimensions, this.cellDimensions, this.cellDimensions);
            }
            segments++;
            curr = curr.prev;
        }
    }

    drawPartialSnakeMovement(){
        this.context.fillStyle = "#000000"

        let xProportion = 0;
        let yProportion = 0;

        let tailDirection = {
            x: 0,
            y: 0
        }

        let headDirection = {
            x: 0,
            y: 0
        }

        let hasTail = this.snakeTail != null;

        let proportion = this.currentFrame % this.framesPerMove / this.framesPerMove;

        if(hasTail){
            //@ts-ignore
            tailDirection.x = this.snakeTail.next?.x - this.snakeTail?.x;
            //@ts-ignore
            tailDirection.y = this.snakeTail?.y - this.snakeTail.next?.y;
        }

        switch(this.snakeDirection){
            case Direction.Right:
                xProportion = proportion;
                yProportion = 0;

                headDirection.x = -1

                if(!hasTail)
                    tailDirection.x = -1
                break;
            case Direction.Left:
                xProportion = -proportion;
                yProportion = 0;

                headDirection.x = 1

                if(!hasTail)
                    tailDirection.x = 1
                break;
            case Direction.Up:
                xProportion = 0;
                yProportion = -proportion;

                headDirection.y = 1

                if(!hasTail)
                    tailDirection.y = 1
                break;
            case Direction.Down:
                xProportion = 0;
                yProportion = proportion;

                headDirection.y = -1

                if(!hasTail)
                    tailDirection.y = -1
                break;
        }

        this.context.fillRect((this.snakeHead.x + headDirection.x) * this.cellDimensions + this.cellDimensions * xProportion, 
            (this.snakeHead.y + headDirection.y) * this.cellDimensions + this.cellDimensions * yProportion, 
            this.cellDimensions, this.cellDimensions);

        this.context.fillStyle = "#FFFFFF"

        if(hasTail && this.snakeTail){
            //mask tail
            if(tailDirection.x != 0){
                this.context.fillRect((this.snakeTail.x) * this.cellDimensions + (1 - proportion) * this.cellDimensions * (tailDirection.x == -1 ? 1 : 0), 
                (this.snakeTail.y) * this.cellDimensions, 
                this.cellDimensions * proportion, this.cellDimensions);
            }
            else if(tailDirection.y != 0){
                this.context.fillRect((this.snakeTail.x) * this.cellDimensions, 
                (this.snakeTail.y) * this.cellDimensions + (1 - proportion) * this.cellDimensions * (tailDirection.y == -1 ? 0 : 1), 
                this.cellDimensions, this.cellDimensions * proportion);
            }
        }
    }

    appendNextSnakeHead(x: number, y: number){
        let newHead = new SnakePart(x, y, this.snakeHead, null);
        this.snakeHead.next = newHead;
        if(this.snakeTail == null)
        {
            this.snakeTail = this.snakeHead
        }

        this.snakeHead = newHead;

        this.snakePoints.add(this.snakeHead.x + "," + this.snakeHead.y)
    }

    prependSnakeTail(x: number, y: number){
        let newTail = new SnakePart(x, y, null, this.snakeTail);

        if(this.snakeTail)
            this.snakeTail.prev = newTail;

        this.snakeTail = newTail;

        this.snakePoints.add(this.snakeTail.x + "," + this.snakeTail.y)
    }

    clearSnakeTail(){
        this.context.fillStyle = "#FFFFFF"

        if(this.snakeTail != null){
            this.context.fillRect(this.snakeTail.x * this.cellDimensions, this.snakeTail.y * this.cellDimensions, this.cellDimensions, this.cellDimensions);
        }
    }

    removeSnakeTail(){
        if(this.snakeTail){
            this.snakePoints.delete(this.snakeTail.x + "," + this.snakeTail.y)

            if(this.snakeTail.next == this.snakeHead){
                this.snakeTail = null;
                this.snakeHead.prev = null;
            }
            else{
                this.snakeTail = this.snakeTail.next as SnakePart;
                this.snakeTail.prev = null;
            }
        }
    }

    generateFood(){
        let cells = {
            x: this.width / this.cellDimensions - 1,
            y: this.height / this.cellDimensions - 1
        }

        const maxTries = 50;
        let tries = 0;
        while(this.foodPoints.size < this.foodAmount){
            if(tries > maxTries){
                for(let i = 0; i < cells.x; i++){
                    for(let j = 0; j < cells.y; j++){
                        let foodPoint = {
                            x: i,
                            y: j,
                        }

                        let foodStr = foodPoint.x + "," + foodPoint.y;

                        if(!this.snakePoints.has(foodStr)){
                            this.foodPoints.add(foodStr)
                        }

                        if(this.foodPoints.size >= this.foodAmount)
                            return;
                    }
                }

                return;
            }

            let foodPoint = {
                x: Math.round(Math.random() * cells.x),
                y: Math.round(Math.random() * cells.y),
            }

            let foodStr = foodPoint.x + "," + foodPoint.y;

            if(!this.snakePoints.has(foodStr)){
                this.foodPoints.add(foodStr)
            }

            tries++;
        }
    }

    drawFood(){
        this.context.fillStyle = "green"

        this.foodPoints.forEach(point => {
            let p = point.split(",")

            this.context.fillRect(+p[0] * this.cellDimensions, +p[1] * this.cellDimensions, this.cellDimensions, this.cellDimensions);
        });
    }

    checkDirectionNonContradictory(){
        switch(this.snakeDirection){
            case Direction.Up:
                if(this.bufferedDirections[0] == Direction.Down) return false
                break;
            case Direction.Right:
                if(this.bufferedDirections[0] == Direction.Left) return false
                break;
            case Direction.Down:
                if(this.bufferedDirections[0] == Direction.Up) return false
                break;
            case Direction.Left:
                if(this.bufferedDirections[0] == Direction.Right) return false
                break;
        }

        return true
    }

    async gameLoop(){
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

        let prevTime = Date.now();
        let delta = 0;
        let framePercent = 1;
        while(true){
            if(!this.gameStarted)
                return;

            if(this.gameState != GameState.Running){
                await sleep(this.frameDelay)
                continue;
            }

            this.drawFood();

            if(this.currentFrame % this.framesPerMove == 0){
                if(this.bufferedDirections[0] != Direction.None)
                {
                    if(this.checkDirectionNonContradictory()){
                        this.snakeDirection = this.bufferedDirections[0]
                        if(this.bufferedDirections.length > 1){
                            this.bufferedDirections.shift();
                        }
                    }
                }
                
                this.advanceSnake();
            }
            else{
                this.drawPartialSnakeMovement();
            }
                

            delta = Date.now() - prevTime;
            framePercent = delta / this.frameDelay;

            // console.log((delta) + "      " + (framePercent))
            prevTime = Date.now();

            this.currentFrame++;
            await sleep(this.frameDelay)
        }
    }
}


const SnakeGame = () => {
    const [gameRunning, setGameRunning] = useState(false);
    const [snakeGameContext, setGameContext] = useState<SnakeClass | null>(null);

    const startGame = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if(!gameRunning){
            snakeGameContext?.setRunning(true);
            setGameRunning(true);

            let controlButtons = document.getElementsByName("snake_controls")
            controlButtons.forEach(item => item.style.zIndex = "101");

            let controlPanel = document.getElementById("snake_control_div");
            if(controlPanel && controlPanel.style)
                controlPanel.style.zIndex = "101";

            if(snakeGameContext?.canvas?.style?.zIndex)
                snakeGameContext.canvas.style.zIndex = "101"

            document.body.classList.toggle("Hide-Overflow", true);
        }
    }

    const endGame = () => {
        snakeGameContext?.setRunning(false);

        let controlButtons = document.getElementsByName("snake_controls")
            controlButtons.forEach(item => item.style.zIndex = "50");
        
        let controlPanel = document.getElementById("snake_control_div");
        if(controlPanel && controlPanel.style)
            controlPanel.style.zIndex = "50";

        if(snakeGameContext?.canvas?.style?.zIndex)
            snakeGameContext.canvas.style.zIndex = "50"

        setGameRunning(false);
        document.body.classList.toggle("Hide-Overflow", false);
    }

    let localSnake: SnakeClass;

    const onResize = () => {
        if(localSnake){
            localSnake.onResize((localSnake?.canvas.parentElement?.clientWidth ?? 300) - 40, 300)
        }
    }

    useEffect(() => {
        let canvas: HTMLCanvasElement = document.getElementById("snake_canvas") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
        
        let snake = new SnakeClass(context, canvas, 0, 0);
        localSnake = snake;
        snake.onResize((canvas.parentElement?.clientWidth ?? 300) - 40, 300)
        snake.clear();
        snake.drawTitle();

        snake.endGameCallback = endGame;

        setGameContext(snake);

        document.addEventListener("keydown", snake.keyPressListener);
        window.addEventListener("resize", onResize);

        return () => {
            document.removeEventListener("keydown", snake.keyPressListener);
            window.removeEventListener("resize", onResize);
        }
    }, [])

    return (
        <div>
            {gameRunning ? 
                <div style={{position: "fixed", top: "0px", left: "0px", width: "100%", height: "100vh", zIndex: 101, background: "black", opacity: 0.2}} onClick={() => endGame()}/> 
                :
                null
            }

            <canvas id="snake_canvas" width={300} height={300} onClick={(e) => startGame(e)} style={{zIndex: 50, position: "relative"}}/>
            {window.innerWidth < 500 ? 
                <div id="snake_control_div" style={{display:"flex", alignItems: "center", justifyContent: "center", position: "relative"}} onClick={() => {console.log("test")}}>
                    <div style={{display:"flex"}}>
                        {/*@ts-ignore */}
                        <button name="snake_controls" onClick={() => snakeGameContext?.keyPressListener({key: "a"})} style={{zIndex: 50, position: "relative", width: 50, height: 50}}>←</button>
                    </div>
                    <div style={{display:"flex", flexDirection: "column"}}>
                        {/*@ts-ignore */}
                        <button name="snake_controls" onClick={() => snakeGameContext?.keyPressListener({key: "w"})} style={{zIndex: 50, position: "relative", width: 50, height: 50}}>↑</button>
                        {/*@ts-ignore */}
                        <button name="snake_controls" onClick={() => snakeGameContext?.keyPressListener({key: "s"})} style={{zIndex: 50, position: "relative", width: 50, height: 50}}>↓</button>
                    </div>
                    <div style={{display:"flex"}}>
                        {/*@ts-ignore */}
                        <button name="snake_controls" onClick={() => snakeGameContext?.keyPressListener({key: "d"})} style={{zIndex: 50, position: "relative", width: 50, height: 50}}>→</button>
                    </div>
                </div>
            : 
            null}
            
            
        </div>
    )
}

export default SnakeGame;