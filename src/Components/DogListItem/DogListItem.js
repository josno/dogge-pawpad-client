import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DogListItem.css';

class DogListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<ul>
					<li className="dog-item">
						<Link
							className="dogs-list-button"
							to={`/dog-info/${this.props.id}`}
						>
							<div className="dog-img-container">
								<img alt="Winky Doggo" src={this.props.img} />
								<p className="dogs-list-name">
									{this.props.name}
								</p>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default DogListItem;
