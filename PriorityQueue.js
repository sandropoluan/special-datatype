class Node {
  constructor(value, priority){
    this.value = value;
    this.priority = priority;
  }
}

export default class PriorityQueue {
  constructor(){
    this.data = [];
  };

  swap(arr, first, second){
    let temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }

  enqueue(value, priority){
    let node = new Node(value, priority);

    this.data.push(node);

    let index = this.data.length - 1;
    let parentIndex = Math.floor((index - 1)/2);

    while(this.data[parentIndex] && (this.data[index].priority < this.data[parentIndex].priority)){

      this.swap(this.data, index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1)/2);

    }

    return this.data;
  }


  dequeue(){

    if(!this.data.length) return this.data;

    this.swap(this.data,0, this.data.length - 1);

    const removed = this.data.pop();

    let parentIndex = 0;
    let leftChildIndex = parentIndex * 2 + 1;
    let rightChildIndex = parentIndex * 2 + 2;

    let parentNode = this.data[parentIndex];
    let leftChildNode = this.data[leftChildIndex];
    let rightChildNode = this.data[rightChildIndex];

    while((leftChildNode && leftChildNode.priority < parentNode.priority) ||
    (rightChildNode && rightChildNode.priority < parentNode.priority)){


      let leftChildDiff = parentNode.priority - ((leftChildNode || {}).priority ?? parentNode.priority);
      let rightChildDiff = parentNode.priority - ((rightChildNode || {}).priority ?? parentNode.priority);

      let index;

      if(leftChildDiff > 0 && rightChildDiff > 0 ){

        let obj = {};
        obj[`${leftChildDiff}`] = leftChildIndex;
        obj[`${rightChildDiff}`] = rightChildIndex;

        index = obj[Math.max(leftChildDiff,rightChildDiff)];



      } else if (leftChildDiff > 0){
        index = leftChildIndex;
      } else {
        index = rightChildIndex
      }


      this.swap(this.data,parentIndex, index);

      parentIndex = index;
      leftChildIndex = parentIndex * 2 + 1;
      rightChildIndex = parentIndex * 2 + 2;

      parentNode = this.data[parentIndex];
      leftChildNode = this.data[leftChildIndex];
      rightChildNode = this.data[rightChildIndex];

    }

    return removed;

  }
}
