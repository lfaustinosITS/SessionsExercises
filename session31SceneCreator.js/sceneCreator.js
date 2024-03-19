const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d")

ctx.lineWidth = 2;
ctx.strokeStyle = "rgb(0,0,0)"
ctx.fillStyle = "rgb(0,200,0)"

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    
    }
    
    move(x1, y1) {
    
    }
    scale(scaleFactor){

    }
    draw(ctx){

    }
    clone(){

    }
}
class Circle extends Shape{
    #id
    constructor(x, y, id, radio) {
        super(x, y)
        this.#id = id
        this.radio = radio
    }
    move(x1, y1) {
        return new Circle(this.x += x1,this.y += y1,`moved ${this.#id}`,this.radio)
    }
    scale(scaleFactor) {
        let newRadio = this.radio * scaleFactor
        return new Circle(this.x,this.y,`rescaled ${this.#id}`,newRadio)
    }
    draw(ctx) {
        ctx.strokeRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.arc(this.x + this.radio, this.y + this.radio, this.radio, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
    }
    clone() {
        return new Circle(this.x, this.y, `copy of ${this.#id}`, this.radio)
    }
}


class Scene {
    constructor(shapes,selection = []) {
        this.shapes = shapes
        this.selected =false
        this.selection = selection
    }
    select(criteria) {
        for (const shape of this.shapes) {
            if (criteria(shape)) {
                this.selection.push(this.shapes.indexOf(shape))
            }
        }
        return this
    }
    scale(scaleFactor){
        let newShapes = []
        for(const index in this.shapes){
            if (this.selection.includes(Number(index))){
                
                newShapes.push(this.shapes[index].scale(scaleFactor))
            }else{
                newShapes.push(this.shapes[index].clone())
            }
        }
        return new Scene(newShapes,this.selection)
    }
    move(x1,y1){
        let newShapes = []
        for(const index in this.shapes){
            if (this.selection.includes(Number(index))){
                newShapes[index] = this.shapes[index].move(x1,y1)
            }else{
                newShapes[index] = this.shapes[index].clone()
            }
        }
        return new Scene(newShapes,this.selection)
    }
    draw(ctx){
        ctx.clearRect(0, 0, 500, 500);
        for(const element of this.shapes){
            element.draw(ctx)
        }
    }
}
const circle1 = new Circle(50, 50,'one', 10)
const circle2 = new Circle(250, 250,'two', 20)
const circle3 = new Circle(50, 400,'three', 30)

const testScene = [circle1, circle2, circle3]


function isSmall(item){
    return item.radio<15
}

const scene = new Scene(testScene)

scene.draw(ctx)
setTimeout(()=>{
let afterScene = scene.select(isSmall).scale(3).move(50,50)
afterScene.draw(ctx)
console.log(afterScene)
},3000)