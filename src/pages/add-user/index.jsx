import React from "react";
import Title from "@/components/Title";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const router = useRouter();

  const addUser = async (values) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, values);
      toast.success("Data Berhasil Ditambah");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Data Gagal Ditambah");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nama wajib di isi !"),
    email: Yup.string().required("Email wajib di isi !"),
    username: Yup.string().required("Username wajib di isi !"),
    phone: Yup.string().required("No. Telepon wajib di isi !"),
    tanggal_lahir: Yup.date().required("Tanggal lahir wajib di isi !"),
    tempat_lahir: Yup.string().required("Tempat lahir wajib di isi !"),
    bank: Yup.string().required("Bank wajib di isi !"),
    no_rekening: Yup.string().required("No. Rekening wajib di isi !"),
    status: Yup.string().required("Status wajib di isi !"),
    gender: Yup.string().required("Jenis kelamin wajib di isi !"),
    alamat: Yup.string().required("Alamat wajib di isi !"),
  });

  const DatePickerField = ({ field, form }) => (
    <Flatpickr
      {...field}
      className={`input input-bordered mb-3 ${
        form.errors[field.name] && form.touched[field.name] && "border-red-500"
      }`}
      placeholder="masukan tanggal lahir"
      value={field.value}
      onChange={(date) => form.setFieldValue(field.name, date)}
    />
  );

  const FormField = ({
    label,
    name,
    type = "text",
    component = "input",
    options,
    form,
  }) => (
    <div className="flex flex-col">
      <p className="text-gray-500 font-semibold">{label} :</p>
      {component === "input" ? (
        <Field
          type={type}
          name={name}
          placeholder={`masukan ${label.toLowerCase()}`}
          className={`input input-bordered mb-3 ${
            form.errors[name] && form.touched[name] && "border-red-500"
          }`}
        />
      ) : component === "select" ? (
        <Field
          name={name}
          as="select"
          className={`select select-bordered w-full mb-3 ${
            form.errors[name] && form.touched[name] && "border-red-500"
          }`}
        >
          <option disabled value="">
            Pilih {label}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
      ) : (
        <Field name={name} component={component} />
      )}
      {form.errors[name] && form.touched[name] && (
        <div className="text-sm text-red-500">{form.errors[name]}</div>
      )}
    </div>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        transition={Bounce}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Title titlePage="Add User" textButton="Cancel" href="/" />
      <div className="my-4">
        <p className="font-bold text-2xl text-gray-500 mb-2">Profile</p>
        <div className="border-b border-gray-400"></div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            username: "",
            phone: "",
            tanggal_lahir: "",
            tempat_lahir: "",
            bank: "",
            no_rekening: "",
            status: "",
            gender: "",
            alamat: "",
          }}
          validationSchema={validationSchema}
          onSubmit={addUser}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <div className="md:grid md:grid-cols-2 gap-3 my-5 flex flex-col">
                <FormField
                  label="Name"
                  name="name"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Username"
                  name="username"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Phone"
                  name="phone"
                  type="number"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Date of Birth"
                  name="tanggal_lahir"
                  component={DatePickerField}
                  form={{ errors, touched }}
                />
                <FormField
                  label="Bank"
                  name="bank"
                  component="select"
                  options={["BRI", "BCA", "BNI", "MANDIRI"]}
                  form={{ errors, touched }}
                />
                <FormField
                  label="No Rekening"
                  name="no_rekening"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Status"
                  name="status"
                  form={{ errors, touched }}
                />
                <FormField
                  label="Gender"
                  name="gender"
                  component="select"
                  options={["Male", "Female"]}
                  form={{ errors, touched }}
                />
                <FormField
                  label="Alamat"
                  name="alamat"
                  form={{ errors, touched }}
                />
              </div>
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-1 px-4 rounded-md"
              >
                Tambah
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddUser;
