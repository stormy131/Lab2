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
        it('should return 3', () => {
            expect(list.length()).toEqual(3);
        });

        it('should return 4', () => {
            list.append('NEW');
            expect(list.length()).toEqual(4);
        });

        it('should return 0', () => {
            list.clear();
            expect(list.length()).toEqual(0);
        });
    });

    describe('.get() testing', () => {
        // List: a -> b -> c

        it('should return "a"', () => {
            expect(list.get(0)).toEqual('a');
        });

        it('should return just added element', () => {
            list.append('NEW');
            expect(list.get(3)).toEqual('NEW');
        });

        it('should throw an error', () => {
            expect(() => list.get(3)).toThrow(new Error('Incorrect index was passed'));
        });
    })

    describe('.append() testing', () => {
        it('length should change to 4', () => {
            list.append('NEW');
            expect(list.length()).toEqual(4);
        });

        it('should change "tail" property', () => {
            list.append('NEW');
            expect(list.tail.value).toEqual('NEW');
        });

        it('last element should be "d"', () => {
            list.append('NEW');
            expect(list.get(list.length() - 1)).toEqual('NEW');
        });
    });

    describe('.insert() testing', () => {
        it('should insert element in correct position', () => {
            list.insert('NEW', 1);
            expect(list.get(1)).toEqual('NEW');
        });

        it('should change "head"/"tail" properties', () => {
            list.insert('NEW', 3);
            list.insert('NEW', 0);
            //List: NEW -> a -> b -> c -> NEW

            expect(list.head.value).toEqual('NEW');
            expect(list.tail.value).toEqual('NEW');
        });

        it('should throw an error', () => {
            expect(() => list.insert('NEW', 25)).toThrow(new Error('Incorrect index was passed'));
        });
    });

    describe('.extend() testing', () => {
        it('should add elements to the end of th list', () => {
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
            secondList.head.value = 'CHANGED VALUE';
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
        it('should return index of the first "b"', () => {
            list.insert('b', 2);
            //List: a -> b -> b -> c

            expect(list.findFirst('b')).toEqual(1);
        });

        it('should return -1', () => {
            expect(list.findFirst('NEW ELEMENT')).toEqual(-1);
        });
    });

    describe('.findLast() testing', () => {
        it('should return index of the last "c"', () => {
            list.insert('c', 3);
            //List: a -> b -> c -> c

            expect(list.findLast('c')).toEqual(3);
        });

        it('should return -1', () => {
            expect(list.findLast('NEW ELEMENT')).toEqual(-1);
        });
    });

    describe('.deleteNode() testing', () => {
        it('should delete node by index', () => {
            //List: a -> b -> c
            list.deleteNode(1);
            expect(list.findFirst('b')).toEqual(-1);
        });

        it('should change "head"/"tail" properties', () => {
            //List: a -> b -> c
            list.deleteNode(0);

            //List: b -> c
            list.deleteNode(1);

            expect(list.head.value).toEqual('b');
            expect(list.tail.value).toEqual('b')
        });

        it('should throw an error', () => {
            expect(() => list.deleteNode(-1)).toThrow(new Error('Incorrect index was passed'));
        });
    });

    describe('.deleteAll() testing', () => {
        it('should delete all nodes with "b" value', () => {
            list.append('b');
            //List: a -> b -> c -> b

            list.deleteAll('b');
            expect(list.length()).toEqual(2);
            expect(list.get(0)).toEqual('a');
            expect(list.get(1)).toEqual('c');
        });

        it('should not change list', () => {
            const spy = jest.spyOn(list, 'deleteNode');
            list.deleteAll('NO NODE WITH THIS VALUE');

            expect(spy).toBeCalledTimes(0);
        });
    });

    describe('.clear() testing', () => {
        it('should delete all data about the list', () => {
            //List[Before]: a -> b -> c
            list.clear();

            expect(list.length()).toEqual(0);
            expect(list.head).toEqual(null);
            expect(list.tail).toEqual(null);
        });
    });

    describe('.reverse() testing', () => {
        it('should reverse the order of nodes', () => {
            //List: a -> b -> c
            list.reverse();

            expect(list.get(0)).toEqual('c');
            expect(list.get(1)).toEqual('b');
            expect(list.get(2)).toEqual('a');
        });

        it('should change "head"/"tail" properties', () => {
            //List: a -> b -> c
            list.reverse();

            expect(list.head.value).toEqual('c');
            expect(list.tail.value).toEqual('a');
        });
    });
});