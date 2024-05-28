import React, { useRef } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { CategoryItem } from "../model/CategoryItem.ts";
import { updateCategory } from "../../services/AdminService.ts";
import { mutate } from "swr";
interface Props {
  category: CategoryItem;
  show: boolean;
  handleClose;
}
const CategoryEditForm = ({ category, show, handleClose }: Props) => {
  const descRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const descValue = descRef.current.value;
    updateCategory(category.id, descValue)
      .then(() => {
        alert("Category edited successfully");
        mutate("/categories");
      })
      .catch(() => {
        alert("Failed to edit category");
      });

    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
      }}
    >
      <Modal.Header closeButton>Edit category</Modal.Header>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              className="form-control-plaintext"
              type="text"
              id="categoryName"
              value={category.name}
            />
            <label htmlFor="categoryDesc" className="form-label">
              Category descriptions
            </label>
            <input
              className="form-control"
              type="text"
              id="categoryDesc"
              ref={descRef}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Update category
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CategoryEditForm;
