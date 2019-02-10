class Spinner extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-12" style={{ height: 100 + 'vh' }}>
					<div className="spinner-component" style={{
						position: 'absolute',
						left: '50%',
						top: 'calc(50% - 75px)',
						transform: 'translate(-50%, -50%)'
					}}>
						<p>{this.props.text}</p>
						<svg
							className="spinner"
							width="60"
							height="60"
							style={{
								position: 'relative',
								left: '25%'
							}}
						>
							<circle cx="30" cy="30" r="25" />
						</svg>
					</div>
				</div>
			</div>
		);
	}
}
