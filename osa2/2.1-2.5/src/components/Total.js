const Total = ({ parts }) => {
    const totalAmount = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    
    return (
    <p>Total of {totalAmount} exercises</p>
    )
}

export default Total