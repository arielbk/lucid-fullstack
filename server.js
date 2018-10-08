const express = require('express');
const app = express();

app.use('/api', (req,res) => {
  const apiTest = [
    { "test": "basically just checking" },
    { "out": "whether the express server is connecting" }
  ];

  res.json(apiTest);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));