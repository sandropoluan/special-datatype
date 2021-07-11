export default class MaxHeap {
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

    while(this.data[index] > this.data[parentIndex]){
      this.swap(this.data, index, parentIndex);

      index = parentIndex;
      parentIndex = Math.floor((index - 1)/2);
    }

    return this.data;
  }

  extract(){

    if(!this.data.length) return undefined;
    this.swap(this.data, 0, this.data.length - 1);

    let removed = this.data.pop();

    let parentIndex = 0;
    let leftChildIndex = parentIndex * 2 + 1;
    let rightChildIndex = parentIndex * 2 + 2;

    while( this.data[parentIndex] < this.data[leftChildIndex] ||
    this.data[parentIndex] < this.data[rightChildIndex] ) {

      let leftDiff = this.data[leftChildIndex] - this.data[parentIndex];
      let rightDiff = this.data[rightChildIndex] - this.data[parentIndex];


      let index;

      if(leftDiff > 0 && rightDiff > 0){

        let obj = {};
        obj[`${leftDiff}`] = leftChildIndex;
        obj[`${rightDiff}`] = rightChildIndex;

        index = obj[Math.max(leftDiff,rightDiff)];

      } else if(leftDiff > 0) {

        index = leftChildIndex

      } else {

        index = rightChildIndex;

      }

      this.swap(this.data,parentIndex, index);

      parentIndex = index;
      leftChildIndex = parentIndex * 2 + 1;
      rightChildIndex = parentIndex * 2 + 2;

    }


    return removed;

  }
}
