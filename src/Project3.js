import React, { useState, useEffect, useRef } from 'react';

import groups from './items';

const App = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const commentRef = useRef(null);

  const calculateGroupTotal = (group) => {
    let groupTotal = 0;
    group.items.forEach((item) => {
      if (item.grade > 0) {
        groupTotal += item.grade;
      }
    });
    return groupTotal;
  };

  const handleCopyLink = () => {
    if (commentRef.current) {
      commentRef.current.select();
      document.execCommand('copy');
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [itemId]: !prevSelectedCheckboxes[itemId],
    }));
    console.log(selectedCheckboxes);
    
  };

  const handleCopyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const autoAdjustTextareaHeight = () => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  };

  const updateComment = (comment) => {
    setComment(comment);
    autoAdjustTextareaHeight();
  }

  useEffect(() => {
    autoAdjustTextareaHeight();
  }, commentRef.current);

  useEffect(() => {
    let totalScore = 0;
    let generatedComment = '';

    groups.forEach((group) => {
      if (selectedCheckboxes[-group.id]) {
        // no submission 
        generatedComment += `[${group.name}] -${calculateGroupTotal(group)}pts, No submission or does not work at all\n`;
        return;
      }
      group.items.forEach((item) => {
        const isChecked = selectedCheckboxes[item.id];
        const grade = item.grade;

        if (grade > 0) {
          if (!isChecked) {
            generatedComment += `[${group.name}] -${item.grade}pts, ${item.comment}\n`;
          } else {
            totalScore += grade;
          }
        } else if (grade <= 0) {
          if (isChecked) {
            totalScore += grade;
            generatedComment += `[${group.name}] -${-item.grade}pts, ${item.comment}\n`;
          }
        }
      });
    });

    setScore(totalScore);
    updateComment(generatedComment);
    autoAdjustTextareaHeight();
  }, [selectedCheckboxes]);

  return (
    <div className="container">
      <div id="header">
        <h1>Project 3 Grading Rubric</h1>
        <hr />
      </div>
      {groups.map((group) => (
        <div key={group.id} className="group">
          <h2>{group.name} ({calculateGroupTotal(group)}pts)</h2>
          {group.check_submission && (
            <label key={-group.id} className="item">
              <input
                type="checkbox"
                checked={selectedCheckboxes[-group.id] || false}
                onChange={() => handleCheckboxChange(-group.id)}
              />
              <span className="checkmark"></span>
              <span className="description negative">
                No submission
              </span>
            </label>
          )}
          {group.items.map((item) => (
            <div>
              <label key={item.id} className={`item ${selectedCheckboxes[-group.id] && "disabled"}`}>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  disabled={selectedCheckboxes[-group.id] || false}
                />
                <span className="checkmark"></span>
                {item.code && (
                  <span className="copy-code">
                    [<a onClick={() => handleCopyToClipboard(item.code)}>Code</a>]
                  </span>
                )}
                <span className={`description ${item.grade < 0 ? 'negative' : ''}`}>
                  {item.description}
                </span>
                <span className="grade">(Grade: {item.grade})</span>
              </label>
            </div>
          ))}

        </div>
      ))}

      <div className="sidebar">
        <button className="reset-button" onClick={() => {
          setSelectedCheckboxes({});
          autoAdjustTextareaHeight();
        }}>
          Reset
        </button>
        <p className="total-score">Total Score: {score}</p>
        <div className="comment-container">
          <p className="comment-label">Comment [<a className="copy-link" onClick={handleCopyLink}>
            Copy
          </a>]</p>
          <textarea
            className="comment"
            ref={commentRef}
            value={comment}
            onChange={(e) => updateComment(e.target.value)}
            placeholder="Enter your comment..."
            style={{ height: 'auto', height: '629px' }}
          />

        </div>
      </div>
    </div>
  );
};

export default App;
