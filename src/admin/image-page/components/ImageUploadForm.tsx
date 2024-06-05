import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { adminFetcher, updateImagesData } from "../../services/AdminService.ts";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { IMAGES_HOST } from "../../../const/Util.ts";
import ImagePreview from "../../components/ImagePreview.tsx";
import SubmitButton from "../../../components/SubmitButton.jsx";
import ErrorPage from "../../../components/ErrorPage.tsx";

const ImageUploadForm = ({ productId, next }) => {
  const [thumbnail, setThumbnail] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [newImagesUrl, setNewImagesUrl] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState("");
  const newImagesRef = useRef<HTMLInputElement>(
    document.createElement("input")
  );
  const thumbnailRef = useRef<HTMLInputElement>(
    document.createElement("input")
  );
  const { data, error, isLoading } = useSWR(`/products/${productId}`, (url) =>
    adminFetcher(url, {})
  );
  const nav = useNavigate();
  useEffect(() => {
    if (data) {
      if (data.thumbnailUrl) {
        setThumbnail(IMAGES_HOST + data.thumbnailUrl);
      }

      setImagesUrl(data.imagesUrl.map((url) => IMAGES_HOST + url));
    }
  }, [data]);

  if (error) {
    return <ErrorPage error={error}></ErrorPage>;
  }
  if (isLoading) return <h1>Loading</h1>;

  const handlieSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (thumbnail == "") {
      alert("You must add a thumbnail image");
      return;
    }
    updateImagesData(new FormData(event.target))
      .then(() => {
        alert("Images upload successfully!");
        nav(next);
      })
      .catch(() => {
        alert("Images upload failed!");
      });
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    } else if (data.thumbnailUrl) {
      setThumbnail(IMAGES_HOST + data.thumbnailUrl);
    } else {
      setThumbnail("");
    }
  };

  const handleNewImageUpload = (e) => {
    if (e.target.files[0]) {
      const data: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        data.push(URL.createObjectURL(e.target.files[i]));
      }
      setNewImagesUrl(data);
    }
  };

  const handleDeleteThumbnail = () => {
    thumbnailRef.current.value = "";
    if (data.thumbnailUrl) {
      setThumbnail(IMAGES_HOST + data.thumbnailUrl);
    } else {
      setThumbnail("");
    }
  };

  return (
    <>
      <h1>Upload image for {data.name} </h1>
      <Button
        variant="dark"
        onClick={() => {
          nav(`/admin/products/${productId}`);
        }}
      >
        Edit product data
      </Button>
      <Form onSubmit={handlieSubmit}>
        <Form.Control
          type="number"
          className="d-none"
          value={productId}
          name="productId"
        />
        <Form.Group>
          <Form.Label>
            <b>Thumbnail</b>
          </Form.Label>
          <br />
          {thumbnail == "" ? (
            <></>
          ) : (
            <ImagePreview
              src={thumbnail}
              handleDelete={handleDeleteThumbnail}
            />
          )}
          <Form.Control
            accept=".png, .jpg, .jpeg"
            type="file"
            name="thumbnail"
            ref={thumbnailRef}
            onChange={handleThumbnailChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Images</b>
          </Form.Label>
          <Row>
            {imagesUrl.length > 0 ? (
              imagesUrl.map((url) => {
                return (
                  <ImagePreview
                    src={url}
                    handleDelete={() => {
                      setImagesToDelete((imagesToDelete) => {
                        return (
                          imagesToDelete + url.replace(/^.*[\\/]/, "") + " "
                        );
                      });
                      setImagesUrl(() => {
                        const data: string[] = [];
                        for (let imageUrl of imagesUrl) {
                          if (imageUrl !== url) {
                            data.push(imageUrl);
                          }
                        }
                        return data;
                      });
                    }}
                  />
                );
              })
            ) : (
              <></>
            )}
            {newImagesUrl.length > 0 ? (
              newImagesUrl.map((url, index) => {
                return (
                  <ImagePreview
                    src={url}
                    handleDelete={() => {
                      setNewImagesUrl((imagesUrl) => {
                        if (imagesUrl.length == 1) {
                          return [];
                        }
                        return imagesUrl.splice(index, 1);
                      });
                      const dt = new DataTransfer();

                      for (let file of newImagesRef.current.files)
                        if (file !== newImagesRef.current.files[index])
                          dt.items.add(file);

                      newImagesRef.current.files = dt.files;
                    }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </Row>

          <Form.Control
            type="file"
            name="file"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={handleNewImageUpload}
            ref={newImagesRef}
          />
        </Form.Group>
        <Form.Control
          value={imagesToDelete}
          className="d-none"
          name="deleteImages"
        ></Form.Control>
        <SubmitButton>Upload images</SubmitButton>
      </Form>
    </>
  );
};

export default ImageUploadForm;
