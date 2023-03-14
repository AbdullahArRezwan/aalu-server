const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { MongoClient, ServerApiVersion } = require('mongodb');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
});


const uri = "mongodb+srv://lumuna:lumuna123@cluster0.tptggel.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('database connected successfully!!!')
});

const newsCollection = client.db('lumuna').collection('news');
const eventCollection = client.db('lumuna').collection('events');
const jobCollection = client.db('lumuna').collection('jobs');
const directoryCollection = client.db('lumuna').collection('directory');
const donationCollection = client.db('lumuna').collection('donation');
const galleryCollection = client.db('lumuna').collection('gallery');
const adminCollection = client.db('lumuna').collection('admin');
const userCollection = client.db('lumuna').collection('users');
const magazineCollection = client.db('lumuna').collection('magazine');

//posting the news
app.post('/addNews', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    newsCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the magazine
app.post('/addMagazine', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    magazineCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the admin
app.post('/addAdmin', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    adminCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the events
app.post('/addEvent', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    eventCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the job
app.post('/addJob', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    jobCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the directory
app.post('/addDirectory', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    directoryCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the donation
app.post('/donate', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    donationCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//posting the photo
app.post('/addPhoto', (req, res) => {
    const entry = req.body;
    // console.log(entry);
    galleryCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//post the users
app.post('/users', (req, res) => {
    const entry = req.body;
    console.log(entry);
    userCollection.insertOne(entry)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

//getting the admin
app.get("/admin", (req, res) => {
    adminCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//getting the news
app.get("/allNews", (req, res) => {
    newsCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//getting the events
app.get("/allEvents", (req, res) => {
    eventCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//getting the jobs
app.get("/allJobs", (req, res) => {
    jobCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//getting the directories 
app.get("/allDirectories", (req, res) => {
    directoryCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//getting the donations
app.get("/allEvents", (req, res) => {
    donationCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//getting the photos
app.get("/allPhotos", (req, res) => {
    galleryCollection.find({}).toArray((err, documents) => {
        res.send(documents);
    });
});

//getting the users
app.get("/allUsers", (req, res) => {
    userCollection.find({}).toArray((err, documents) => {
        res.send(documents);
    });
});

//getting the magazines
app.get("/allMagazines", (req, res) => {
    magazineCollection.find({}).toArray((err, documents) => {
        res.send(documents);
        // console.log(err);
    });
});

//get individual news 
app.get('/news/:newsId', (req, res) => {
    newsCollection.find({ _id: ObjectId(req.params.newsId) })
        .toArray((err, data) => {
            res.send(data[0]);
        })
})

//get individual magazine 
app.get('/magazine/:magazineId', (req, res) => {
    magazineCollection.find({ _id: ObjectId(req.params.magazineId) })
        .toArray((err, data) => {
            res.send(data[0]);
        })
})

//get individual job 
app.get('/job/:jobId', (req, res) => {
    jobCollection.find({ _id: ObjectId(req.params.jobId) })
        .toArray((err, data) => {
            res.send(data[0]);
        })
})

// delete specific  news from database
app.delete("/deleteNews/:id", (req, res) => {
    newsCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            // console.log(result.deletedCount)
            res.send(result.deletedCount > 0);

        })
})

// delete specific event from database
app.delete("/deleteEvent/:id", (req, res) => {
    eventCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            // console.log(result.deletedCount)
            res.send(result.deletedCount > 0);

        })
})

// delete specific job from database
app.delete("/deleteJob/:id", (req, res) => {
    jobCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            // console.log(result.deletedCount)
            res.send(result.deletedCount > 0);

        })
})

// delete specific directory from database
app.delete("/deleteDirectory/:id", (req, res) => {
    directoryCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            // console.log(result.deletedCount)
            res.send(result.deletedCount > 0);

        })
})

// delete specific image from database
app.delete("/deletePhoto/:id", (req, res) => {
    galleryCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            // console.log(result.deletedCount)
            res.send(result.deletedCount > 0);

        })
})

// delete specific magazine from database
app.delete("/deleteMagazine/:id", (req, res) => {
    magazineCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            // console.log(result.deletedCount)
            res.send(result.deletedCount > 0);

        })
})

app.listen(port, () => console.log(`server running on port ${port}`))