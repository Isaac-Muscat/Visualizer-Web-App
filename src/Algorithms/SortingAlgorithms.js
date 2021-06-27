export const getBubbleSortAnimations = (array, animations = []) => {
    for(let i = array.length-1; i>0;i--){
        let swapped = false;
        for (let j = 1; j <= i; j++) {
            const animation = {}
            animation.compare = [j-1, j];
            if(i===j){
                animation.sorted = true;
            }
            if(array[j]<array[j-1]){
                let temp = array[j];
                array[j] = array[j-1];
                array[j-1]=temp;
                animation.swap = true;
                swapped = true;
            } else {
                animation.swap = false;
            }

            animations.push(animation);
        }
        if(!swapped){
            const animation = {}
            animation.compare = [0, 0];
            animation.done = true;
            animations.push(animation);
            break;
        }
    }
    return animations;
}

export const bubbleSort = (array) => {
    for(let i = array.length-1; i>0;i--){
        let swapped = false;
        for (let j = 1; j <= i; j++) {
            if(array[j]<array[j-1]){
                let temp = array[j];
                array[j] = array[j-1];
                array[j-1]=temp;
                swapped = true;
            }
        }
        if(!swapped) break;
    }
    return array;
}