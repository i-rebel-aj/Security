process.stdin.resume();
const r= require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

// NEVER call this function it is DANGEROUS
// TODO: remove this dangerous function
function secret() {
    console.log('Shhh super secret');
}

const nameClassMap = {
   akshay: 'CG31',
   deepak: 'CG32',
   ishan: 'CG33',
   niranjan: 'CGRP',
   xyz: 'MC'
};

r.question('Enter aname to get his class: ',  (input)=> {
    console.log(eval('nameClassMap.' + input));
    process.stdin.pause();
});