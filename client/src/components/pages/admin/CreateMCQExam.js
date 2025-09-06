import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Material UI imports
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Divider
} from "@mui/material";
import { Add, Delete, Upload } from "@mui/icons-material";

function CreateMCQExam() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  const [jsonData, setJsonData] = useState("");
  const [examList, setExamList] = useState([]);

  // Fetch all exams to show in list
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get("/api/v1/mcqexam");
      setExamList(res.data.exams);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch exams");
    }
  };

  // Add new empty question
  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  // Remove question
  const removeQuestion = (index) => {
    const newQ = [...questions];
    newQ.splice(index, 1);
    setQuestions(newQ);
  };

  // Parse JSON bulk input
  const handleJsonUpload = () => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        setQuestions(parsed);
        toast.success("Questions loaded from JSON!");
      } else {
        toast.error("Invalid JSON format. Must be an array of questions.");
      }
    } catch (err) {
      toast.error("Invalid JSON!");
      console.error(err);
    }
  };

  // Submit new exam
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/mcqexam", { title, questions });
      toast.success("Exam created successfully!");
      setTitle("");
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
      setJsonData("");
      fetchExams(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Error creating exam");
    }
  };

  // Delete exam
  const handleDeleteExam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await axios.delete(`/api/v1/mcqexam/${id}`);
      toast.success("Exam deleted successfully");
      fetchExams(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete exam");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
        Create MCQ Exam
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Exam Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        {/* Bulk JSON Upload */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bulk Upload (Paste JSON)
            </Typography>
            <TextField
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              placeholder={`Paste JSON here. Example:
[
  {
    "question": "What is 2+2?",
    "options": ["1", "2", "3", "4"],
    "correctAnswer": "4"
  }
]`}
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="secondary" startIcon={<Upload />} onClick={handleJsonUpload}>
              Upload JSON
            </Button>
          </CardContent>
        </Card>

        {/* Questions Section */}
        {questions.map((q, i) => (
          <Card key={i} sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label={`Question ${i + 1}`}
                    fullWidth
                    value={q.question}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i].question = e.target.value;
                      setQuestions(newQ);
                    }}
                    required
                  />
                </Grid>
                {q.options.map((opt, j) => (
                  <Grid item xs={12} sm={6} key={j}>
                    <TextField
                      label={`Option ${j + 1}`}
                      fullWidth
                      value={opt}
                      onChange={(e) => {
                        const newQ = [...questions];
                        newQ[i].options[j] = e.target.value;
                        setQuestions(newQ);
                      }}
                      required
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <TextField
                    label="Correct Answer"
                    fullWidth
                    value={q.correctAnswer}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i].correctAnswer = e.target.value;
                      setQuestions(newQ);
                    }}
                    required
                  />
                </Grid>
              </Grid>

              {questions.length > 1 && (
                <Box textAlign="right" mt={2}>
                  <IconButton color="error" onClick={() => removeQuestion(i)}>
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" startIcon={<Add />} onClick={addQuestion}>
            Add Question
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Create Exam
          </Button>
        </Box>
      </form>

      {/* Divider */}
      <Divider sx={{ my: 5 }} />

      {/* Existing Exams List */}
      <Typography variant="h5" gutterBottom>
        Existing Exams
      </Typography>
      {examList.map((exam) => (
        <Card key={exam._id} sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">{exam.title}</Typography>
            <Button color="error" variant="outlined" onClick={() => handleDeleteExam(exam._id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default CreateMCQExam;
