import React from "react";

const Resume = () => {
  return (
    <div className=" lg:px-80 lg:py-4 bg-white md:p-10">
      <div className="bg-gray-900 px-10 rounded-md leading-normal text-white">
        <h1 className="text-center text-4xl text-gray-300 mb-10 pt-4">
          Sital Nagarkoti | Resume
        </h1>
        <h2 className=" text-3xl text-gray-300 mb-3 pt-4">
          Primary Information
        </h2>
        <p className=" text-md text-gray-300 mb-6 pt-4 leading-7">
          <strong>Name:</strong>&nbsp; Sital Nagarkoti <br />
          <strong>Employment Status:</strong>&nbsp; Student
          <br />
          <strong>College:</strong>&nbsp; Pulchowk Campus, IOE <br />
          <strong>Undergraduate:</strong>&nbsp; Bachelor in Computer Engineering
          (BCT)
        </p>
        <p className=" text-md text-gray-300 pt-4">
          <strong>Address:</strong>
        </p>
        <ul className=" text-md text-gray-300 pt-4 px-10 leading-7">
          <li>Primary: Kohalpur, Banke </li>
          <li>Secondary: Lokanthali, Bhaktapur (current)</li>
        </ul>
        <p className=" text-md text-gray-300 mb-4 pt-4">
          <strong>Email:</strong> &nbsp;{" "}
          <a href="mailto:sitalnagarkoti123@gmail.com">
            sitalnagarkoti123@gmail.com
          </a>
        </p>
        <hr />
        <strong>
          <h2 className=" text-2xl text-gray-300 mb-4 pt-4">
            Skills and Experiences
          </h2>
        </strong>

        <strong>
          <h4 className=" text-lg text-gray-300 mb-4 pt-4">Relevant Skills:</h4>
        </strong>
        <ul className=" text-md px-10 text-gray-300 mb-4 pt-4 leading-7">
          <li>
            <p>Programming Languages: Python, Javascript, C++, C , Typescript</p>
          </li>
          <li>
            <p>Web Development</p>
            <ul className=" text-md text-gray-300 mb-4 pt-4 px-20">
              <li>
                Front End: HTML5, CSS3, JavaScript, React, Redux , Next.js <br />
              </li>
              <li>
                Backend: Django, FastApi, Node (Express)
                <br />
              </li>
              <li>Database: SQLite3 , SQL , Mongo</li>
            </ul>
          </li>

          <li>
            <p>App Developmentx: Flutter and Dart.</p>
          </li>
          <li>
            <p>Others:LaTex, Git, Docker .</p>
          </li>
        </ul>
        <strong>
          <h4 className=" text-lg text-gray-300 mb-4 pt-4">
            Website Projects:
          </h4>
        </strong>
        <ul className=" text-md text-gray-300 mb-4 pt-2 px-10">
          <li>
            <a href="http://sitalnagarkoti.com.np">
              http://sitalnagarkoti.com.np
            </a>{" "}
          </li>
          <li>
            <a href="https://react-project-999-quiz.netlify.app/">
              https://react-project-999-quiz.netlify.app/
            </a>{" "}
          </li>
        </ul>
        <strong>
          <h4 className=" text-lg text-gray-300 mb-4 pt-4">
            Highlighted Projects:
          </h4>
        </strong>

        <ul className=" text-lg text-gray-300 mb-4 pt-4 px-10">
          <li>
            <p>
              <a href="https://github.com/Sital999/ioe_app">ShihsuCare</a>
            </p>
            <ul className=" text-md text-gray-300 mb-4 pt-4 pl-20">
              <li>Web platform for childrens where they are diagnosed with th help of Community Health Workers and Doctors remotely.</li>
              <li>Developed using Node.js, Next.js, Redux , MaterialUI</li>
            </ul>
          </li>
          <li>
            <p>
              <a href="https://github.com/Sital999/ioe_app">BookChowk</a>
            </p>
            <ul className=" text-md text-gray-300 mb-4 pt-4 pl-20">
              <li>Bookchowk is an online platform that provides book lovers with a vibrant community and a wide range of resources, allowing them to discover, discuss, and delve into their favorite books.</li>
              <li>Developed using Node.js, React, Redux , TailwindCSS</li>
            </ul>
          </li>
          <li>
            <p>
              <a href="https://github.com/Sital999/Letter-Recommendation">
                Recommendation Letter
              </a>
            </p>
            <ul className=" text-md text-gray-300 mb-4 pt-4 pl-20">
              <li>Web application for generating Recommendation Letter.</li>
              <li>Developed using Django, Javascript, Bootstrap.</li>
            </ul>
          </li>
          <li>
            <p>
              <a href="https://github.com/Sital999/Cpp-Programming-WW3t">Social Media Clone</a>
            </p>
            <ul className=" text-md text-gray-300 mb-4 pt-4 px-20">
              <li>Simple Social Media clone that has basic fucntionality of adding post , comment ,like etc. </li>
              <li>Developed using Node.js, React, Redux , TailwindCSS</li>
            </ul>
          </li>

          <li>
            <p>
              <a href="https://github.com/Sital999/ioe_app">IOE Mobile App</a>
            </p>
            <ul className=" text-md text-gray-300 mb-4 pt-4 pl-20">
              <li>User friendly mobile app for IOE students and teachers.
                Developed using Flutter and Django RestFramework.</li>
            </ul>
          </li>
        </ul>
        <hr />
        <strong>
          <h4 className=" text-lg text-gray-300 mb-4 pt-4 ">Relevant Links:</h4>
        </strong>

        <ul className=" text-md text-gray-300 mb-4 pt-4 px-20 ">
          <li>
            GitHub:{" "}
            <a href="https://github.com/Sital999">
              https://github.com/Sital999
            </a>{" "}
          </li>
          <li>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/sital-nagarkoti-b62409241/">
              https://www.linkedin.com/in/sital-nagarkoti-b62409241/
            </a>
          </li>
        </ul>
        <hr className="  pb-4 pt-4  " />
      </div>
    </div>
  );
};

export default Resume;
