class MessagesTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedMessages: [],
		}
    }

	getText(message, workflow) {
		let text = message.text
			? `${message.text} (`
			: '';

		let triggerData;
		if (workflow.triggerModel === 'user') {
			triggerData = `User '${workflow.triggerName}'`;
		} else {
			triggerData = _.capitalize(workflow.triggerModel);
		}

		text += `
			${triggerData} ${workflow.originalTriggerAction}d ${workflow.entityModel} ${workflow.entityPrimaryId}
		`;

		if (message.text) text += ')';

		return text;
	}

	toggleMessageExpansion(id) {
		const currentExpandedMessages = this.state.expandedMessages;

		this.setState({
			expandedMessages: currentExpandedMessages.includes(id)
				? _.without(currentExpandedMessages, id)
				: [ ...currentExpandedMessages, id ]
		});
	}

	render() {
		const { messages, handleMessageAction, filter } = this.props;
		const { expandedMessages } = this.state;
		const iconMap = {
			'notify': 'bullhorn',
			'approve': 'gavel',
			'require': 'exclamation-circle'
        };
        const statusMap = {
            'approved': 'success',
            'rejected': 'danger',
            'read': 'info',
            'done': 'info',
        };
        const buttonData = {
            approve: {
                name: 'VIEW PRODUCT',
                outcome: 'approve',
            },
            notify: {
                name: 'MARK AS READ',
                outcome: 'read',
            },
            require: {
                name: 'MARK AS READ',
                outcome: 'done',
            }
        };

		return (
            <table className="table table-messages">
                <thead>
                    <tr>
                        <td id="table-messages-icon-header"></td>
                        <td id="table-messages-type-header">Type</td>
                        <td id="table-messages-date-header">Date</td>
                        <td id="table-messages-message-header">Message</td>
                        <td id="table-messages-status-header">Status</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        messages.map(message => {
                            return message.workflowData
                                .filter(workflow => {
                                    const text = this.getText(message, workflow);
                                    return (
                                        (filter.pill === 'all' || filter.pill === message.status) &&
                                        (filter.group === 'all' || filter.group === message.messageType) &&
                                        (!filter.search || text.toLowerCase().includes(filter.search.toLowerCase()))
                                    );
                                })
                                .map(workflow => {
                                    const text = this.getText(message, workflow);
                                    const rowClass = message.status === 'active'
                                        ? 'unread-message'
                                        : 'read-message'

                                    return (
                                        <React.Fragment key={message._id}>
                                            <tr className={rowClass}>
                                                <td>
                                                    <span className={`fa fa-${iconMap[message.messageType]}`}></span>
                                                </td>
                                                <td>
                                                    {_.capitalize(message.messageType)}
                                                </td>
                                                <td>
                                                    <span className="label label-info">
                                                        {moment(message.dateCreate).format('Do MMM YYYY, h:mm:ss a')}
                                                    </span>
                                                </td>
                                                <td>
													{text} {' '}
													<i
														class={`fa fa-chevron-circle-${expandedMessages.includes(message._id) ? 'up' : 'down'}`}
														onClick={() => this.toggleMessageExpansion(message._id)}
														style={{ cursor: 'pointer', display: message.status === 'active' ? 'none' : 'inline-block' }}
													/>
                                                </td>
                                                <td>
                                                    {
                                                        message.status !== 'active' &&
                                                        <span className={`label label-${statusMap[message.status]}`}>
                                                            {message.status}
                                                        </span>
                                                    }
                                                    {
                                                        message.status === 'active' &&
                                                        <button
                                                            type="button"
                                                            className="btn btn-info btn-xs"
                                                            onClick={() => handleMessageAction({
                                                                messageId: message._id,
                                                                outcome: buttonData[message.messageType].outcome,
                                                                productId: workflow.entityPrimaryId,
                                                            })}
                                                        >
                                                            {buttonData[message.messageType].name}
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
											{
												message.status !== 'active' &&
												<tr hidden={!expandedMessages.includes(message._id)}>
													<MessagesExtra message={message}/>
												</tr>
											}
                                        </React.Fragment>
                                    );
                            });
                        })
                    }
                </tbody>
            </table>
		);
	}
}
