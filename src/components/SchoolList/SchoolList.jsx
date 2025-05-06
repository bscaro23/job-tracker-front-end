// src/components/HootList/SchoolList.jsx

import { Link } from 'react-router';



const SchoolList = (props) => {
    return (
        <main>
          {props.schools.map((school) => (
            <Link key={school._id} to={`/school/${school._id}`}>
              <article>
                <header>
                    <h2>{school.name}</h2>
                </header>
                <p>{school.location}</p>
              </article>
            </Link>
          ))}
        </main>
      );
};

export default SchoolList