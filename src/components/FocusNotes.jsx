
import { useState } from "react";
import "./FocusNotes.css";

const notes = [
  {
    title: "Stay Focused",
    description:
      "Focus on one task at a time. Avoid distractions and give your best effort.",
    number: "01"
  },
  {
    title: "Plan Your Day",
    description:
      "Create a daily task list and prioritize important work first.",
    number: "02"
  },
  {
    title: "Take Small Breaks",
    description:
      "Take short breaks between tasks to refresh your mind and improve productivity.",
    number: "03"
  }
];

function FocusNotes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    setCurrentSlide((previous) => (previous + 1) % notes.length);
  }

  function previousSlide() {
    setCurrentSlide(
      (previous) => (previous - 1 + notes.length) % notes.length
    );
  }

  const currentNote = notes[currentSlide];

  return (
    <div className="focus-notes">
      <div className="focus-notes-heading">
        <h2>Focus Notes</h2>
        <span>{currentNote.number} / 03</span>
      </div>

      <div className="focus-note-card" aria-live="polite">
        <h3>{currentNote.title}</h3>
        <p>{currentNote.description}</p>

        <div className="focus-note-controls">
          <button type="button" onClick={previousSlide} aria-label="Previous focus note">Previous</button>
          <button type="button" onClick={nextSlide} aria-label="Next focus note">Next</button>
        </div>
      </div>

      <div className="focus-note-dots">
        {notes.map((note, index) => (
          <button
            key={note.number}
            className={currentSlide === index ? "selected-dot" : ""}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`} aria-current={currentSlide === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default FocusNotes;
