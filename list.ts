interface NodeI {
    value: string,
    next: NodeI
}

class List{
    head: NodeI;
    tail: NodeI;

    constructor(){
        this.head = null;
        this.tail = null;
    }

    checkIndex(index: number, max: number){
        if(index < 0 || index > max){
            throw new Error('Incorrect index was passed');
        }
    }

    length(): number{
        let tmp: NodeI = this.head;
        let count: number = 0;

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

    append(value: string){
        const newNode: NodeI = {value, next: this.head};

        if(this.length()){
            this.tail.next = newNode;
        } else this.head = newNode;

        this.tail = newNode;
        if(this.length() === 1) this.head.next = this.tail;
    }

    insert(value: string, index: number){
        this.checkIndex(index, this.length());

        if(index === this.length()){
            this.append(value);
            return;
        }

        let newNode: NodeI;
        let currentNode: NodeI = this.head;
        let prevNode: NodeI = this.tail;

        for(let i = 0; i < this.length(); i++){
            if(i === index){
                newNode = {value, next: currentNode};
                prevNode.next = newNode;
                break;
            }

            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        if(index === 0) this.head = newNode;
    }

    extend(list: List){
        let tmp: NodeI = list.head;
        for(let i = 0; i < list.length(); i++){
            this.append(tmp.value);
            tmp = tmp.next;
        }
    }

    get(index: number): string{
        this.checkIndex(index, this.length() - 1);

        let tmp: NodeI = this.head;
        for(let i = 0; i < this.length(); i++){
            if(i === index) return tmp.value;

            tmp = tmp.next;
        }
    }

    clone(): List{
        const copy: List = new List();
        let tmp: NodeI = this.head;

        for(let i = 0; i < this.length(); i++){
            copy.append(tmp.value);
            tmp = tmp.next;
        }

        return copy;
    }

    findFirst(value: string): number{
        let tmp: NodeI = this.head;

        for(let i = 0; i < this.length(); i++) {
            if(tmp.value === value) return i;
            tmp = tmp.next;
        }

        return -1;
    }

    findLast(value: string): number{
        let tmp: NodeI = this.head;
        let result: number = -1;

        for(let i = 0; i < this.length(); i++) {
            if(tmp.value === value) result = i;
            tmp = tmp.next;
        }

        return result;
    }

    deleteNode(index: number): string{
        this.checkIndex(index, this.length() - 1);

        let tmp: NodeI = this.head;
        let prev: NodeI = this.tail;

        for(let i = 0; i < this.length(); i++){
            if(i === index){
                prev.next = tmp.next;
                if(tmp === this.head) this.head = tmp.next;
                if(tmp === this.tail) this.tail = prev;

                return tmp.value;
            }

            prev = tmp;
            tmp = tmp.next;
        }
    }

    deleteAll(value: string){
        let tmp: NodeI = this.head;
        let prev: NodeI = this.tail;
        const startLength: number = this.length();

        for(let i = 0; i < this.length(); i++){
            if(tmp.value === value){
                this.deleteNode(i - (startLength - this.length()));
            }

            prev = tmp;
            tmp = tmp.next;
        }
    }
}

export default List;