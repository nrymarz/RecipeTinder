class Node {
    constructor(val){
        this.val = val
        this.next = undefined
    }
}


export default class LinkedList{
    constructor(){
        this.head = undefined
        this.tail = undefined
        this.length = 0
    }

    push(val){
        node = new Node(val)
        this.length++
        if(this.length === 1){
            this.head = node
            this.tail = node
        }
        else{
            this.tail.next = node
            this.tail = node
        }
        return val
    }

    shift(){
        if(this.length === 0) return undefined
        this.length--
        temp = this.head
        if(this.length === 0) this.tail = undefined
        this.head = temp.next
        return temp
    }
}
