class Node {
    constructor(val){
        this.val = val
        this.next = null
    }
}


export default class Queue{
    constructor(){
        this.first = null
        this.last = null
        this.length = 0
    }

    enqueue(val){
        const node = new Node(val)
        this.length++
        if(this.length === 1){
            this.first = node
            this.last = node
        }
        else{
            this.last.next = node
            this.last = node
        }
        return val
    }

    dequeue(){
        if(this.length === 0) return undefined
        this.length--
        const temp = this.first
        if(this.length === 0) this.last = null
        this.first = temp.next
        return temp.val
    }
}
