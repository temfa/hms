import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getCookie } from "cookies-next";

const baseUrl = "https://hms-api.daanverified.com/controllers";
export const mutationApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = getCookie("accessToken");
      // headers.set('x-api-key', `${process.env.BASE_KEY}`);
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    patient: builder.mutation({
      query: (newPatient) => ({
        url: "/patients.php",
        method: "POST",
        body: newPatient,
      }),
    }),
    getAllPatient: builder.mutation({
      query: (body) => {
        return {
          url: "/get_all_patients.php",
          method: "GET",
          body,
        };
      },
    }),
    users: builder.mutation({
      query: (body) => {
        return {
          url: "/users.php",
          method: "POST",
          body,
        };
      },
    }),
    medicalRecord: builder.mutation({
      query: (body) => {
        return {
          url: "/medical-records.php",
          method: "POST",
          body,
        };
      },
    }),
    createFarm: builder.mutation({
      query: (body) => {
        return {
          url: "/farm/create",
          method: "POST",
          body,
        };
      },
    }),
    editFarm: builder.mutation({
      query: (body) => {
        return {
          url: "/farm/edit",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { usePatientMutation, useGetAllPatientMutation, useUsersMutation, useMedicalRecordMutation, useVerifyPhoneTokenMutation, useCreateFarmMutation, useEditFarmMutation } =
  mutationApi;
