
export class Canvas {
    constructor(ctx) {
        this.ctx = ctx;
    }
    initialize() {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "rgb(0,0,0)"
        this.ctx.fillStyle = "rgb(0,200,0)"
        this.ctx.strokeRect(0, 0, 500, 500);
    }
    
}


class Shape{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    centerX() {
         return this.x + 25
    }
    centerY() {
         return this.y + 25
    }
    draw(ctx){

    }
    clear(ctx){
        ctx.clearRect(this.x-10, this.y-10, 70, 70);
    }
    move(move,value){
        switch (move) {
            case 'l':
                this.x -= 10 * value;
                break
            case 'r':
                this.x += 10 * value;
                break
            case 'd':
                this.y += 10 * value;
                break
            case 'u':
                this.y -= 10 * value
                break
        }
    }

}

class Square extends Shape{
    constructor(x,y){
        super(x,y)
    }
    draw(ctx){
        ctx.strokeRect(0, 0, 500, 500);
        ctx.fillRect(this.x, this.y, 50, 50)
        ctx.strokeRect(this.x, this.y, 50, 50)
    }
}

class Triangle extends Shape{
    constructor(x,y){
        super(x,y)
    }
    draw(ctx){
        ctx.strokeRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.moveTo(this.x + 25, this.y);
        ctx.lineTo(this.x + 50, this.y + 50);
        ctx.stroke();
        ctx.lineTo(this.x, this.y + 50);
        ctx.stroke();
        ctx.lineTo(this.x + 25, this.y);
        ctx.stroke();
        ctx.fill();
        ctx.save();
    }
}

class Circle extends Shape{
    constructor(x,y){
        super(x,y)
    }
    draw(ctx){
        ctx.strokeRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 25, 25, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
    }
}

class MM extends Shape{
    constructor(x,y){
        super(x,y)
    }
    draw(ctx){
        ctx.strokeRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 25, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 5, this.y + 5, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 45, this.y + 5, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}

export const shapeFactory = {
    get(type,x,y){
    switch (type) {
        case 'triangle':
            return new Triangle(x,y)
            
        case 'square':
            return new Square(x,y)
            
        case 'mm':
             return new MM(x,y)
            
        default:
             return new Circle(x,y)
        }   
    }
}




