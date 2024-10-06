import React, { useState } from "react";
import Button from "../../CommonComponents/Button/Button";
import Modal from "../../CommonComponents/Modal/Modal";
import { Input, DatePicker, message, Pagination, Popover } from "antd"; // Added Popover
import Dropdown from "../../CommonComponents/DropDown/DropDown";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  setStatusFilter,
  setEventDateFilter,
  resetFilters,
} from "../../redux/taskListSlice";
import {
  CheckCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleTwoTone,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { img } from "../../CommonComponents/Images";
import moment from "moment";
import "./TaskList.css";

const TaskList = () => {
  const [data, setData] = useState({
    title: "",
    describe: "",
    status: "",
    date: "",
    id: null,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const filter = useSelector((state) => state.task.filter);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const dropdownMenu = [
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];
  const statusDropDown = [
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];
  const eventDropDown = [
    { label: "Upcoming", value: "Upcoming" },
    { label: "Past", value: "past" },
  ];

  const closeModal = () => {
    setIsShowModal(false);
    setIsEditMode(false);
    setData({ title: "", describe: "", status: "", date: "", id: null });
    setDatePickerValue(null);
  };

  const notify = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

  const onSubmit = () => {
    if (data.title && data.describe && data.status && data.date) {
      if (isEditMode) {
        dispatch(editTask({ id: data.id, updatedTask: data }));
        notify("success", "Task Edited Successfully");
      } else {
        dispatch(addTask(data));
        notify("success", "Task Added Successfully");
      }
      closeModal();
    } else {
      notify("error", "Every Field Should Be Filled");
    }
  };

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const handleDate = (val) => {
    if (val) {
      const date = val.toDate();
      const formattedDate = formatDate(date);
      setData({ ...data, date: formattedDate });
      setDatePickerValue(val);
    } else {
      setData({ ...data, date: "" });
      setDatePickerValue(null);
    }
  };

  const handleDropdownSelect = (val) => {
    setData({ ...data, status: val.value });
  };

  const handleFilterStatus = (val) => {
    dispatch(setStatusFilter(val.value));
  };

  const handleFilterEvent = (val) => {
    dispatch(setEventDateFilter(val.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleOnclickAdd = () => {
    setIsShowModal(true);
    setIsEditMode(false);
  };

  const handleOnclickEdit = (taskToEdit) => {
    setData(taskToEdit);
    setIsEditMode(true);
    setIsShowModal(true);
    setDatePickerValue(taskToEdit.date ? moment(taskToEdit.date) : null);
  };

  const handleOnclickDelete = (id) => {
    dispatch(deleteTask(id));
    notify("error", "Task Deleted Successfully");
  };

  const today = new Date();
  const filteredTasks = tasks.filter((taskItem) => {
    const matchesStatus = filter.status
      ? taskItem.status === filter.status
      : true;
    const taskDate = new Date(taskItem.date);
    const isUpcoming = taskDate >= today;
    const matchesEventDate =
      filter.eventDate === "Upcoming"
        ? isUpcoming
        : filter.eventDate === "past"
        ? !isUpcoming
        : true;

    return matchesStatus && matchesEventDate;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : description;
  };

  return (
    <div className="task-list">
      {contextHolder}

      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <div className="task-title px-3 py-3 fw-semibold">
          <span className="fs-4">{"Task List"}</span>
        </div>
        <div className="px-3 py-3">
          <Button
            text={"Add"}
            icon={<PlusCircleOutlined />}
            type={"primary"}
            onClick={handleOnclickAdd}
          />
        </div>
      </div>

      <div className="container">
        {tasks.length > 0 && (
          <div className="filter-section">
            <div>
              <Dropdown
                className={"me-2 me-sm-3 status-dd"}
                text={filter.status ? filter.status : "Status"}
                options={statusDropDown}
                onSelect={handleFilterStatus}
                trigger={["click"]}
              />
              <Dropdown
                className={"event-dd"}
                text={filter.eventDate ? filter.eventDate : "Due Date"}
                options={eventDropDown}
                onSelect={handleFilterEvent}
                trigger={["click"]}
              />
            </div>
            <Button
              className=""
              text="Reset"
              type="primary"
              onClick={handleResetFilters}
            />
          </div>
        )}

        {filteredTasks.length > 0 ? (
          <div
            className="d-flex justify-content-between flex-column"
            style={{ height: "71vh" }}
          >
            <div>
              <div className="row">
                {currentTasks.map((val, i) => (
                  <div key={i} className="col-md-6 col-lg-4 ">
                    <Popover
                      content={
                        <div>
                          <p>{val.describe}</p>
                          <div className="d-flex justify-content-between">
                            <div>{val.status}</div>
                            <div className="text-primary">{val.date}</div>
                          </div>
                        </div>
                      }
                      title={
                        val.title.charAt(0).toUpperCase() + val.title.slice(1)
                      }
                      trigger="click"
                      placement="bottom"
                    >
                      <div className="card">
                        <div className="row py-2 px-3">
                          <div className="col-6 fw-semibold">
                            {val.title.charAt(0).toUpperCase() +
                              val.title.slice(1)}
                          </div>
                          <div className="col-6 text-end">
                            <button
                              className="btn btn-success m-1"
                              onClick={() => handleOnclickEdit(val)}
                            >
                              <EditOutlined />
                            </button>
                            <button
                              className="btn btn-danger m-1"
                              onClick={() => handleOnclickDelete(val.id)}
                            >
                              <DeleteOutlined />
                            </button>
                          </div>
                        </div>
                        <div className="card-body d-flex align-items-start ">
                          <p className="card-text ">
                            {truncateDescription(
                              val.describe.charAt(0).toUpperCase() +
                                val.describe.slice(1),
                              8
                            )}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between py-3 px-3">
                          <div className="fw-lighter">
                            {val.status}{" "}
                            {val.status === "completed" ? (
                              <CheckCircleTwoTone twoToneColor="#52c41a" />
                            ) : (
                              <ExclamationCircleTwoTone twoToneColor="#dc3545" />
                            )}
                          </div>
                          <div className="text-primary">{val.date}</div>
                        </div>
                      </div>
                    </Popover>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-center ">
              <Pagination
                current={currentPage}
                total={filteredTasks.length}
                pageSize={tasksPerPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "80vh" }}
          >
            <div>
              <img
                src={img.noData}
                alt="No Task"
                height={"120px"}
                width={"120px"}
              />
            </div>
            <div className="fs-4 fw-semibold text-dark pb-2">
              No Task Have Been Created Yet!
            </div>
            <div className="text-secondary">Add Task!</div>
          </div>
        )}
      </div>

      <Modal
        title={isEditMode ? "Edit Task" : "Add Task"}
        open={isShowModal}
        onClose={closeModal}
        onOk={onSubmit}
        onCancel={closeModal}
        okText={isEditMode ? "Edit Task" : "Add Task"}
      >
        <div className="m-3">
          <Input
            className="my-2"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextArea
            className="my-2 mb-3"
            type="textArea"
            placeholder="Description"
            value={data.describe}
            onChange={(e) => setData({ ...data, describe: e.target.value })}
          />
          <Dropdown
            className={"me-3"}
            text={data.status ? data.status : "Status"}
            options={dropdownMenu}
            onSelect={handleDropdownSelect}
            trigger={["click"]}
          />
          <DatePicker
            className="mt-3 mt-sm-0"
            value={datePickerValue}
            onChange={handleDate}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TaskList;
