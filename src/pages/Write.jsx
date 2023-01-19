import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { __addPostThunk } from "../redux/modules/postsSlice";

const Write = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const isSuccess = useSelector((state) => state.posts.isSuccess);
  // const [like, setLike] = useState();
  const [post, setPost] = useState({
    title: "",
    content: "",
    file: "",
  });

  const [image, setImage] = useState();
  //   {
  //   image_file: "",
  //   preview_URL:
  // }

  const [imageFile, setImageFile] = useState("null");

  const imageUpLoad = async (e) => {
    imagePreview(e.target.files[0]);
    setImageFile(e.target.files[0]);
    const imgFile = e.target.files[0];
    // const formData = new FormData();
    // formData.append("file", imgFile);
    // dispatch(__addPostThunk(formData));
  };

  // 이미지 미리보기
  const imagePreview = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  // useEffect(() => {
  //   if (!isSuccess) return;
  //   if (isSuccess) navigate("/Home");

  //   return () => dispatch(clearPost());
  // }, [dispatch, isSuccess, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
      file: imageFile,
    });
  };

  return (
    <div>
      <Layout>
        <Header />
        <PostWrap>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (post.title.trim() === "" || post.content.trim() === "") {
                return alert("모든 항목을 입력해주세요.");
              }
              dispatch(__addPostThunk(post));
              setPost({ title: "", content: "" });
              navigate("/Home");
            }}
          >
            <img src={image} />
            <input
              type="file"
              name="image/*"
              onChange={imageUpLoad}
              id="ex_file"
              style={{ display: "flex" }}
            />

            <input
              type="text"
              name="title"
              placeholder="제목을 입력해주세요. (20자 이내)"
              value={post.title}
              onChange={onChangeHandler}
              maxLength={20}
            />
            <textarea
              type="text"
              name="content"
              placeholder="내용을 입력해주세요. (100자 이내)"
              value={post.content}
              onChange={onChangeHandler}
              maxLength={100}
            />
            <button>등록하기</button>
          </form>
        </PostWrap>
        <button
          onClick={() => {
            navigate("/Home");
          }}
        >
          Home으로 이동
        </button>
      </Layout>
    </div>
  );
};

export default Write;

const PostWrap = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0;
  gap: 10px;
  margin: auto;
  input {
    width: 80%;
    height: auto;
    padding: 15px;
    border: 2px solid var(--color-darktext);
    border-radius: 5px;
  }
  .img-input {
    display: none;
  }
  div {
    width: 300px;
    height: 250px;
    border: 2px solid #333;
  }
  textarea {
    width: 80%;
    height: 150px;
    padding: 20px;
    border: 2px solid var(--color-darktext);
    border-radius: 5px;
    margin: 15px 0;
  }
  /* button {
    width: 30%;
    padding: 10px;
    font-weight: 800;
    font-size: 13px;
    color: #fff;
    background-color: transparent;
    border: 2px solid var(--color-darktext);
    cursor: pointer;
  } */
  .pic-btn {
    color: var(--color-darktext);
  }
  .pic-btn:hover {
    background-color: var(--color-darktext);
    color: #fff;
  }
  .upload-btn {
    background-color: var(--color-darktext);
  }
  img {
    width: 320px;
    height: 320px;
    object-fit: cover;
    padding: 20px;
  }
`;
