let lobbies = {}; // examId -> { users: [], countdown, started }

export const mcqSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ✅ User joins exam lobby
    socket.on("joinExam", ({ examId, user }) => {
      if (!lobbies[examId]) {
        lobbies[examId] = { users: [], countdown: 30, started: false };
      }

      lobbies[examId].users.push({ socketId: socket.id, user });

      socket.join(examId);

      // Inform lobby
      io.to(examId).emit("lobbyUpdate", lobbies[examId].users);

      // Start countdown if not already started
      if (!lobbies[examId].started && lobbies[examId].users.length === 1) {
        lobbies[examId].started = true;
        let countdown = 30;

        const timer = setInterval(() => {
          countdown--;
          io.to(examId).emit("countdown", countdown);

          if (countdown <= 0) {
            clearInterval(timer);
            io.to(examId).emit("startExam", { examId });
          }
        }, 1000);
      }
    });

    // ✅ User submits answers
    socket.on("submitAnswers", ({ examId, userId, answers }) => {
      // Store user answers in lobby
      const user = lobbies[examId].users.find(u => u.user._id === userId);
      if (user) user.answers = answers;

      // Check if all submitted
      if (lobbies[examId].users.every(u => u.answers)) {
        io.to(examId).emit("examResult", lobbies[examId].users);
      }
    });

    // ✅ On disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (let examId in lobbies) {
        lobbies[examId].users = lobbies[examId].users.filter(u => u.socketId !== socket.id);
      }
    });
  });
};
