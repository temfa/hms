import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getCookie } from "cookies-next";

const baseUrl = "https://hms-api.000webhostapp.com/controllers";
export const mutationApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = getCookie("accessToken");
      // headers.set('x-api-key', `${process.env.BASE_KEY}`);
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerNewPatient: builder.mutation({
      query: (newPatient) => ({
        url: "/patients.php",
        method: "POST",
        body: newPatient,
      }),
    }),
    verifyPhoneToken: builder.mutation({
      query: (body) => {
        return {
          url: "/account/verification/phone_num/verify_token",
          method: "POST",
          body,
        };
      },
    }),
    verifyEmailToken: builder.mutation({
      query: (body) => {
        return {
          url: "/account/verification/email/verify_token",
          method: "POST",
          body,
        };
      },
    }),
    verifyFarmerId: builder.mutation({
      query: (body) => {
        return {
          url: "/farmer/verify",
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

export const { useRegisterNewPatientMutation, useVerifyFarmerIdMutation, useVerifyEmailTokenMutation, useVerifyPhoneTokenMutation, useCreateFarmMutation, useEditFarmMutation } =
  mutationApi;
