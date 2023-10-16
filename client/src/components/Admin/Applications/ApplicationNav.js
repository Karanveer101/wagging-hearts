import React from "react";
import "../../../styles/Admin/application.css";
import { useLocation } from "react-router-dom";

function ApplicationNav() {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className='ApplicationNav'>
            <nav className='applicationLinksContainer'>
                <ul className='applicationLinks'>
                    <li>
                        <a
                            href='/admin/applications/inquiries'
                            className={
                                location.pathname ===
                                "/admin/applications/inquiries"
                                    ? "active"
                                    : ""
                            }
                        >
                            All Inquiries
                        </a>
                    </li>
                    <li>
                        <a
                            href='/admin/applications/pending'
                            className={
                                location.pathname ===
                                "/admin/applications/pending"
                                    ? "active"
                                    : ""
                            }
                        >
                            Pending
                        </a>
                    </li>
                    <li>
                        <a
                            href='/admin/applications/review'
                            className={
                                location.pathname ===
                                "/admin/applications/review"
                                    ? "active"
                                    : ""
                            }
                        >
                            In Review
                        </a>
                    </li>
                    <li>
                        <a
                            href='/admin/applications/approved'
                            className={
                                location.pathname ===
                                "/admin/applications/approved"
                                    ? "active"
                                    : ""
                            }
                        >
                            Approved
                        </a>
                    </li>
                    <li>
                        <a
                            href='/admin/applications/rejected'
                            className={
                                location.pathname ===
                                "/admin/applications/rejected"
                                    ? "active"
                                    : ""
                            }
                        >
                            Rejected
                        </a>
                    </li>
                    <li>
                        <a
                            href='/admin/applications/adopted'
                            className={
                                location.pathname ===
                                "/admin/applications/adopted"
                                    ? "active"
                                    : ""
                            }
                        >
                            Adopted
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ApplicationNav;
