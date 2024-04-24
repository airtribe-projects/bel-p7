const express = require('express');
const app = express();
const courseData = require('./courses.json');
const fs = require('fs');
const Validator = require('./helpers/validator');

const PORT = 3000;
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send("Hello world");
});

app.get('/courses', (req, res) => {
    return res.status(200).json(courseData);
})

app.get('/courses/:courseId', (req, res) => {
    try {
        let airtribeCourses = courseData.airtribe;
        let courseIdPassed = req.params.courseId;
        let filteredCourse = airtribeCourses.filter(val => val.courseId == courseIdPassed);
        if(filteredCourse.length == 0) {
            return res.status(404).json("No appropriate course found with the provided course id");
        }
        return res.status(200).json(filteredCourse);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong while processing the request");
    }
});

app.post('/courses/:courseId/avg-ratings', (req, res) => {
    const userProvidedDetails = req.body;
    console.log(userProvidedDetails);
    let courseDataModified = courseData;
    courseDataModified.airtribe.push(userProvidedDetails);
    if (Validator.validateCourseInfo(userProvidedDetails).status == true) { 
        fs.writeFile('./courses.json', JSON.stringify(courseDataModified), {encoding: 'utf8', flag:'w'}, (err, data) => {
            if(err) {
                return res.status(500).send("Something went wrong while creating the course");
            } else {
                return res.status(201).send("Successfully created the course");
            }
        });
    } else {
        let message = Validator.validateCourseInfo(userProvidedDetails).message;
        return res.status(400).send(message);
    }
});

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error occured cant start the server");
    } else {
        console.log("Server started successfully");
    }
})

