// generate-postman-collection.js
const { exec } = require('child_process');

exec(
  'openapi2postmanv2 -s swagger-spec.json -o postman-collection.json',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running openapi2postmanv2: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`openapi2postmanv2 stderr: ${stderr}`);
      return;
    }

    console.log(`openapi2postmanv2 stdout: ${stdout}`);
  },
);
