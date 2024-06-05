import React, { useState } from "react";

const EditSettingsModal = ({ showModal, onClose, onSave }) => {
  const [zodiacSign, setZodiacSign] = useState(sessionStorage.getItem("zodiacSign") || "");
  const [lifePathNumber, setLifePathNumber] = useState(sessionStorage.getItem("lifePathNumber") || "");
  const [ennealogyNumber, setEnnealogyNumber] = useState(sessionStorage.getItem("ennealogy") || "");
  const [religion, setReligion] = useState(sessionStorage.getItem("religion") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      zodiacSign,
      lifePathNumber,
      ennealogyNumber,
      religion
    });
    onClose();
  };

  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Zodiac Sign</label>
            <input
              type="text"
              value={zodiacSign}
              onChange={(e) => setZodiacSign(e.target.value)}
            />
          </div>
          <div>
            <label>Life Path Number</label>
            <input
              type="text"
              value={lifePathNumber}
              onChange={(e) => setLifePathNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Ennealogy Number</label>
            <input
              type="text"
              value={ennealogyNumber}
              onChange={(e) => setEnnealogyNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Spiritual Practice</label>
            <input
              type="text"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditSettingsModal;
