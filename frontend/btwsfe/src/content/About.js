import React from 'react';

function About() {

    return (
        <div className="w-100">
            <p className="font-weight-bold font-size-medium mb-3">Ismertető</p>

            <p className="font-size-normal">Webáruház készítője:</p>
            <p className="font-size-normal mt-1 pl-2"><span className="font-weight-bold">Boros Tibor</span> (boros2222@gmail.com)</p>

            <p className="font-size-normal mt-4">Legfőbb felhasznált technológiák:</p>
            <div className="row mt-1">
                <p className="col-12 col-lg-3 font-weight-bold pl-4">Backend</p>
                <p className="col-12 col-lg-9 pl-5">Java Enterprise Edition</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">JAX-RS (RestEasy)</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">JPA (Hibernate)</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">JSON Web Token for Java</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">WildFly alkalmazásszerver</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">PostgreSQL adatbázis</p>
            </div>
            <div className="row mt-4">
                <p className="col-12 col-lg-3 font-weight-bold pl-4">Frontend</p>
                <p className="col-12 col-lg-9 pl-5">JavaScript</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">ReactJS</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">Redux</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">PrimeReact</p>
                <p className="col-12 col-lg-3"/>
                <p className="col-12 col-lg-9 mt-1 pl-5">Bootstrap</p>
            </div>

            <p className="font-size-normal mt-5 mb-1">Megjegyzés:</p>
            <p>A weboldalt a szakdolgozatomhoz készítettem a Debreceni Egyetem Programtervező Informatikus szakán 2020-ban.</p>
            <p>Ez az oldal csupán imitálja a tényleges webáruházak funkcióit, de tényleges pénzforgalmat nem lehet rajta lebonyolítani.</p>
        </div>
    )
}

export default About;