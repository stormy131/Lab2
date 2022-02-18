class List{
    constructor(){
        this.head = null;
        this.tail = null;
        this.nodeCount = 0;
    }

    checkIndex(index, max){
        if(index < 0 || index > max){
            throw new Error('Incorrect index was passed');
        }
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
        this.checkIndex(index, this.nodeCount);

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

    get(index) {
        this.checkIndex(index, this.nodeCount - 1);

        let tmp = this.head;
        for(let i = 0; i < this.nodeCount; i++){
            if(i === index) return tmp.value;

            tmp = tmp.next;
        }
    }

    clone(){
        const copy = new List();
        let tmp = this.head;

        for(let i = 0; i < this.nodeCount; i++){
            copy.append(tmp.value);
            tmp = tmp.next;
        }

        return copy;
    }

    findFirst(value){
        let tmp = this.head;

        for(let i = 0; i < this.nodeCount; i++) {
            if(tmp.value === value) return i;
            tmp = tmp.next;
        }

        return -1;
    }

    findLast(value){
        let tmp = this.head;
        let result = -1;

        for(let i = 0; i < this.nodeCount; i++) {
            if(tmp.value === value) result = i;
            tmp = tmp.next;
        }

        return result;
    }
}

module.exports = List;