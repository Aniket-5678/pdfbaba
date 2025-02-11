import { useState } from "react";
import { Container, TextField, Button, Card, CardContent, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Layout from "../../Layout/Layout";

const CreateQuiz = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuiz = { category, title, questions };

    try {
      const response = await axios.post("/api/v1/quizzes/create", newQuiz, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("Quiz created successfully!");
        setCategory("");
        setTitle("");
        setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create quiz!");
    }
  };

  return (
    <Layout>
       
    <Container maxWidth="md" sx={{ mt: 10}}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Create a New Quiz
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Quiz Title"
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {questions.map((q, qIndex) => (
              <Card key={qIndex} sx={{ my: 2, p: 2, boxShadow: 1 }}>
                <TextField
                  fullWidth
                  label={`Question ${qIndex + 1}`}
                  variant="outlined"
                  margin="normal"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                  required
                />

                {q.options.map((option, oIndex) => (
                  <TextField
                    key={oIndex}
                    fullWidth
                    label={`Option ${oIndex + 1}`}
                    variant="outlined"
                    margin="normal"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    required
                  />
                ))}

                <TextField
                  fullWidth
                  label="Correct Answer"
                  variant="outlined"
                  margin="normal"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                  required
                />

                <IconButton color="error" onClick={() => removeQuestion(qIndex)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={addQuestion}
              sx={{ mt: 2 }}
            >
              Add Question
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3 }}
            >
              Create Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
    </Layout>
  );
};

export default CreateQuiz;
