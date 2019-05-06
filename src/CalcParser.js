let str = '5*6*2/2/2-2/2';
let expArr = str.split(/(\+|-|\*|\/)/);

function evalExp(arr) {

  console.log('start' + arr)
  if(arr.length === 1){
    return arr.pop();
  }
  if (arr.includes('*') || arr.includes('/')){
    console.log('we have an op');
    for (let i = 0; i < arr.length; i++){
      if(arr[i] === '*'){
        console.log(arr);
        console.log(arr.slice(0, i));
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]*arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
      else if (arr[i] === '/'){
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]/arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
    }
  }
  else if (arr.includes('+') || arr.includes('-')){
    for (let i = 0; i < arr.length; i++){
      if(arr[i] === '+'){
        console.log(arr);
        console.log(arr.slice(0, i));
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]+arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
      else if (arr[i] === '-'){
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]-arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
    }

  }


}

console.log("final result" + evalExp(expArr));
