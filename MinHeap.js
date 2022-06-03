export default class MinHeap {
  constructor(){
    this.data = [];
  };

  swap(arr, first, second){
    let temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }

  insert(value){

    this.data.push(value);

    let index = this.data.length - 1;
    let parentIndex = Math.floor((index - 1)/2);

    while(this.data[index] < this.data[parentIndex]){

      this.swap(this.data, index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1)/2);

    }

    return this.data;
  }


  extract(){

    if(!this.data.length) return this.data;

    this.swap(this.data,0, this.data.length - 1);

    const removed = this.data.pop();

    let parentIndex = 0;
    let leftChildIndex = parentIndex * 2 + 1;
    let rightChildIndex = parentIndex * 2 + 2;

    let parent = this.data[parentIndex];
    let leftChild = this.data[leftChildIndex];
    let rightChild = this.data[rightChildIndex];

    while(leftChild < parent || rightChild < parent) {


      let leftChildDiff = parent - (leftChild ?? parent);
      let rightChildDiff = parent - (rightChild  ?? parent);

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

      parent = this.data[parentIndex];
      leftChild = this.data[leftChildIndex];
      rightChild = this.data[rightChildIndex];

    }

    return removed;

  }
}
