import getTotalScore from "./calculate_score";

const TotalScore = ({ grading, rubrics }) => {
    const total_grade = getTotalScore(grading, rubrics);
    
    return <p 
        className="total-score"
    >Total Score: {total_grade.total}</p>
}


export default TotalScore;