export const required = value => (value? undefined: 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const lengthVal = value => (value.trim().length === 5? undefined: 'Tracking number must be 5 digits long')


export const numVal =value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

// export const numVal = (value) => {
//     let arr= []
//     for(let i = 0; i < value.length; i++){
    
//     }
//     return undefined
// }