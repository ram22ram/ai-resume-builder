// src/components/ATSChecker.jsx

import React, { useState } from 'react';

import { 

  Box, Container, Typography, TextField, Button, Paper, Grid, 

  CircularProgress, Chip, Stack, Alert, Divider 

} from '@mui/material';

import { UploadCloud, ArrowLeft, AlertTriangle, Search, FileText, Zap } from 'lucide-react';

import { extractTextFromPDF } from '../utils/pdfUtils'; 

import { Helmet } from 'react-helmet-async';



// 👇 YOUR NGROK URL (Paste NEW URL here everytime you restart Ngrok)

const LOCAL_NGROK_URL = "https://yuri-nonmagnetized-procrastinatively.ngrok-free.dev/api/generate";



const cleanAIResponse = (text) => {

  if (!text) return null;

  text = text.replace(/```json/g, '').replace(/```/g, '').trim();

  try {

    const startIndex = text.indexOf('{');

    const endIndex = text.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {

      return JSON.parse(text.substring(startIndex, endIndex + 1));

    }

    return JSON.parse(text);

  } catch (err) {

    return null;

  }

};



const ATSChecker = ({ onBack }) => {

  const [resumeText, setResumeText] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [fileName, setFileName] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");



  const handleFileChange = async (e) => {

    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {

      setFileName(file.name);

      try {

        const text = await extractTextFromPDF(file);

        setResumeText(text);

        setError("");

      } catch (err) {

        setError("Error reading PDF.");

      }

    } else {

      setError("Please upload PDF only");

    }

  };



  const handleCheck = async () => {

    if (!resumeText || !jobDescription) {

      setError("Please upload Resume and add Job Description");

      return;

    }

    setLoading(true);

    setResult(null);

    setError("");



    try {

      const prompt = `

        You are an ATS scanner. Compare RESUME with JOB DESCRIPTION.

        RESUME: ${resumeText.substring(0, 10000)}

        JD: ${jobDescription.substring(0, 5000)}

        Output valid JSON only:

        { "score": number, "match_status": string, "summary": string, "missing_keywords": [], "formatting_issues": [] }

      `;



      console.log("Sending request DIRECTLY to Laptop...");



      // 👇 DIRECT CALL TO NGROK (No Netlify Proxy)

      const response = await fetch(LOCAL_NGROK_URL, {

        method: "POST",

        headers: { 

          "Content-Type": "application/json",

          "ngrok-skip-browser-warning": "true" // 👈 Bypass Ngrok Warning Page

        },

        body: JSON.stringify({

          model: "llama3",

          prompt: prompt,

          stream: false,

          format: "json"

        })

      });



      if (!response.ok) {

        throw new Error(`Laptop Error: ${response.status}`);

      }



      const data = await response.json();

      

      if (!data.response) throw new Error("Invalid response from Laptop");



      const parsedResult = cleanAIResponse(data.response);

      if (!parsedResult) throw new Error("Failed to parse AI response.");



      setResult({

        score: parsedResult.score || 0,

        match_status: parsedResult.match_status || "Low",

        summary: parsedResult.summary || "Done.",

        missing_keywords: parsedResult.missing_keywords || [],

        formatting_issues: parsedResult.formatting_issues || []

      });



    } catch (err) {

      console.error(err);

      setError("Analysis Failed: " + err.message);

    } finally {

      setLoading(false);

    }

  };



  return (

    <>

      <Helmet><title>ATS Resume Checker</title></Helmet>

      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>

        {/* HEADER */}

        <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'white', borderBottom: '1px solid #eee' }}>

          <Container maxWidth="xl">

             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

               <Typography variant="h5" fontWeight="bold">Resume<span style={{color:'#7c3aed'}}>AI</span></Typography>

               <Button onClick={onBack}>Back to Home</Button>

             </Box>

          </Container>

        </Box>



        {/* CONTENT */}

        <Box sx={{ flexGrow: 1, py: 6 }}>

          <Container maxWidth="xl">

            <Grid container spacing={4} sx={{ maxWidth: 1100, mx: 'auto' }}>

              <Grid item xs={12} md={6}>

                <Paper sx={{ p: 4, borderRadius: '16px' }}>

                  <Typography fontWeight="bold" mb={2}>1. Upload Resume</Typography>

                  <input type="file" accept="application/pdf" onChange={handleFileChange} />

                  <Typography fontWeight="bold" mt={4} mb={2}>2. Job Description</Typography>

                  <TextField multiline rows={8} fullWidth placeholder="Paste JD..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />

                  {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                  <Button fullWidth variant="contained" size="large" onClick={handleCheck} disabled={loading} sx={{ mt: 4, bgcolor: '#7c3aed' }}>

                    {loading ? "Processing on Laptop..." : "Check Score"}

                  </Button>

                </Paper>

              </Grid>

              <Grid item xs={12} md={6}>

                <Paper sx={{ p: 4, borderRadius: '16px', minHeight: 500 }}>

                  {result ? (

                    <Box>

                      <Typography variant="h3" align="center" fontWeight="bold">{result.score}</Typography>

                      <Typography align="center" color="text.secondary">SCORE</Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography>{result.summary}</Typography>

                      {/* Keywords & Issues rendering here... */}

                    </Box>

                  ) : (

                    <Box textAlign="center" py={10} color="gray">Ready to Analyze</Box>

                  )}

                </Paper>

              </Grid>

            </Grid>

          </Container>

        </Box>

      </Box>

    </>

  );

};



export default ATSChecker;