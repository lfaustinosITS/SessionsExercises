export class MovementsStore {
    #queue
    constructor(letter) {
        this.#queue = [letter]
    }
    addValue(value) {
        this.#queue.push(value)
    }
    get queue() {
        return this.#queue
    }
    resetQueue() {
        this.#queue = []
    }
    getProcessQueue(value) {
        let timesPressedInOrder = []
        let itemToStore = this.#queue[0];
        for (let i = 1; i < this.#queue.length; i++) {
            let times = 1;
            while (this.#queue[i] === itemToStore) {
                times++;
                i++
            }
            timesPressedInOrder.push({ [itemToStore]: times })
            itemToStore = this.#queue[i]
        }
        if (value === 'debounce') {
            return timesPressedInOrder
        }else{
        let movementsCompressed = [];
        timesPressedInOrder.forEach(item => {
            const key = Object.keys(item)[0];
            const value = item[key];
            const existingItem = movementsCompressed.find(obj => Object.keys(obj)[0] === key)
            if (existingItem) {
                existingItem[key] += value;
            } else {
                movementsCompressed.push(item)
            }
        });
        return movementsCompressed}
    }
}

