import React from 'react';
import resumeFile from '../../assets/AliMomin_Resume.docx'; // Update the import statement with the correct path to your resume file
import '../Resume/Resume.css';

function Resume() {
  return (
    <section>
      <h1>Resume</h1>
      <div className="resume-container">
        <h3>Download Resume</h3>
        <a
          href={resumeFile}
          download="AliMomin_Resume.docx" // Specify the filename for the downloaded file
          className="resume-link"
        >
          Download Resume
        </a>
        <h3>Proficiencies</h3>
        <ul className="proficiencies-list">
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Mongo.DB</li>
          <li>Express.js</li>
        </ul>
      </div>
    </section>
  );
}

export default Resume;
