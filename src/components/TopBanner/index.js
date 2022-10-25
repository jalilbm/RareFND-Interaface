import "./index.scss";

export default function TopBanner(props) {
	return (
		<div className="topBanner">
			<a href={props.href} target="_blank" rel="noopener">
				<div className="centerDiv">
					<p>{props.text}</p>
					<img
						src="https://assets-global.website-files.com/612f5131b9c94ecd0fe9c722/612f5131b9c94e864ae9c73e_button-arrow.svg"
						loading="lazy"
						alt="Arrow icon"
					></img>
				</div>
			</a>
		</div>
	);
}
