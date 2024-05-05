
//Insert a new data to the database
exports.addNewDataToDatabase = (data, database) => {
	database.insert({
		question: data.question,
            optionA: data.optionA,
            optionB: data.optionB,
            optionC: data.optionC,
            optionD: data.optionD,
            correctAnswer: data.correctAnswer,
            alreadyAnswered: false,
            explanation: data.explanation
	});
}