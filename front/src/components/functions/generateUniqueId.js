
// let globalCounter = 0;

// const generateUniqueId = () => {
//   globalCounter += 1;
//   return globalCounter;
// };


const { v4: uuidv4 } = require('uuid');

const generateUniqueId = () => {
    return uuidv4();
};

export default generateUniqueId;