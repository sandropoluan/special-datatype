class Node{
  constructor(val){
    this.value = val;
    this.next = null;
  }
}

export default class SinglyLinkedList{
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
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;

    return newNode;
  }

  pop(){
    if(!this.length) return undefined;

    let newTail = this.head;
    let current = newTail;
    while(current.next !== null){
      newTail = current;
      current = current.next;
    }

    newTail.next = null;
    this.tail = newTail;
    this.length--;
    if(!this.length){
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift(){
    if(!this.length) return undefined;
    let temp = this.head;
    this.head = this.head.next;
    this.length--;
    if(!this.length){
      this.tail = null
    }
    return temp;

  }

  unshift(val){
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    if(!this.length){
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  reverse(){
    if(this.length > 1){
      let prev = null;
      let current = this.head;
      let count = 0;
      while(current){
        count++;
        const temp = current.next;
        current.next = prev;
        prev = current;
        if(count === 1 ){
          this.tail = prev;
        }
        current = temp;
      }

      this.head = prev;
    }
    return this;
  }

  get(i){
    let node = this.head;
    if(!node || i < 0 || i > this.length){
      return null
    }

    let count = 0;

    while(count < i){
      node = node.next;
      if(!node){
        break;
      }
      count++;
    }

    return node;
  }

  set(i,value){
    const node = this.get(i);
    if(node){
      node.value = value;
      return this;
    }

    return false;

  }

  insert(i,value){
    const newNode = new Node(value);
    if(i < 0 || i > this.length){
      return false;
    }
    if(!this.length){
      this.head = newNode;
      this.tail = newNode;
    } else if(i === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let next = current.next;
      let count = 1;
      while(count < i){
        current = current.next;
        next = next.next;
        count++;
      }

      newNode.next = next;
      current.next = newNode;
      if(i === count){
        this.tail = newNode;
      }

    }
    this.length++;

    return this;
  }

  remove(i){
    if(i=== undefined || i < 0 || i >= this.length){
      return undefined;
    }

    if(i === this.length - 1){
      return this.pop();
    }

    if(i === 0){
      return this.shift();
    } else {
      const node = this.get(i - 1);
      const deleted = node.next;
      node.next = deleted.next;
      this.length--;

      return deleted;
    }
  }
}
