import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-200">
            <div className="col-lg-10 col-xl-10">
              <div className="card rounded-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                  className="w-100"
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Registration Info
                  </h3>

                  <form className="px-md-2">
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1q"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form3Example1q">
                        Name
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline datepicker">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleDatepicker1"
                          />
                          <label htmlFor="exampleDatepicker1" className="form-label">
                            Select a date
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="select">
                          <option value="1" disabled>
                            Gender
                          </option>
                          <option value="2">Female</option>
                          <option value="3">Male</option>
                          <option value="4">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <select className="select">
                        <option value="1" disabled>
                          className
                        </option>
                        <option value="2">Class 1</option>
                        <option value="3">Class 2</option>
                        <option value="4">Class 3</option>
                      </select>
                    </div>

                    <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1w"
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example1w">
                            Registration code
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg mb-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
