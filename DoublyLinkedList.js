class Node {
  constructor(val){
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

export default class DoublyLinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val){
    const newNode = new Node(val);

    if(!this.length){
      this.head = newNode;
      this.tail = newNode;
    } else {
      let tempTail = this.tail
      tempTail.next = newNode;
      newNode.prev = tempTail;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  pop(){
    if(!this.length) return undefined;
    let removed = this.tail;

    if(this.length === 1) {
      this.head = null;
      this.footer = null;
    } else {
      this.tail = removed.prev;
      this.tail.next = null;
    }

    this.length--;
    removed.prev = null;
    return removed;

  }

  shift(){
    if(!this.length) return undefined;
    const removed = this.head;
    if(this.length === 1){
      this.head = null;
      this.tail = null;
    } else {
      this.head = removed.next;
      this.head.prev = null;
    }

    this.length--;
    removed.next = null;
    return removed;

  }

  unshift(val){
    const newNode = new Node(val);

    if(!this.length){
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return newNode;
  }

  get(i){

    if(!this.length) return null;
    if(!(i >= 0) || i >= this.length) return null;
    if(i === 0) return this.head;
    if(i === this.length - 1) return this.tail;


    const mid = this.length/2;

    if(i <= mid){
      //travel from head
      let node = this.head;
      let count = 0;

      while(count < i){
        node = node.next;
        count++;
      }

      return node;

    } else {
      //travel from tail
      let node = this.tail;
      let count = this.length - 1;
      while(count > i){
        node = node.prev;
        count--;
      }
      return node;
    }
  }

  set(i,val) {
    const findNode = this.get(i);
    if(findNode){
      findNode.val = val;
      return true;
    } else {
      return false;
    }
  }

  insert(i,val){

    if(i === this.length) {
      this.push(val);
      return true;
    }

    if(i === 0) {
      this.unshift(val);
      return true;
    }

    let selectedNode = this.get(i);
    if(!selectedNode) return false;

    const newNode = new Node(val);

    const tempPrev = selectedNode.prev;
    selectedNode.prev = newNode;
    tempPrev.next = newNode;

    newNode.prev = tempPrev;
    newNode.next = selectedNode;

    this.length++;
    return true

  }


  remove(i) {

    if(!this.length || !(i >= 0) || i >= this.length ) return null;

    if(i === 0){
      return this.shift();
    }

    if(i === this.length - 1){
      return this.pop();
    }

    const node = this.get(i);
    const beforeNode = node.prev;
    const afterNode = node.next;
    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    this.length--;

    return node;
  }

  reverse(){
    if(this.length <= 1) return this;

    let node = this.head;
    this.tail = this.head;
    while(node){
      if(!node.next){
        this.head = node;
      }
      const temp = node.next;
      node.next = node.prev;
      node.prev = temp;
      if(!temp) break;
      node = temp;
    }
    console.log(node);
    return this;

  }

}
