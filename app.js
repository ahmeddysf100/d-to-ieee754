const app = Vue.createApp({

    data() {
        return {
            message: '',
            g: '',
            sign: "",
            exponent: '',
            mantissa: '',
            x: [1, 2, 4, 8, 16, 32, 64, 128],
            m: '',
            sign2: "",
            exponent2: '',
            mantissa2: '',
            m2: '',

        }
    },
    methods: {
        convert2() {

            let a = new BigNumber(this.m2);
            if (a < 0) {
                this.sign2 = 1
                a = a * -1
            } else {
                this.sign2 = 0
            }
            const num = Number(a);
            if (Number.isInteger(num)) {

                let binary = num.toString(2)

                binary = new BigNumber(binary)

                let binaryArr = binary.toString().split("").map(Number)
                //console.log(binaryArr)
                let lengthArr = binaryArr.length
                for (let i = 1; i < lengthArr; i++) {
                    binary = binary.dividedBy(10)

                }
              // let binary2 = binary.toNumber()
              //  console.log(binary2)
                let bais = 127 + (lengthArr - 1)
                //console.log(bais)
                this.exponent2 = bais.toString(2)
                let k = binary.modulo(1).toNumber()
                let x = new BigNumber(k)
                let kk = lengthArr - 1
                let y = new BigNumber(kk)
              //  console.log(x + " " + y)

                const num2 = x;
                const numString = num2.toFixed(kk) // Round to 4 decimal places
                const decimalPart = numString.substring(numString.indexOf(".") + 1);
              //  console.log(decimalPart); // Output: "1001"
                this.mantissa2 = decimalPart

            } else {
                let binaryF = num.toString(2)
               // console.log(binaryF)
                let number = binaryF.toString();
                let pointIndex = number.indexOf('.'); // get the index of the decimal point
                let leftSubstring = number.substring(0, pointIndex); // get the substring of digits to the left of the decimal point
                let hasLeftOne = leftSubstring.includes('1'); // check if the substring contains a '1'
              //  console.log(hasLeftOne); // logs 'true' if there is a '1' to the left of the decimal point, otherwise logs 'false'

                if (hasLeftOne == true) {
                    let pointIndex1 = number.indexOf('.'); // get the index of the decimal point
                    let leftSubstring1 = number.substring(0, pointIndex); // get the substring of digits to the left of the decimal point
                    let lastOneIndex = leftSubstring1.indexOf('1'); // get the index of the first '1' in the substring
                 //   console.log(lastOneIndex)
                    pointIndex1=lastOneIndex+1
                    // reassemble the number with the new position of the decimal point
                    let result = number.substring(0, pointIndex1) + '.' + number.substring(pointIndex1).replace('.', '');
                  // console.log(result); 
                   let pointIndexF = result.substring(1,25).replace(".",""); 
                   this.mantissa2=pointIndexF
                  // console.log(pointIndexF)
                   bais1= leftSubstring1.length-1
                  // console.log(bais1)
                   bais1=bais1+127
                   bais1 = bais1.toString(2)
                    if (bais1.length < 8) {
                        bais1 = '0' + bais1.substring(0)
                    }
                    this.exponent2 = bais1
                  // console.log(this.exponent2)

                } else {
                 let numbersize=number.length
                 let pointIndex2=(number.indexOf("."))+1
                 let righttSubstring1 = number.substring(pointIndex2,numbersize); // get the substring of digits to the right of the decimal point
                //console.log(righttSubstring1)
                 let index1=righttSubstring1.indexOf("1")
                 let bais2=-(index1+1)+127
                 //console.log(bais2)
                let bais3=bais2.toString(2)
                if(bais3.length<8){
                    bais3='0'+bais3.substring(0)
                }
                 this.exponent2=bais3
                 result1=righttSubstring1.substring(index1,(index1+1))+"."+righttSubstring1.substring(index1+1).replace(".","")
                 //console.log(result1)
                let index0=result1.indexOf(".")
                result1=result1.substring((index0+1),25)
                if(result1==0){
                    result1="000...."
                }
                //console.log(result1)
                this.mantissa2=result1

                }



            }

        },

        convert() {

            //get -or+ from sign bit
            let si = 0
            if (this.sign == 1) {
                si = -1
            } else {
                si = 1
            }

            //get exponent bais
            let arr1 = []
            for (let j = 0; j <= 8; j++) {

                if (this.exponent.length == j && this.exponent.length != 8) {

                    for (let i = 0; i < (8 - j); i++) {


                        arr1.push(0)

                    }

                }
            }
            let a1 = this.exponent.toString().split("").map(Number)
            let mergedArr1 = a1.concat(arr1)


            let c = 0
            let v = 7
            for (let i = 0; i < 8; i++) {
                if (mergedArr1[i] == 1) {
                    c += this.x[v]
                }
                v--
            }
            // console.log(c)
            c = c - 127

            // convert mantisaa to decimal

            let arr2 = []
            for (let j = 0; j <= 23; j++) {

                if (this.mantissa.length == j && this.mantissa.length != 23) {

                    for (let i = 0; i < (23 - j); i++) {


                        arr2.push(0)

                    }

                }

            }
            let a2 = this.mantissa.toString().split("").map(Number)
            let mergedArr2 = a2.concat(arr2)
            //  console.log(mergedArr2)
            let s = 1,
                ss = 0
            for (let i = 0; i < 23; i++) {
                ss += mergedArr2[i] / (2 ** s)
                s++
            }
            // console.log(ss)
            // final step using the furmela
            this.m = si * (1 + ss) * (2 ** c)
        },





    }
})

app.mount("#app")
