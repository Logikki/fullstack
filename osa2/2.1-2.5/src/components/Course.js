import Content from "./Contents"
import Header from "./Header"
import Total from "./Total"


const Course = ( { course } ) => 
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
    


export default Course