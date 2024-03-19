import { converterFactory } from "./outputConverter.js";
import { Canvas, shapeFactory} from "./canvasAndShappes.js";
import { topologyFactory,ShapeWithTopology } from "./topologyClass.js";
import { MovementsStore } from "./movementsStore.js"
import { ButtonContainerHandler } from "./animateAndButtonHandler.js";

(function(){
/*DOM elements*/
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d')
const userShapeType = document.getElementById('changeShape');
const displaySpace = document.getElementById('displayCoordinates')
const debounceCheckbox = document.getElementById('switchDebounce')
const compressCheckbox = document.getElementById('compress')
const userOutputType = document.getElementById('outputType')
const userTopologyType = document.getElementById('changeTopology')
const buttonContainer = document.getElementById('buttonContainer')

/*Instances */
const mainCanvas = new Canvas(ctx)
let testUserShape = new ShapeWithTopology(225,225)
let converter = converterFactory.get("default")
const mainMovementsStore = new MovementsStore();
const buttonContainerBehavior = new ButtonContainerHandler(mainMovementsStore)
/*Button Handlers */
buttonContainer.addEventListener("click",(event)=>buttonContainerBehavior.containerHandler(event.target.id[0],testUserShape,writeCoordinates,ctx))

/* Option Menus*/
userShapeType.addEventListener("change", () => {
    testUserShape.clear(ctx)
    testUserShape.changeShape(userShapeType.value)
    testUserShape.draw(ctx)
    
});
userOutputType.addEventListener("change", ()=>{
    converter = converterFactory.get(userOutputType.value)
    writeCoordinates()
})
userTopologyType.addEventListener("change",()=>{
    testUserShape.clear(ctx)
    testUserShape.changeTopology(userTopologyType.value)
    testUserShape.draw(ctx)
    writeCoordinates()
})

/*Checkboxes*/
debounceCheckbox.addEventListener("change",() =>buttonContainerBehavior.toggleDebounce())
compressCheckbox.addEventListener("change",()=>buttonContainerBehavior.toggleCompress())

/* Initialization*/
debounceCheckbox.checked = false;
compressCheckbox.checked = false;
mainCanvas.initialize()
testUserShape.changeTopology(userTopologyType.value)
testUserShape.changeShape(userShapeType.value)
testUserShape.draw(ctx)
converter = converterFactory.get(userOutputType.value)
writeCoordinates()

/*Functions with instance and DOM dependency*/
function writeCoordinates(){
    let coorX = converter.convert(testUserShape.centerX());
    let coorY = converter.convert(testUserShape.centerY());
    displaySpace.textContent =`x= ${coorX}, y = ${coorY}` 
}})()