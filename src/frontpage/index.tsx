import EventsContainer from "events/components/EventsContainer";
import React, { FC } from "react";
import Articles from "./components/Articles";
import ForCompanies from "./components/ForCompanies";
import Offline from "./components/Offline";
import { IOfflineIssue } from "./models/Offline";
import AprilFoolsCaptcha from "./components/AprilFoolsCaptcha";

interface FrontpageProps {
	offlines: IOfflineIssue[];
}

const Frontpage: FC<FrontpageProps> = ({ offlines }) => (
	<>
		<AprilFoolsCaptcha />
		<div>
			<h3>Fadderukene!</h3>
			<p>
				Nytt semester betyr nye fadderuker!
				<a href="https://splash.online.ntnu.no/">Gå til programmet</a>
			</p>
		</div>
		<EventsContainer />
		<Articles />
		<Offline issues={offlines} />
		<ForCompanies />
	</>
);

export default Frontpage;
