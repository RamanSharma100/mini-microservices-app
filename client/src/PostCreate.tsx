import type { FC, FormEvent } from "react";
import { useState } from "react";
import axios from "axios";

const PostCreate: FC = () => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-5">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control my-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
};

export default PostCreate;
