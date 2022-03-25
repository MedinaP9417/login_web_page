const express = require('express');
const app = express()

const PORT = process.env.PORT || 4000;

const userRoute = require("./routes/userRoute");
app.use('/api/users/', userRoute)

app.get('/', (req, res) => {
res.send('Hello!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})