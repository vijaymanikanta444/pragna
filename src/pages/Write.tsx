import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save your work");
      navigate("/login");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    setSaving(true);
    try {
      // TODO: Implement save functionality with Supabase
      console.log("Saving:", { title, content, authorId: user.id });
      alert("Article saved as draft!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your work?")) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="write-container">
      <div className="write-toolbar">
        {user && <span className="author-tag">Writing as {user.fullName}</span>}
        <div className="write-actions">
          <button onClick={handleClear} className="btn-secondary btn-small">
            Clear
          </button>
          <button
            onClick={handleSave}
            className="btn-primary btn-small"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </div>

      <div className="editor">
        <input
          type="text"
          className="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="content-input"
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <footer className="write-footer">
        <span className="word-count">
          {content.split(/\s+/).filter(Boolean).length} words
        </span>
        <span className="char-count">{content.length} characters</span>
      </footer>
    </div>
  );
}
