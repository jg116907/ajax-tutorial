import React, { Component } from 'react';
import { PostWrapper, Navigate, Post } from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component{
  constructor(props) {
    super();
    // initializes component state
    this.state = {
      postId: 1,
      fetching: false,
      post: {
        title: null,
        body: null
      },
      comments: []
    };
  }
  fetchPostInfo = async (postId) => {
    // 비효율적
    // const post = await service.getPost(postId);
    // console.log(post);
    // const comments = await service.getComments(postId);
    // console.log(comments);
    this.setState({
      fetching: true
    });
    const info = await Promise.all([
      service.getPost(postId),
      service.getComments(postId)
    ]);
    const { title, body } = info[0].data;

    const comments = info[1].data;

    this.setState({
      postId,
      post: {
        title,
        body
      },
      comments,
      fetching: false
    });
    // console.log(info)
  }

  componentDidMount () {
    this.fetchPostInfo(1);
  }
  
  render(){
    const {postId, fetching, post, comments} = this.state;
    return(
      <PostWrapper>
        <Navigate
          postId={postId}
          disabled={fetching}
        />
        <Post
          title={post.body}
          body={post.body}
          comments={comments}
        />
      </PostWrapper>
    );
  }
}

export default PostContainer;
