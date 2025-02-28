import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import "../style/style.css";
import { ClipLoader } from "react-spinners";

const QuestionpaperDetails = () => {
  const { id } = useParams();
  const [questionPaper, setQuestionPaper] = useState(null);
  const [loading, setLoading] = useState(true);
   const [downloading, setDownloading] = useState({});

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const { data } = await axios.get(`/api/v1/questionpaper/question/${id}`);
        if (data.success) {
          setQuestionPaper(data.data);
        } else {
          toast.error("Failed to fetch question paper");
        }
      } catch (error) {
        toast.error("Error fetching question paper");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchQuestionPaper();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  // Function to handle PDF download
  const handleDownload = async (url, filename) => {
    try {
      const secureUrl = url.replace("http://", "https://"); 
      setDownloading(prev => ({ ...prev, [filename]: true })); // Set downloading state
      const response = await fetch(secureUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setDownloading(prev => ({ ...prev, [filename]: false })); // Reset downloading state
    }
  };

  return (
    <Layout>
      <div className="question-paper-details">
        <h1>{questionPaper.name}</h1>
        <p>{questionPaper.description}</p>
        <h3>PDFs:</h3>
        <ul>
          {questionPaper.pdfs.map((pdf, index) => {
            const filename = pdf.split("/").pop();
            return (
              <li key={index} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => handleDownload(pdf, filename)}
                  disabled={downloading[filename]}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "5px",
                    fontSize: "14px",
                    cursor: downloading[filename] ? 'not-allowed' : 'pointer',
                    transition: "0.3s",
                  }}
                >
                  {downloading[filename] ? (
    <span style={{ color: '#FFD700', fontWeight: 'bold' }}>Downloading...</span> // Golden Color
  ) : (
    `📥 Download${filename} `
  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default QuestionpaperDetails;
