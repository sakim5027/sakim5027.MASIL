import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./Comment.module.css";

const Comment = (props) => {
  const user = useSelector(state => state.user)

  const [CommentValue, setCommentValue] = useState("");

  const onCommentValueChange = (e) => {
    setCommentValue(e.target.value)
  }

  const onRegisterComment = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      content: CommentValue,
      contentId: props.contentId
    }
    axios.post("/api/comments/saveComment", variables)
    .then(res => {
      if(res.data.success) {
        setCommentValue("")
        props.refreshFunction(res.data.result);
      } else {
        alert("댓글 등록에 실패했습니다.")
      }
    })
  }

  return (
    <div className={styles.commentInput}>
      <h1 className={styles.commentCount}>0개의 댓글이 있습니다.</h1>
      <textarea
        placeholder="댓글을 입력하세요."
        value={CommentValue}
        onChange={onCommentValueChange}
      ></textarea>
      <div className={styles.buttonWrapper}>
        <button
          onClick={onRegisterComment}
          className={styles.buttonComplete}
          name="register"
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
};

export default Comment;
