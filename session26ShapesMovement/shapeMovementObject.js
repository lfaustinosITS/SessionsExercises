import { converterFactory } from "./outputConverter.js";
import { Canvas} from "./canvasAndShappes.js";
import { ShapeWithTopology } from "./topologyClass.js";
import { MovementsStore } from "./movementsStore.js"
import { ButtonContainerHandler } from "./animateAndButtonHandler.js";

(function(){ class App {
    constructor(canvas,
        ctx,
        userShapeType,
        displaySpace,
        debounceCheckbox,
        compressCheckbox,
        userOutputType,
        userTopologyType,
        buttonContainer) {
            this.canvas = canvas,
            this.ctx = ctx,
            this.userShapeType = userShapeType,
            this.displaySpace = displaySpace,
            this.debounceCheckbox = debounceCheckbox,
            this.compressCheckbox = compressCheckbox,
            this.userOutputType = userOutputType,
            this.userTopologyType = userTopologyType,
            this.buttonContainer = buttonContainer

            this.mainCanvas = new Canvas(this.ctx)
            this.userShape = new ShapeWithTopology(225,225)
            this.mainMovementsStore = new MovementsStore()
            this.buttonContainerBehavior = new ButtonContainerHandler(this.mainMovementsStore)
    }
    
    writeCoordinates() {
        let coorX = this.converter.convert(this.userShape.centerX());
        let coorY = this.converter.convert(this.userShape.centerY());
        this.displaySpace.textContent = `x= ${coorX}, y = ${coorY}`
    }
    init() {
        /*Button Handlers */
        this.buttonContainer.addEventListener("click", (event) => this.buttonContainerBehavior.containerHandler(event.target.id[0], this.userShape, this.writeCoordinates.bind(this),this.ctx))

        /* Option Menus*/
        this.userShapeType.addEventListener("change", () => {
            this.userShape.clear(this.ctx)
            this.userShape.changeShape(userShapeType.value)
            this.userShape.draw(this.ctx)
        });
        this.userOutputType.addEventListener("change", () => {
            this.converter = converterFactory.get(this.userOutputType.value)
            this.writeCoordinates()
        })
        this.userTopologyType.addEventListener('change', () => {
            this.userShape.clear(this.ctx)
            this.userShape.changeTopology(this.userTopologyType.value)
            this.userShape.draw(this.ctx)
            this.writeCoordinates()
        })

        /*Checkboxes*/
        this.debounceCheckbox.addEventListener('change', () => { this.buttonContainerBehavior.toggleDebounce() })
        this.compressCheckbox.addEventListener("change", () => { this.buttonContainerBehavior.toggleCompress() })

        /* Initialization*/
        this.debounceCheckbox.checked = false;
        this.compressCheckbox.checked = false;
        this.mainCanvas.initialize()
        this.userShape.changeTopology(userTopologyType.value)
        this.userShape.changeShape(userShapeType.value)
        this.userShape.draw(this.ctx)
        this.converter = converterFactory.get(userOutputType.value)
        this.writeCoordinates()
    }

}
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d')
const userShapeType = document.getElementById('changeShape');
const displaySpace = document.getElementById('displayCoordinates')
const debounceCheckbox = document.getElementById('switchDebounce')
const compressCheckbox = document.getElementById('compress')
const userOutputType = document.getElementById('outputType')
const userTopologyType = document.getElementById('changeTopology')
const buttonContainer = document.getElementById('buttonContainer')

const  mainApp = new App(
    canvas,
    ctx,
    userShapeType,
    displaySpace,
    debounceCheckbox,
    compressCheckbox,
    userOutputType,
    userTopologyType,
    buttonContainer
)

mainApp.init()})()