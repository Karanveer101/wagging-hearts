function renderTable(inquiries, navigate, statusColors, MdDeleteForever) {
    return (
        <div className='inquiries'>
            <table>
                <thead>
                    <tr>
                        <th>Date Received</th>
                        <th>From</th>
                        <th>Dog Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((inquiry, index) => (
                        <tr key={index}>
                            <td>{inquiry.createdAt}</td>
                            <td>
                                {inquiry.userId.firstName}{" "}
                                {inquiry.userId.lastName}
                            </td>
                            <td>
                                <h4>{inquiry.dogName}</h4>
                            </td>
                            <td>
                                <div>
                                    <img
                                        src={inquiry.dogImage}
                                        alt='dogImage'
                                    />
                                </div>
                            </td>
                            <td>
                                <div
                                    className='status'
                                    style={{
                                        backgroundColor:
                                            statusColors[inquiry.status],
                                    }}
                                >
                                    {inquiry.status}
                                </div>
                            </td>
                            <td>
                                <div className='inquiryBtnsContainer'>
                                    <button
                                        id='viewBtn'
                                        onClick={() =>
                                            navigate(
                                                "/admin/applications/inquiry/view",
                                                {
                                                    state: {
                                                        firstName:
                                                            inquiry.userId
                                                                .firstName,
                                                        lastName:
                                                            inquiry.userId
                                                                .lastName,
                                                        dateReceived:
                                                            inquiry.createdAt,
                                                        email: inquiry.userId
                                                            .email,
                                                        dogImage:
                                                            inquiry.dogImage,
                                                        dogName:
                                                            inquiry.dogName,
                                                        inquiryId: inquiry._id,
                                                        status: inquiry.status,
                                                        conversation: inquiry.conversation
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        View
                                    </button>
                                    <span>
                                        <MdDeleteForever
                                            className='deleteInqIcon'
                                            size='35'
                                            fill='#ff1e56c3'
                                        />
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default renderTable;
