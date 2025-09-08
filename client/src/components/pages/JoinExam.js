// JoinExam.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

// Material UI imports
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SmallBannerAd from "./SmallBannerAd";

function JoinExam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [timeLeft, setTimeLeft] = useState(null);
  const [players, setPlayers] = useState([]);


    useEffect(() => {
          // Scroll to top when the component is mounted
          window.scrollTo(0, 0);
        }, []);
        
  useEffect(() => {
    let mounted = true;

    const fetchState = async () => {
      try {
        const res = await axios.get("/api/v1/mcqgame/state");
        if (!mounted) return;
        setTimeLeft(res.data.timeLeft);
        setPlayers(res.data.players || []);
        if (res.data.gameStarted) {
          navigate(`/exam/start/${examId}`);
        }
      } catch (err) {
        console.error("State error", err);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [examId, navigate]);

  const handleLeave = async () => {
    const ok = window.confirm(
      "If you leave now you will not be part of the results. Leave?"
    );
    if (!ok) return;
    try {
      await axios.post("/api/v1/mcqgame/leave", { userId: auth?.user?._id });
      navigate("/exams");
    } catch (err) {
      console.error("Leave error", err);
      alert("Could not leave, try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
 <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                      <SmallBannerAd />
                    </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Waiting Room
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <HourglassBottomIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Exam will start in:{" "}
            <strong>{timeLeft !== null ? `${timeLeft} seconds` : "-"}</strong>
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Players ({players.length})
          </Typography>
          <List>
            {players.map((p) => (
              <React.Fragment key={p.userId}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={p.username} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            {players.length === 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
                No players joined yet.
              </Typography>
            )}
          </List>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handleLeave}
          >
            Leave Exam
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default JoinExam;
