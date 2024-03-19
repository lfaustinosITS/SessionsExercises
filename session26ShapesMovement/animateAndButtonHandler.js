

const animate = {
    async processMovement(obj, shapes, callback, ctx) {
        let key = Object.getOwnPropertyNames(obj)[0]
        for (let i = 0; i < obj[key]; i++) {
            await new Promise((res) => { setTimeout(res, 100) })
            shapes.clear(ctx)
            shapes.move(key, 1)
            shapes.draw(ctx)
            callback()
        }

    },
    async applyMovements(movements, shapes, callback, ctx) {
        for (let i = 0; i < movements.length; i++) {
            await animate.processMovement(movements[i], shapes, callback, ctx);
        }
    }
}

export class ButtonContainerHandler {
    constructor(movementsStore) {
        this.movementsStore = movementsStore;
        this.storing = false
        this.debounceOn = false
        this.compressOn = false
    }
    containerHandler(value, shapes, callback, ctx) {
        if (this.debounceOn) {
            this.movementsStore.addValue(value)
            if (!this.storing) {
                this.storing = true
                setTimeout(async () => {
                    let movementPromises = this.compressOn ? this.movementsStore.getProcessQueue() : this.movementsStore.getProcessQueue('debounce');
                    this.movementsStore.resetQueue()
                    await animate.applyMovements(movementPromises, shapes, callback, ctx)
                    this.storing = false

                }, 3000)
            }
        } else {
            shapes.clear(ctx)
            shapes.move(value, 1)
            shapes.draw(ctx)
            callback()
        }
    }
    toggleCompress() {
        this.compressOn = !this.compressOn
    }
    toggleDebounce() {
        this.debounceOn = !this.debounceOn
    }
}