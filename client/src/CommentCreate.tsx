import type { FC, FormEvent } from "react";
import { useState } from "react";
import axios from "axios";

interface CommentCreateProps {
  postId: string;
}

const CommentCreate: FC<CommentCreateProps> = ({ postId }) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <label htmlFor="comment">New Comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
