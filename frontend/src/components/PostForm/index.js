import React, { memo, useRef, useState } from "react";
import avatar from "../../assets/images/avatar/avatar.svg";
import FormikConatiner from "../formikControl/FormikContainer";
import FieldContainer from "../formikControl/FieldContainer";
import * as Yup from "yup";
import { Form } from "formik";
import Divider from "../Divider";
import { icons } from "../../utils/icons";
import postServices from "../../services/posts";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
const initialValues = {
    description: "",
    picturePath: "",
};
const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};
const MAX_FILE_SIZE = 1024000; //1mb
function isValidFileType(fileName, fileType) {
    return (
        fileName &&
        validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
}
const validationSchema = Yup.object().shape({
    description: Yup.string().required("This Field Required"),
    picturePath: Yup.mixed()
        .test("is-valid-type", "Not a valid image type", value => {
            return value
                ? isValidFileType(value && value[0].name.toLowerCase(), "image")
                : true;
        })
        .test("is-valid-size", "Max allowed size is 1MB", value => {
            return value ? value && value[0].size <= MAX_FILE_SIZE : true;
        }),
});
const Index = ({ user }) => {
    const [addImage, setAddImage] = useState(false);
    const fileRef = useRef();
    const queryClient = useQueryClient();
    const contolsList = [
        {
            id: 1,
            name: "Image",
            icon: icons.img,
            clickHandler: () => {
                setAddImage(true);
            },
        },
        {
            id: 2,
            name: "Clip",
            icon: icons.clip,
            clickHandler: () => {},
        },
        {
            id: 3,
            name: "Attachment",
            icon: icons.attachment,
            clickHandler: () => {},
        },
        {
            id: 4,
            name: "Audio",
            icon: icons.audio,
            clickHandler: () => {},
        },
    ];
    const removeImageHandler = setFieldValue => {
        setAddImage(false);
        setFieldValue("picturePath", "");
    };
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        if (values.description !== "") {
            const formData = new FormData();
            formData.append("userId", user._id);
            formData.append("description", values.description);
            values.picturePath
                ? formData.append("picturePath", values.picturePath[0])
                : formData.append("picturePath", "");
            postServices
                .createPost(formData)
                .then(res => {
                    if (res.status === 201) {
                        toast.success("Post successfully");
                        queryClient.refetchQueries("getPosts");
                    }
                })
                .catch(err => {
                    toast.error(err.response?.data?.message || "Server Error");
                });
        }

        setTimeout(() => {
            setSubmitting(false);

            resetForm();
        }, 1500);
    };

    return (
        <div className="form bg-white dark:bg-secondry-dark p-4 rounded-sm shadow-sm mb-4 ">
            <FormikConatiner
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, setFieldValue }) => {
                    return (
                        <Form>
                            <div className="flex">
                                <img
                                    src={
                                        user?.picturePath
                                            ? process.env
                                                  .REACT_APP_BACKEND_API +
                                              user?.picturePath
                                            : avatar
                                    }
                                    alt="user img"
                                    className="w-[50px] h-[50px] rounded-full mr-2 object-cover"
                                />
                                <FieldContainer
                                    type="textarea"
                                    placeholder="What is in your mind..."
                                    name="description"
                                    customStyle="h-[100px] p-4 "
                                />
                            </div>
                            {addImage && (
                                <div className="flex items-center justify-between border p-4  border-primary-border dark:border-primary-border-dark ">
                                    <FieldContainer
                                        fileRef={fileRef}
                                        type="file"
                                        name="picturePath"
                                        customStyle={""}
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        className="-order-1"
                                        onClick={() => fileRef.current.click()}
                                    >
                                        {values.picturePath !== ""
                                            ? values.picturePath[0].name
                                            : "Choose Image"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            removeImageHandler(setFieldValue)
                                        }
                                        className="text-sm"
                                        type="button"
                                    >
                                        {icons.trash}
                                    </button>
                                </div>
                            )}
                            <Divider />
                            <div className="flex flex-col md:flex-row items-center gap-2">
                                <div className="controls grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                                    {contolsList.map(c => {
                                        return (
                                            <button
                                                type="button"
                                                onClick={c.clickHandler}
                                                key={c.id}
                                                className=" flex items-center justify-center hover:dark:border-primary-border-dark hover:border p-2 rouned-sm text-slate-500 w-full"
                                            >
                                                <span className="text-lg mr-1">
                                                    {c.icon}
                                                </span>{" "}
                                                {c.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    type="submit"
                                    className="flex bg-primary border-none text-white rounded-full items-center justify-center border p-2 rouned-sm  w-full md:w-[200px]"
                                >
                                    Post
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </FormikConatiner>
        </div>
    );
};

export default memo(Index);
