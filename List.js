class List{
    constructor(){
        this.head = null;
        this.tail = null;
        this.nodeCount = 0;
    }

    length(){
        return this.nodeCount;
    }

    append(value){
        const newNode = {value, next: this.head};

        if(this.nodeCount){
            this.tail.next = newNode;
        } else {
            this.head = newNode;
        }

        this.tail = newNode;
        this.nodeCount++;
    }

    //pretty big function, maybe need to optimize it somehow
    insert(value, index){
        if(index < 0 || index > this.nodeCount){
            throw new Error('Incorrect index was passed in .inssert()')
        }

        if(index === this.nodeCount){
            this.append(value);
            return;
        }

        const newNode = { value };
        let currentNode = this.head;
        let prevNode = this.tail;

        for(let i = 0; i < this.nodeCount; i++){
            if(i === index){
                newNode.next = currentNode;
                prevNode.next = newNode;
                this.nodeCount++;
                break;
            }

            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        if(index === 0) this.head = newNode;
    }

    extend(list){
        let tmp = list.head;
        for(let i = 0; i < list.length(); i++){
            this.append(tmp.value);
            tmp = tmp.next;
        }
    }
}

module.exports = List;