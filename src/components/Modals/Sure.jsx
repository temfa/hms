import React from "react";
import Modal from "./Modal";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { Button } from "../Form";

const Sure = ({ closeModal, isOpen, loading, action }) => {
  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title={"Are you sure?"} width={"max-w-xl"}>
      <form onSubmit={action}>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button onClick={closeModal} className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
            Cancel
          </button>
          <Button label="Save" Icon={HiOutlineCheckCircle} type={true} loading={loading} />
        </div>
      </form>
    </Modal>
  );
};

export default Sure;
