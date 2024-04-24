class Validator {
    static validateCourseInfo(courseInfo) {
        if (courseInfo.hasOwnProperty("course") && courseInfo.hasOwnProperty("courseId") 
        && courseInfo.hasOwnProperty("cohort")) {
            return {
                "status": true,
                "message": "Validated successfully"
            };
        } else {
            return {
                "status": false,
                "message": "Course info is malformed, please provide all the parameters"
            }
        }
    }
}

module.exports = Validator;