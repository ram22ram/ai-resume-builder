import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { getTemplateComponent } from '../templates/TemplateRegistry';
import { ResumeData } from '../types/resume';

interface Props {
  templateId: string;
  scale?: number;
}

// A4 Dimensions (Standard)
const A4_WIDTH = 595; // px (at 72 DPI approx)
const A4_HEIGHT = 842;

const DUMMY_DATA: ResumeData = {
    id: "dummy_preview",
    templateId: "simple_clean",
    isPremium: false,
    metadata: {
        fontFamily: "Roboto",
        accentColor: "#000000",
        lineHeight: 1.5,
        jobTitle: "Software Engineer"
    },
    sections: [
        {
            id: "personal",
            type: "personal",
            title: "Personal Info",
            isVisible: true,
            items: [{
                id: "p1",
                firstName: "Rahul",
                lastName: "Sharma",
                fullName: "Rahul Sharma",
                email: "rahul@example.com",
                phone: "+91 98765 43210",
                city: "Bangalore",
                country: "India",
                jobTitle: "Software Engineer",
                // summary is not in PersonalItem, separate section
            }]
        },
        {
            id: "summary",
            type: "summary",
            title: "Professional Summary",
            isVisible: true,
            items: [{
                id: "s1",
                description: "Passionate developer with 3+ years of experience in building scalable web apps using React and Node.js. Focused on performance and clean code."
            }]
        },
        {
            id: "experience",
            type: "experience",
            title: "Experience",
            isVisible: true,
            items: [
                { 
                    id: "exp1",
                    position: "Senior Developer", 
                    company: "TechCorp", 
                    date: "2023 - Present",
                    description: ["Led frontend team of 5.", "Improved site speed by 40%.", "Implemented CI/CD pipelines."] 
                },
                { 
                    id: "exp2",
                    position: "Software Engineer", 
                    company: "StartupInc", 
                    date: "2021 - 2023",
                    description: ["Built MVP from scratch using MERN stack.", "Integrated payment gateways."] 
                }
            ]
        },
        {
            id: "education",
            type: "education",
            title: "Education",
            isVisible: true,
            items: [
                { 
                    id: "edu1",
                    degree: "B.Tech Computer Science", 
                    institution: "IIT Delhi", 
                    date: "2017 - 2021",
                    description: "8.5 CGPA"
                }
            ]
        },
        {
            id: "skills",
            type: "skills",
            title: "Skills",
            isVisible: true,
            items: [
                {
                    name: "React", level: "Expert",
                    id: 'sk1'
                },
                {
                    name: "Node.js", level: "Advanced",
                    id: 'sk2'
                },
                {
                    name: "TypeScript",
                    id: 'sk3'
                },
                {
                    name: "AWS",
                    id: 'sk4'
                },
                {
                    name: "Figma",
                    id: 'sk5'
                }
            ],
            columns: 2
        },
        {
            id: "projects",
            type: "projects",
            title: "Projects",
            isVisible: true,
            items: [
                {
                    id: "proj1",
                    title: "E-Commerce Platform",
                    description: ["A full-featured shopping platform with cart and checkout."],
                    technologies: "React, Node.js, MongoDB",
                    link: "github.com/rahul/shop"
                }
            ]
        }
    ]
};

const MiniResumePreview: React.FC<Props> = ({ templateId, scale = 0.4 }) => {
  // Memoize the data to prevent unnecessary re-renders
  const data = useMemo(() => {
     // Ensure we pass the templateId in the data as well, as some components might check it
     return { 
         ...DUMMY_DATA, 
         templateId 
     }; 
  }, [templateId]);

  // Get the specific component for this template
  let TemplateComponent;
  try {
      TemplateComponent = getTemplateComponent(templateId);
  } catch (e) {
      console.error(`Preview failed for template: ${templateId}`, e);
      return <Box sx={{ width: '100%', height: '100%', bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>Error</Box>;
  }

  return (
    <Box 
        sx={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            bgcolor: '#e5e7eb', // Slightly darker bg for contrast
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            userSelect: 'none'
        }}
    >
        {/* Scaled Container */}
        <Box sx={{
            width: A4_WIDTH,
            height: A4_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            bgcolor: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden', // Ensure content doesn't bleed out even if component bugs out
            pointerEvents: 'none' // Disable interaction
        }}>
            <TemplateComponent data={data} />
        </Box>
    </Box>
  );
};

export default MiniResumePreview;
