// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { TEMPLATE_REGISTRY } from '../templates/templateRegistry';
// import { TemplateLayout } from '../templates/templates.config';

// interface Props {
//   layout: TemplateLayout;
//   templateId?: string; // Optional specific template config override
//   scale?: number;
// }

// // A4 Dimensions (scaled down logic handled by CSS transform)
// const A4_WIDTH = 595;
// const A4_HEIGHT = 842;

// const DUMMY_DATA = {
//     name: "Rahul Sharma",
//     title: "Software Engineer",
//     summary: "Passionate developer with 3+ years of experience in building scalable web apps using React and Node.js.",
//     email: "rahul@example.com",
//     phone: "+91 98765 43210",
//     skills: ["React", "TypeScript", "Node.js", "AWS", "Figma"],
//     experience: [
//         { role: "Senior Developer", company: "TechCorp", date: "2023 - Present", desc: "Led frontend team of 5." },
//         { role: "Software Engineer", company: "StartupInc", date: "2021 - 2023", desc: "Built MVP from scratch." }
//     ],
//     education: [
//         { degree: "B.Tech Computer Science", school: "IIT Delhi", year: "2021" }
//     ]
// };

// const MiniResumePreview: React.FC<Props> = ({ layout, templateId }) => {
//   // Get Visual Config from Registry or Default
//   const config = templateId ? TEMPLATE_REGISTRY[templateId]?.previewConfig : null;
//   const fontFamily = config?.fontFamily || 'Arial, sans-serif';
//   const accent = config?.accentColor || '#333';
//   const headlineWeight = config?.headlineWeight || 700;
  
//   // -- LAYOUT RENDERERS --

//   // 1. SIMPLE (Standard)
//   const renderSimple = () => (
//       <Box sx={{ p: 4, fontFamily, color: '#000', height: '100%', bgcolor: 'white' }}>
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//               <Typography variant="h4" sx={{ fontWeight: headlineWeight, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1 }}>{DUMMY_DATA.name}</Typography>
//               <Typography sx={{ fontSize: 12, color: '#666', mb: 1 }}>{DUMMY_DATA.title}</Typography>
//               <Box sx={{ fontSize: 10, color: '#888' }}>{DUMMY_DATA.email} | {DUMMY_DATA.phone}</Box>
//               <Box sx={{ width: 40, height: 2, bgcolor: accent, mx: 'auto', mt: 2 }} />
//           </Box>

//           <Box sx={{ mb: 2 }}>
//              <Typography sx={{ fontSize: 12, fontWeight: headlineWeight, color: accent, borderBottom: `1px solid ${accent}`, mb: 1 }}>SUMMARY</Typography>
//              <Typography sx={{ fontSize: 10, lineHeight: 1.4 }}>{DUMMY_DATA.summary}</Typography>
//           </Box>

//           <Box sx={{ mb: 2 }}>
//             <Typography sx={{ fontSize: 12, fontWeight: headlineWeight, color: accent, borderBottom: `1px solid ${accent}`, mb: 1 }}>EXPERIENCE</Typography>
//             {DUMMY_DATA.experience.map((exp, i) => (
//                 <Box key={i} sx={{ mb: 1.5 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 'bold' }}>
//                         <span>{exp.role}</span>
//                         <span>{exp.date}</span>
//                     </Box>
//                     <Typography sx={{ fontSize: 10, fontStyle: 'italic', color: '#555' }}>{exp.company}</Typography>
//                     <Typography sx={{ fontSize: 10 }}>{exp.desc}</Typography>
//                 </Box>
//             ))}
//           </Box>
//       </Box>
//   );

//   // 2. MODERN (Accent Header)
//   const renderModern = () => (
//       <Box sx={{ fontFamily, height: '100%', bgcolor: 'white' }}>
//           <Box sx={{ bgcolor: accent, p: 3, color: 'white' }}>
//               <Typography variant="h4" sx={{ fontWeight: headlineWeight, fontSize: 24 }}>{DUMMY_DATA.name}</Typography>
//               <Typography sx={{ fontSize: 12, opacity: 0.9 }}>{DUMMY_DATA.title}</Typography>
//           </Box>
//           <Box sx={{ p: 3 }}>
//              <Typography sx={{ fontSize: 11, fontWeight: 'bold', color: accent, mb: 0.5 }}>CONTACT</Typography>
//              <Typography sx={{ fontSize: 10, mb: 2, color: '#555' }}>{DUMMY_DATA.email} • {DUMMY_DATA.phone}</Typography>

//              <Typography sx={{ fontSize: 11, fontWeight: 'bold', color: accent, mb: 0.5 }}>SKILLS</Typography>
//              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
//                  {DUMMY_DATA.skills.map(s => (
//                      <Box key={s} sx={{ bgcolor: '#f3f4f6', px: 1, py: 0.5, borderRadius: 1, fontSize: 9 }}>{s}</Box>
//                  ))}
//              </Box>

//              <Typography sx={{ fontSize: 11, fontWeight: 'bold', color: accent, mb: 0.5 }}>EXPERIENCE</Typography>
//              {DUMMY_DATA.experience.map((exp, i) => (
//                 <Box key={i} sx={{ mb: 1, borderLeft: `2px solid ${accent}`, pl: 1 }}>
//                     <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>{exp.role}</Typography>
//                     <Typography sx={{ fontSize: 10, color: '#666' }}>{exp.company}</Typography>
//                 </Box>
//              ))}
//           </Box>
//       </Box>
//   );

//   // 3. SIDEBAR (Two Columns)
//   const renderSidebar = () => (
//       <Box sx={{ fontFamily, display: 'flex', height: '100%', bgcolor: 'white' }}>
//           {/* Sidebar */}
//           <Box sx={{ width: '35%', bgcolor: accent, color: 'white', p: 2 }}>
//                <Box sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '50%', mb: 2 }} />
//                <Typography sx={{ fontSize: 11, fontWeight: 'bold', mb: 0.5 }}>CONTACT</Typography>
//                <Typography sx={{ fontSize: 9, opacity: 0.8, mb: 2, wordBreak: 'break-word' }}>{DUMMY_DATA.email}<br/>{DUMMY_DATA.phone}</Typography>
               
//                <Typography sx={{ fontSize: 11, fontWeight: 'bold', mb: 0.5 }}>SKILLS</Typography>
//                {DUMMY_DATA.skills.slice(0, 4).map(s => (
//                    <Typography key={s} sx={{ fontSize: 9, opacity: 0.8, mb: 0.5 }}>• {s}</Typography>
//                ))}
//           </Box>
//           {/* Main */}
//           <Box sx={{ width: '65%', p: 2 }}>
//               <Typography variant="h5" sx={{ fontWeight: headlineWeight, fontSize: 20, color: accent }}>{DUMMY_DATA.name}</Typography>
//               <Typography sx={{ fontSize: 11, color: '#666', mb: 3 }}>{DUMMY_DATA.title}</Typography>

//               <Typography sx={{ fontSize: 11, fontWeight: 'bold', color: '#333', borderBottom: '1px solid #eee', mb: 1 }}>WORK HISTORY</Typography>
//               {DUMMY_DATA.experience.map((exp, i) => (
//                   <Box key={i} sx={{ mb: 2 }}>
//                       <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>{exp.role}</Typography>
//                       <Typography sx={{ fontSize: 9, color: '#888' }}>{exp.company} | {exp.date}</Typography>
//                       <Typography sx={{ fontSize: 10, mt: 0.5 }}>{exp.desc}</Typography>
//                   </Box>
//               ))}
//           </Box>
//       </Box>
//   );

//   // 4. EXECUTIVE (Formal)
//   const renderExecutive = () => (
//       <Box sx={{ fontFamily, height: '100%', bgcolor: 'white', p: 3, border: '1px solid #eee' }}>
//           <Box sx={{ borderBottom: `2px solid ${accent}`, pb: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
//              <Box>
//                  <Typography variant="h4" sx={{ fontWeight: headlineWeight, fontSize: 26, fontFamily: 'serif' }}>{DUMMY_DATA.name}</Typography>
//                  <Typography sx={{ fontSize: 12, color: '#555' }}>{DUMMY_DATA.title}</Typography>
//              </Box>
//              <Box sx={{ textAlign: 'right', fontSize: 9, color: '#777' }}>
//                  {DUMMY_DATA.email}<br/>{DUMMY_DATA.phone}
//              </Box>
//           </Box>
          
//           <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
//               <Box>
//                   <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: accent, mb: 1, fontFamily: 'serif' }}>EXPERIENCE</Typography>
//                   {DUMMY_DATA.experience.map((exp, i) => (
//                       <Box key={i} sx={{ mb: 2 }}>
//                           <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>{exp.company}</Typography>
//                           <Typography sx={{ fontSize: 10, fontStyle: 'italic' }}>{exp.role}</Typography>
//                           <Typography sx={{ fontSize: 10, mt: 0.5, color: '#444' }}>{exp.desc}</Typography>
//                       </Box>
//                   ))}
//               </Box>
//               <Box>
//                   <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: accent, mb: 1, fontFamily: 'serif' }}>EDUCATION</Typography>
//                   <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>IIT Delhi</Typography>
//                   <Typography sx={{ fontSize: 10 }}>B.Tech CS, 2021</Typography>

//                   <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: accent, mb: 1, mt: 3, fontFamily: 'serif' }}>SKILLS</Typography>
//                   <Typography sx={{ fontSize: 10, lineHeight: 1.6 }}>React, Node, AWS, System Design</Typography>
//               </Box>
//           </Box>
//       </Box>
//   );

//   // 5. CODE (Tech)
//   const renderCode = () => (
//       <Box sx={{ fontFamily, height: '100%', bgcolor: '#1e293b', color: '#e2e8f0', p: 2 }}>
//           <Box sx={{ fontSize: 10, color: '#94a3b8', mb: 2 }}>// resume.json</Box>
//           <Box sx={{ pl: 2, borderLeft: '1px solid #334155' }}>
//               <Box sx={{ color: '#c084fc' }}>const <span style={{ color: '#60a5fa' }}>candidate</span> = {'{'}</Box>
//               <Box sx={{ pl: 2 }}>
//                   <Box>name: <span style={{ color: '#4ade80' }}>"{DUMMY_DATA.name}"</span>,</Box>
//                   <Box>role: <span style={{ color: '#4ade80' }}>"{DUMMY_DATA.title}"</span>,</Box>
//                   <Box>skills: [<span style={{ color: '#facc15' }}>"React", "Node"</span>],</Box>
//                   <Box>experience: [</Box>
//                   <Box sx={{ pl: 2, color: '#94a3b8' }}>// {DUMMY_DATA.experience[0].company}...</Box>
//                   <Box>]</Box>
//               </Box>
//               <Box sx={{ color: '#c084fc' }}>{'}'};</Box>
//           </Box>
//       </Box>
//   );


//   // Select Layout
//   const renderLayout = () => {
//       // If templateId provided, verify its specific layout from registry if needed, 
//       // but for now we trust the layout prop passed down
//       switch (layout) {
//           case 'modern': return renderModern();
//           case 'sidebar': return renderSidebar();
//           case 'executive': return renderExecutive();
//           case 'code': return renderCode();
//           case 'simple': 
//           default: return renderSimple();
//       }
//   };

//   return (
//     <Box 
//         sx={{ 
//             width: A4_WIDTH, 
//             height: A4_HEIGHT, 
//             bgcolor: 'white',
//             overflow: 'hidden',
//         }}
//     >
//         {renderLayout()}
//     </Box>
//   );
// };

// export default MiniResumePreview;
