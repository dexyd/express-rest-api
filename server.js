import express from "express";

const app = express();

const port = process.env.PORT || 3000;

let tempArr = [];
let i = 1;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send(tempArr);
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = tempArr.filter(el => el.id == id);
    res.send(result);
});

app.post("/create", (req, res) => {
    const { name, age, gender } = req.body;
    const data = {
        name,
        age,
        gender,
        id: i,
    };
    tempArr.push(data);
    i++;

    res.status(201).send(data);
});

app.put("/update", (req, res) => {
    const id = req.query.id;
    const newData = req.body;
    const index = tempArr.findIndex(obj => obj.id == id);

    if (index !== -1) {
        tempArr[index] = {...tempArr[index], ...newData};
        res.status(200).send({ message: "Entry updated successfully!", data: tempArr[index]});
    } else {
        res.status(404).send({ message: "Data not found!" });
    }
});

app.delete("/delete", (req, res) => {
    const id = parseInt(req.query.id);
    const index = tempArr.findIndex(el => el.id === id);

    if (index !== -1) {
        tempArr.splice(index, 1);
        res.status(200).send({ message: "Entry deleted successfully!" });
    } else {
        res.status(404).send({ message: "No entry found!" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});