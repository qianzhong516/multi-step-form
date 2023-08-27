const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
