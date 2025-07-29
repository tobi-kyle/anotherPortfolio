import headshot from '../assets/headshot.png';
import resume from '../assets/resume.pdf';

import html from '../assets/html.png';
import css from '../assets/csslogo.png';
import js from '../assets/jslogo.webp';
import java from '../assets/javalogo.png';
import mysql from '../assets/sqllogo.png';
import csharp from '../assets/csharplogo.png';
import node from '../assets/nodejslogo.png';

export default function About() {
  return (
    <div className="container about">
      <img src={headshot} alt="Kevin Kyle Falinchao" />
      <h1>Kevin Kyle Falinchao</h1>
      <p>
        Passionate software engineer focused on building intuitive and accessible web applications. 
        Experienced with technologies such as JavaScript, React, Node.js, and more. 
        Enthusiastic about UI/UX design and continuously learning to create smooth, user-centered digital experiences.
      </p>

      <h2>Technologies I use</h2>
      <div className="tools-logos">
        <img src={html} alt="HTML" title="HTML5" />
        <img src={css} alt="CSS" title="CSS3" />
        <img src={js} alt="JavaScript" title="JavaScript" />
        <img src={java} alt="Java" title="Java" />
        <img src={mysql} alt="MySQL" title="MySQL" />
        <img src={csharp} alt="C#" title="C#" />
        <img src={node} alt="Node.js" title="Node.js" />
      </div>

        <h2>Contact Me</h2>
            <a href={resume} className="btn" target="_blank" rel="noreferrer">
              Download Resume
            </a>
          </div>
      );
}
