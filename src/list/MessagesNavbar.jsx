class MessagesNavbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			numActiveMessages,
			numTotalMessages,
			activePill,
			changePill,
			selectedGroup,
			groupOptions,
			changeGroup,
			searchValue,
			handleSearchChange,
		} = this.props;

		return (
			<div id="message-table-navbar" className="container-fluid full">
				<div className="row">
					<div className="dropdown col-sm-3" style={{ top: '10px' }}>
						<button
							className="btn btn-default dropdown-toggle"
							type="button"
							id="groupDropdown"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="true"
						>
							Show type: {_.capitalize(selectedGroup) + ' '}
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu" aria-labelledby="groupDropdown">
							{
								groupOptions.map((option, idx) =>
									<li key={idx} onClick={changeGroup}>
										<label className={`${selectedGroup === option ? 'active' : ''}`}>
											{_.capitalize(option)}
										</label>
									</li>
								)
							}
						</ul>
					</div>

					<div class="input-group col-sm-6" style={{ top: '10px' }}>
						<input
							type="text"
							className="form-control"
							placeholder="Search..."
							value={searchValue}
							onChange={handleSearchChange} />
					</div>

					{/* Nav pills do not adhere to the col-x-y for some reason */}
					<div className="pull-right" style={{ position: 'relative', top: '-22px' }}>
						<ul className="nav nav-pills" role="tablist">
							<li role="presentation" className={`${activePill === 'all' ? 'active' : ''}`}>
								<a onClick={() => changePill('all')}>
									All <span className="badge">{numTotalMessages}</span>
								</a>
							</li>
							<li role="presentation" className={`${activePill === 'active' ? 'active' : ''}`}>
								<a onClick={() => changePill('active')}>
									Active <span className="badge">{numActiveMessages}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
