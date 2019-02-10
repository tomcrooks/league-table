class MessagesList extends React.Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			isFetching: true, // Indicates if we are fetching a batch of messages
			hasMore: true, // Indicates if there are more messages to fetch
			numTotalMessages: 0, // The total number of the users messages
			numActiveMessages: 0, // Gets the number of users active messages
			messages: [], // An array of fetched messages
			limit: 25, // The batch limit for each fetch
			lastId: null, // The ID of the last message fetched
			unreadOnly: false, // If true, then only fetch unread messages
			error: false, // If not-falsey contains an error object
			activePill: 'all', // The default active pill on the navbar (all or unread only)
			selectedGroup: 'all', // The default selected group on the navbar (all, approvals, requires and notifications)
			filter: { pill: 'all', group: 'all', search: '' }, // The filter to apply to the messages
			searchValue: '' // The search box input
		}

		this.handleScroll = this.handleScroll.bind(this);
		this.handleFetchMessages = this.handleFetchMessages.bind(this);
		this.handleMessageAction = this.handleMessageAction.bind(this);
		this.changeActivePill = this.changeActivePill.bind(this);
		this.changeSelectedGroup = this.changeSelectedGroup.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentDidMount() {
		this.handleFetchMessages();
		this.containerEl = document.getElementById('message-list-container');
		this.containerEl.onscroll = this.handleScroll;
	}

	handleScroll(event) {
		const { error, isFetching, hasMore } = this.state;

		// Bail early if an error, data is already fetching, or if no more messages to fetch
		if (error || isFetching || !hasMore) return;

		// If the user has scrolled to the bottom of the container...
		if (this.containerEl.scrollHeight === this.containerEl.offsetHeight + this.containerEl.scrollTop) {
			this.handleFetchMessages();
		}
	}

	handleFetchMessages() {
		const { lastId, limit, unreadOnly, messages, numTotalMessages, numActiveMessages } = this.state;

		this.props.fetchMessages(lastId, limit, unreadOnly)
			.then(data => {
				this.setState({
					messages: [
						...messages,
						...data.messages,
					],
					numTotalMessages: _.isNumber(data.totalMessages) ? data.totalMessages : numTotalMessages,
					numActiveMessages: _.isNumber(data.activeMessages) ? data.activeMessages : numActiveMessages,
					hasMore: (data.messages.length + messages.length) < (data.totalMessages || numTotalMessages),
					isFetching: false,
					lastId: String(data.messages[data.messages.length -1]._id),
				});
			})
			.catch(err => {
				console.warn(err);
				this.setState({
					isFetching: false,
					hasMore: false,
					error: err,
				});
			});
	}

	handleMessageAction({ messageId, outcome, productId }) {
		if (outcome === 'approve') {
			this.props.gotoApprovalMode(productId);
			return;
		}

		const { numActiveMessages, messages } = this.state;
		const updatedMessages = [...messages]; // Creates new array of the messages data
		const updatedMessage = updatedMessages.find(message => message._id === messageId);
		const messageIndex = updatedMessages.indexOf(updatedMessage);

		if (messageIndex !== -1) {
			updatedMessages[messageIndex] = {
				...updatedMessage,
				status: outcome,
			}
		}

		this.props.handleButtonClick(messageId, outcome)
			.then(res => {
				this.setState({
					numActiveMessages: numActiveMessages - 1,
					messages: updatedMessages,
				});
			})
			.catch(err => {
				console.warn(err);
				this.setState({
					error: err
				});
			});
	}

	changeActivePill(pill) {
		this.setState({
			activePill: pill,
			filter: {
				...this.state.filter,
				pill: pill,
			},
			messages: [],
			unreadOnly: pill === 'active',
			lastId: null,
		}, () => {
			this.handleFetchMessages();
		});
	}

	changeSelectedGroup(option) {
		const group = option.target.textContent.toLowerCase();
		this.setState({
			selectedGroup: group,
			filter: {
				...this.state.filter,
				group: group,
			}
		});
	}

	handleSearchChange(event) {
		this.setState({
			searchValue: event.target.value,
			filter: {
				...this.state.filter,
				search: event.target.value,
			}
		});
	}

	render() {
		const { changeActivePill, changeSelectedGroup, handleSearchChange } = this;
		const {
			isFetching,
			hasMore,
			messages,
			numActiveMessages,
			numTotalMessages,
			activePill,
			selectedGroup,
			filter,
			searchValue,
		} = this.state;

		return (
			<div className="message-table-view">
				{
					!messages.length && isFetching &&
					<Spinner text="Fetching your messages..."/>
				}

				{
					!isFetching &&
					<>
						<MessagesNavbar
							numActiveMessages={numActiveMessages}
							numTotalMessages={numTotalMessages}
							activePill={activePill}
							changePill={changeActivePill}
							selectedGroup={selectedGroup}
							groupOptions={['all', 'approve', 'require', 'notify']}
							changeGroup={changeSelectedGroup}
							handleSearchChange={handleSearchChange}
							searchValue={searchValue}
						/>
						<MessagesTable
							messages={messages}
							handleMessageAction={this.handleMessageAction}
							filter={filter}
						/>
					</>
				}

				{
					!!messages.length && isFetching &&
					<h3>Getting more messages...</h3>
				}
				{
					!hasMore &&
					<p>No more messages!</p>
				}
			</div>
		);
	}
}
