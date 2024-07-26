const config = require(`./${process.env.REACT_APP_ENVIRONMENT}`).default;

console.log(
  `Running in ${process.env.REACT_APP_ENVIRONMENT} environment`,
  process.env
);
export default config;
