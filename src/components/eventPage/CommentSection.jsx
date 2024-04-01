import React from 'react'
import Comment from './Comment'
import DummyCommentData from "../../data/DummyCommentData"
import DummyUserData from "../../data/DummyUserData"
import PostComment from './PostComment'

const CommentSection = () => {
  let comment = DummyCommentData[0];
  let user = DummyUserData[0];

  return (
    <div className='pb-10'>
      <PostComment
        key={comment._id}
        id={comment._id}
        currentUserId={user.id}
        parentId={comment.parentId}
        content={comment.content}
        author={comment.author}
        community={comment.community}
        createdAt={comment.createdAt}
        comments={comment.comments}
      />

      <Comment
        key={comment._id}
        id={comment._id}
        currentUserId={user.id}
        parentId={comment.parentId}
        content={comment.content}
        author={comment.author}
        community={comment.community}
        createdAt={comment.createdAt}
        comments={comment.comments}
    />
    </div>
  )
}

export default CommentSection