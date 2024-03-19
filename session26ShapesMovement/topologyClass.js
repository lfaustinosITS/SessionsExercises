import { shapeFactory } from "./canvasAndShappes.js"

class Topology {
    
    identifyAxis(shapes,axis) {
        if (shapes[axis] > 500) {
            shapes[axis] = -50
            return true
        } else if (shapes[axis] < -50) {
            shapes[axis] = 500
            return true
        }
        return false
    }
    twistAxis(shapes,axis) {
        shapes[axis] = 450 - shapes[axis]
    }
    boundAxis(shapes,axis) {
        if (shapes[axis] > 450) {
            shapes[axis] = 450
        } else if (shapes[axis] < 0) {   
            shapes[axis] = 0
        }
    }

}
class UnboundedTopology extends  Topology{
    apply(shape){
        return
    }
}

class RectangleTopology extends Topology {
    
    apply(shape) {
        this.boundAxis(shape,'x');
        this.boundAxis(shape,'y');
    }

}
class CylinderTopology extends Topology {
    
    apply(shape) {
        this.boundAxis(shape,'y');
        this.identifyAxis(shape,'x');
    }

}
class TorusTopology extends Topology {
    
    apply(shape) {
        this.identifyAxis(shape,'y');
        this.identifyAxis(shape,'x');
    }

}
class MoebiusTopology extends Topology {
    
    apply(shape) {
        this.boundAxis(shape,'y');
        if (this.identifyAxis(shape,'x')) {
            this.twistAxis(shape,'y')
        }
    }
}
class KleinBottleTopology extends Topology {
   
    apply(shape) {
        this.identifyAxis(shape,'y');
        if (this.identifyAxis(shape,'x')) {
            this.twistAxis(shape,'y')
        }
    }
}
class ProyectivePlainTopology extends Topology {

    apply(shape) {
        if (this.identifyAxis(shape,'y')) {
            this.twistAxis(shape,'x')
        }
        if (this.identifyAxis(shape,'x')) {
            this.twistAxis(shape,'y')
        }
    }
}

export const topologyFactory = {
    get(type){
        switch (type) {
            case "rectangle":
                return new RectangleTopology()
            case 'cylinder':
                return new CylinderTopology()
                
            case 'torus':
                return new TorusTopology()
                
            case 'moebius':
                return new MoebiusTopology()
                
            case 'kleinBottle':
                return new KleinBottleTopology()
                
            case 'proyectivePlane':
                return new ProyectivePlainTopology()
                
            default:
                return new UnboundedTopology()
        }
    }
}

export class ShapeWithTopology{
    constructor(x,y){
        this.x=x
        this.y=y
        this.shape = shapeFactory.get("default",x,y)
        this.topology = topologyFactory.get("default")
    }
    changeTopology(value){
        this.topology = topologyFactory.get(value)
        this.topology.apply(this.shape)
    }
    changeShape(value){

        this.shape = shapeFactory.get(value,this.x,this.y)
    }
    move(move,value){
        this.shape.move(move,value)
        this.topology.apply(this.shape)
        this.x = this.shape.x
        this.y = this.shape.y
    }
    draw(ctx){
        this.shape.draw(ctx)
    }
    clear(ctx){
        this.shape.clear(ctx)
    }
    centerX(){
        return this.shape.centerX()
    }
    centerY(){
        return this.shape.centerY()
    }
}