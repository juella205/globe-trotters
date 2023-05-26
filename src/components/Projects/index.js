import React from 'react';
import './Projects.css';
import Project1Image from '../../assets/Project1.png';
import Project2Image from '../../assets/Project2.png'; 
import Project3Image from '../../assets/Project3.png'; 
import Project4Image from '../../assets/Project4.png'; 
import Project5Image from '../../assets/Project5.png'; 
import Project6Image from '../../assets/Project6.png'; 


function Projects() {
  return (
    <section>
      <h1>My Projects</h1>
      <div className="project-container">
        <div className="projCard">
          <h3>Employee Tracker</h3>
          <a
            href="webiteURLGoesHere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Project1Image} alt="Employee Tracker frontend" />
          </a>
          <div className="project-links">
            <a
              href="https://drive.google.com/file/d/1EX5khPwEd0p7yEnN7F26mufVfvFOdbzE/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Video Tutorial
            </a>
            <a
              href="https://github.com/alimomin7861/employee-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="projCard">
          <h3>Social Network API</h3>
          <a
            href="webiteURLGoesHere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Project2Image} alt="Project 2 frontend" />
          </a>
          <div className="project-links">
            <a
              href="https://drive.google.com/file/d/1TsHdBmwKi6jocZueEtwXcLSj7HlL6mro/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Video Tutorial
            </a>
            <a
              href="https://github.com/alimomin7861/NoSQL-Social-Network-API"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="projCard">
          <h3>Note Taker</h3>
          <a
            href="webiteURLGoesHere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Project3Image} alt="Project 3 frontend" />
          </a>
          <div className="project-links">
            <a
              href="deployedURLGoesHere"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deployed App
            </a>
            <a
              href="githubURLGoesHere"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="projCard">
          <h3>Randomized Password Generator</h3>
          <a
            href="webiteURLGoesHere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Project4Image} alt="Project 4 frontend" />
          </a>
          <div className="project-links">
            <a
              href="https://alimomin7861.github.io/Randomized-Password-Generator/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deployed App
            </a>
            <a
              href="https://github.com/alimomin7861/Randomized-Password-Generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="projCard">
          <h3>Coding Quiz</h3>
          <a
            href="webiteURLGoesHere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Project5Image} alt="Project 5 frontend" />
          </a>
          <div className="project-links">
            <a
              href="https://alimomin7861.github.io/Full-Stack-Coding-Quiz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deployed App
            </a>
            <a
              href="https://github.com/alimomin7861/Full-Stack-Coding-Quiz"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="projCard">
          <h3>Weather Dashboard</h3>
          <a
            href="webiteURLGoesHere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Project6Image} alt="Project 6 frontend" />
          </a>
          <div className="project-links">
            <a
              href="https://alimomin7861.github.io/weather-dashboard/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deployed App
            </a>
            <a
              href="https://github.com/alimomin7861/weather-dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
