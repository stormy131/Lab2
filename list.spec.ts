import List from './list';

describe('List class testing', () => {
    const list: List = new List();

    beforeEach(() => {
        list.clear();
        list.append('a');
        list.append('b');
        list.append('c');
    });

    describe('.length() testing', () => {
        it('should return starting length of the list (3)', () => {
            expect(list.length()).toEqual(3);
        });

        it('should return starting length + 1 (4)', () => {
            list.append('NEW');
            expect(list.length()).toEqual(4);
        });

        it('should return length of an empty list (0)', () => {
            list.clear();
            expect(list.length()).toEqual(0);
        });
    });

    describe('.get() testing', () => {
        // List: a -> b -> c

        it('should return element at passed index ("a")', () => {
            expect(list.get(0)).toEqual('a');
        });

        it('should throw an error', () => {
            const incorrectIndex: number = list.length();
            expect(() => list.get(incorrectIndex)).toThrow(new Error('Incorrect index was passed'));
        });
    })

    describe('.append() testing', () => {
        it('should increase number of elements', () => {
            const prevLength: number = list.length();

            list.append('NEW');
            expect(list.length()).toBeGreaterThan(prevLength)
        });

        it('should change "tail" property', () => {
            const newValue: string = 'NEW';

            list.append(newValue);
            expect(list._tail).toEqual(newValue);
        });

        it('should add element to the end of the list', () => {
            const newValue: string = 'NEW';

            list.append(newValue);
            expect(list.get(list.length() - 1)).toEqual(newValue);
        });
    });

    describe('.insert() testing', () => {
        it('should insert element in correct position', () => {
            const index: number = 1;
            const newValue: string = 'NEW';

            list.insert(newValue, index);
            expect(list.get(index)).toEqual(newValue);
        });

        it('should change "head"/"tail" properties', () => {
            const newValue: string = 'NEW';
            const headIndex: number = 0;
            const tailIndex: number = list.length();

            list.insert(newValue, tailIndex);
            list.insert(newValue, headIndex);
            //List[After]: NEW -> a -> b -> c -> NEW

            expect(list._head).toEqual(newValue);
            expect(list._tail).toEqual(newValue);
        });

        it('should throw an error', () => {
            expect(() => list.insert('NEW', list.length() + 1))
                .toThrow(new Error('Incorrect index was passed'));
        });
    });

    describe('.extend() testing', () => {
        it('should add new elements to the end of the list', () => {
            const secondList: List = new List();
            secondList.append('NEW');
            secondList.append('NEW2');

            list.extend(secondList);
            expect(list.get(list.length() - 2)).toEqual('NEW');
            expect(list.get(list.length() - 1)).toEqual('NEW2');
        });

        it('should not change original list, while changing "secondList"', () => {
            const secondList: List = new List();
            secondList.append('NEW');

            list.extend(secondList);
            secondList.append('ONLY IN LIST#2');
            expect(list.get(list.length() - 1)).toEqual('NEW');
        });
    });

    describe('.clone() testing', () => {
        it('should copy all elements', () => {
            const copy: List = list.clone();

            expect(copy.get(0)).toEqual(list.get(0));
            expect(copy.get(1)).toEqual(list.get(1));
            expect(copy.get(2)).toEqual(list.get(2));
            expect(copy.length()).toEqual(list.length());
        });
    });

    describe('.findFirst() testing', () => {
        it('should return index of the first element with passed value', () => {
            list.insert('b', 2);
            //List[After]: a -> b -> b -> c

            expect(list.findFirst('b')).toEqual(1);
        });

        it('should return -1, if no elements were found', () => {
            expect(list.findFirst('NEW ELEMENT')).toEqual(-1);
        });
    });

    describe('.findLast() testing', () => {
        it('should return index of the last element with passed value', () => {
            list.insert('c', 3);
            //List[After]: a -> b -> c -> c

            expect(list.findLast('c')).toEqual(3);
        });

        it('should return -1, if no elements were found', () => {
            expect(list.findLast('NEW ELEMENT')).toEqual(-1);
        });
    });

    describe('.deleteNode() testing', () => {
        it('should delete node by passed index', () => {
            const index: number = 1;
            const value: string = list.get(index);

            list.deleteNode(index);
            expect(list.findFirst(value)).toEqual(-1);
        });

        it('should change "head"/"tail" properties', () => {
            //List[Before]: a -> b -> c
            list.deleteNode(0);

            //List[Before]: b -> c
            list.deleteNode(1);

            expect(list._head).toEqual('b');
            expect(list._tail).toEqual('b')
        });

        it('should throw an error', () => {
            expect(() => list.deleteNode(-1)).toThrow(new Error('Incorrect index was passed'));
        });
    });

    describe('.deleteAll() testing', () => {
        it('should delete all nodes with passed value', () => {
            list.append('b');
            //List: a -> b -> c -> b

            list.deleteAll('b');
            expect(list.length()).toEqual(2);
            expect(list.get(0)).toEqual('a');
            expect(list.get(1)).toEqual('c');
        });

        it('should not change list, if there are no nodes with passed value', () => {
            const spy = jest.spyOn(list, 'deleteNode');
            list.deleteAll('NO NODE WITH THIS VALUE');

            // "deleteAll" uses "deleteNode" to delete every element from list
            expect(spy).toBeCalledTimes(0);
        });
    });

    describe('.clear() testing', () => {
        it('should delete all data about the list', () => {
            //List[Before]: a -> b -> c
            list.clear();

            expect(list.length()).toEqual(0);
            expect(list._head).toEqual(null);
            expect(list._tail).toEqual(null);
        });
    });

    describe('.reverse() testing', () => {
        it('should reverse the order of nodes', () => {
            //List[Before]: a -> b -> c
            list.reverse();

            expect(list.get(0)).toEqual('c');
            expect(list.get(1)).toEqual('b');
            expect(list.get(2)).toEqual('a');
        });

        it('should change "head"/"tail" properties', () => {
            const prevHead: string = list.get(0);
            const prevTail: string = list.get(list.length() - 1);

            list.reverse();
            expect(list._head).toEqual(prevTail);
            expect(list._tail).toEqual(prevHead);
        });
    });
});