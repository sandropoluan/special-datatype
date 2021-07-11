import PriorityQueue from './PriorityQueue';

export default class WeightedGraph {
  constructor(){
    this.length = 0;
    this.adjacencyList = {};
    this.defaultPrevious = {};
    this.defaultShorterDistance = {};
    this.defaultQueue = new PriorityQueue();
    this.defaultVisited = {};
  }

  addVertex(vertex){
    if(!this.adjacencyList[vertex]) {
      this.length++;
      this.adjacencyList[vertex] = [];
      this.defaultPrevious[vertex] = null;
      this.defaultShorterDistance[vertex] = Infinity;
      this.defaultQueue.enqueue(vertex, Infinity);
      this.defaultVisited[vertex] = false;
    }
  }

  addEdge(vertex1,vertex2, weight){
    const args = Array.from(arguments);
    if(args.length === 3){
      for(let i = 0; i <= 1; i++){
        const [from, to] = i === 0 ? [vertex1, vertex2] : [vertex2, vertex1];
        let vertex = this.adjacencyList[from];
        if(vertex){
          if(!this.adjacencyList[to]) continue;

          if(vertex.length){
            const index = vertex.findIndex(item => item.node === to);
            if(index > -1){
              vertex[index].weight = weight;
            } else {
              vertex.push({node: to, weight})
            }
          } else {
            vertex.push({node: to, weight})
          }
        }
      }
    }
  }

  shorterDistance(start,end){
    if(this.adjacencyList[start] && this.adjacencyList[end]){

      let visitedLength = 0;
      const previous = {...this.defaultPrevious};
      const shorterDistance = {...this.defaultShorterDistance};
      const priorityQueue = this.defaultQueue;
      const visited = {...this.defaultVisited};

      priorityQueue.enqueue(start, 0);
      shorterDistance[start] = 0;
      previous[start] = null;

      while(priorityQueue.data.length){
        const currentNode = priorityQueue.dequeue();
        let distance = currentNode.priority;
        if(visited[currentNode.value]) continue;
        if(currentNode.value === end) break;
        visited[currentNode.value] = true;
        visitedLength++;

        this.adjacencyList[currentNode.value].forEach((neighbor, index) => {
          if(previous[neighbor.node] !== currentNode.value) {

            let total = neighbor.weight + distance;
            if(total < shorterDistance[neighbor.node]){
              shorterDistance[neighbor.node] = total;
              previous[neighbor.node] = currentNode.value;
              priorityQueue.enqueue(neighbor.node,total);
            }
          }

        });
      }
      
      let path = [end];
      while(path[0] !== start){
        path.unshift(previous[path[0]]);
      }

      return [...path,shorterDistance[end]];
    }
  }
}
