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
		<div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
			<h3 style="font-size: 2rem; margin-bottom: 10px; color: #333;">
				Fadderukene!
			</h3>
			<p style="font-size: 1.1rem; margin-bottom: 15px;">
				Nytt semester betyr nye fadderuker!
				<br />
				<a
					href="https://splash.online.ntnu.no/"
					style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; transition: background-color 0.3s; margin-top: 10px;"
				>
					Gå til programmet
				</a>
			</p>
		</div>
		<EventsContainer />
		<Articles />
		<Offline issues={offlines} />
		<ForCompanies />
	</>
);

export default Frontpage;
