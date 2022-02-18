class List{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    checkIndex(index, max){
        if(index < 0 || index > max){
            throw new Error('Incorrect index was passed');
        }
    }

    length(){
        let tmp = this.head;
        let count = 0;

        while(true){
            if(tmp === null || tmp === this.tail){
                count += (tmp === null ? 0 : 1);
                break;
            }

            count++;
            tmp = tmp.next;
        }

        return count;
    }

    append(value){
        const newNode = {value, next: this.head};

        if(this.length()){
            this.tail.next = newNode;
        } else this.head = newNode;

        this.tail = newNode;
        if(this.length() === 1) this.head.next = this.tail;
    }

    //pretty big function, maybe need to optimize it somehow
    insert(value, index){
        this.checkIndex(index, this.length());

        if(index === this.length()){
            this.append(value);
            return;
        }

        const newNode = { value };
        let currentNode = this.head;
        let prevNode = this.tail;

        for(let i = 0; i < this.length(); i++){
            if(i === index){
                newNode.next = currentNode;
                prevNode.next = newNode;
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
        this.checkIndex(index, this.length() - 1);

        let tmp = this.head;
        for(let i = 0; i < this.length(); i++){
            if(i === index) return tmp.value;

            tmp = tmp.next;
        }
    }

    clone(){
        const copy = new List();
        let tmp = this.head;

        for(let i = 0; i < this.length(); i++){
            copy.append(tmp.value);
            tmp = tmp.next;
        }

        return copy;
    }

    findFirst(value){
        let tmp = this.head;

        for(let i = 0; i < this.length(); i++) {
            if(tmp.value === value) return i;
            tmp = tmp.next;
        }

        return -1;
    }

    findLast(value){
        let tmp = this.head;
        let result = -1;

        for(let i = 0; i < this.length(); i++) {
            if(tmp.value === value) result = i;
            tmp = tmp.next;
        }

        return result;
    }

    deleteNode(index){
        this.checkIndex(index, this.length() - 1);

        let tmp = this.head;
        let prev = this.tail;

        for(let i = 0; i < this.length(); i++){
            if(i === index){
                prev.next = tmp.next;
                if(i === 0) this.head = tmp.next;
                if(i === this.length() - 1) this.tail = prev;

                return tmp.value;
            }

            prev = tmp;
            tmp = tmp.next;
        }
    }

    deleteAll(value){
        let tmp = this.head;
        let prev = this.tail;

        for(let i = 0; i < this.length(); i++){
            if(tmp.value === value){
                this.deleteNode(i);
            }

            prev = tmp;
            tmp = tmp.next;
        }
    }
}

module.exports = List;