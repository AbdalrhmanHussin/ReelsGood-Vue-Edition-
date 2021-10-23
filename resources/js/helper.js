export default { 
    capFirstLetter(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },

    getFirstLetters(val)
    {
        let short = '';
        val = val.split(' ');
        val.forEach(element => {
            short += element.charAt(0).toUpperCase();
        });
        return short;
    },

    getRandColor()
    {
        let colors = [];
        for(var i = 0; i < 3; i++)
        {
            let rand = Math.floor(Math.random() * 255);
            colors.push(rand);
        }
        let color = `${colors[0],colors[1],colors[2],0}`
        return `rgba(${colors[0]+','+colors[1]+','+colors[2]+','+'0.6'})`
    },

    chunk(arr,chunk)
    {
        let index = 0;
        let arrBack = [];

        console.log(typeof arr,typeof chunk)
        if(typeof arr == 'object')
        {
            console.log('here');
            let arrRefind;
            for (const key in arr) {
                arrRefind.push(arr[key]);
            }
        }
        
        if(typeof chunk == 'number')
        {

            if(typeof arr == 'array')
            {
                let chunkFun = () => {
                    let spliced = arr.splice(index,chunk);
                    console.log(spliced);
                    arrBack.push(spliced);
                    return arrBack;
                    if(arr.length !== 0)
                    {
                        chunkFun();
                    } else {
                        console.log(arrBack);
                        return arrBack;
                    }
        
                }  
                chunkFun() 
            } 

        } else throw 'Chunked value must be a number'
    }
};