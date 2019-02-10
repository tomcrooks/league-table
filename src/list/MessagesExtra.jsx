class MessagesExtra extends React.Component {
	constructor(props) {
		super(props);
    }

    render() {
        const { message } = this.props;
        return (
            <>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <ol style={{ padding: 0 }}>
                        <li><span style={{ fontWeight: 800 }}>Outcome</span>
                            {` - ${_.capitalize(message.status)}`}
                        </li>
                        {
                            message.status === 'rejected' &&
                            <li><span style={{ fontWeight: 800 }}>Reason</span>
                                {` - ${message.rejectReason || 'N/A'}`}
                            </li>
                        }
                        <li><span style={{ fontWeight: 800 }}>Actioned By</span>
                            {` - '${message.actionedBy || 'Unknown'}'`}
                        </li>
                        <li><span style={{ fontWeight: 800 }}>Date Actioned</span>
                            {
                                message.actionedDate &&
                                ' - ' + moment(message.actionedDate).format('Do MMM YYYY, h:mm:ss a')
                            }
                            {
                                !message.actionedDate &&
                                ' - Unknown'
                            }
                        </li>
                    </ol>
                </td>
                <td></td>
            </>
        );
    }
}
