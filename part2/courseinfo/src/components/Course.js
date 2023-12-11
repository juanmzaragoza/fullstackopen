import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Content = ({ parts }) => (
  <>
    {
      parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    }
    <Total parts={parts} />
  </>
)

const Total = ({ parts }) => (
  <p><b>Number of exercises {parts.reduce((sum, part) => part.exercises + sum, 0)}</b></p>
)

const Course = ({ courses }) => {
  return courses.map(course => (
    <div key={course.id} >
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  ))
}

export default Course;