import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import Layout from "../../Layout/Layout";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/v1/quizzes/all");
      setQuizzes(response.data);
    } catch (error) {
      setError("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await axios.delete(`/api/v1/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      alert("Quiz deleted successfully!");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const startEditing = (quiz) => {
    setEditingQuiz(quiz);
    setUpdatedTitle(quiz.title);
  };

  const updateQuiz = async () => {
    try {
      await axios.put(`/api/v1/quizzes/${editingQuiz._id}`, { title: updatedTitle });
      setQuizzes(
        quizzes.map((quiz) =>
          quiz._id === editingQuiz._id ? { ...quiz, title: updatedTitle } : quiz
        )
      );
      setEditingQuiz(null);
      alert("Quiz updated successfully!");
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
    <Container maxWidth="md" sx={{ mt: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Quizzes
      </Typography>
      {quizzes.length === 0 ? (
        <Typography>No quizzes available</Typography>
      ) : (
        quizzes.map((quiz) => (
          <Card key={quiz._id} sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              {editingQuiz && editingQuiz._id === quiz._id ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    required
                  />
                  <IconButton color="success" onClick={updateQuiz}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setEditingQuiz(null)}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Typography variant="h6">{quiz.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {quiz.category}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Questions:
                  </Typography>
                  {quiz.questions.map((q, qIndex) => (
                    <Box key={qIndex} sx={{ mb: 1 }}>
                      <Typography variant="body1">
                        <strong>Q{qIndex + 1}:</strong> {q.questionText}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Options:</strong> {q.options.join(", ")}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        <strong>Correct Answer:</strong> {q.correctAnswer}
                      </Typography>
                    </Box>
                  ))}
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => startEditing(quiz)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteQuiz(quiz._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
    </Layout>
  );
};

export default QuizList;
