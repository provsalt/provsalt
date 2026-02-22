import { Map, MapMarker, MapMarkerClusterGroup, MapPopup, MapTileLayer } from "@/components/ui/map.tsx";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TravelMap = ()  => {
	const {t} = useTranslation();

	const markers = [
	  { lat: 1.3521, lng: 103.8198, label: t("map.singapore"), colour: "primary" },
		  { lat: 3.1390, lng: 101.6869, label: t("map.kualaLumpur"), colour: "secondary" },
		  { lat: 1.4927, lng: 103.7414, label: t("map.johorBahru"), colour: "secondary" },
		  { lat: 5.4141, lng: 100.3288, label: t("map.penang"), colour: "secondary" },
		  { lat: 22.5431, lng: 114.0579, label: t("map.shenzhen"), colour: "secondary" },
		  { lat: 22.3193, lng: 114.1694, label: t("map.hongKong"), colour: "secondary" },
		  { lat: 1.0861, lng: 104.0305, label: t("map.batam"), colour: "secondary" },
		  { lat: 47.6062, lng: -122.3321, label: t("map.seattle"), colour: "secondary" },
		  { lat: 47.6740, lng: -122.1215, label: t("map.redmond"), colour: "secondary" },
		  { lat: 48.6973, lng: -122.9438, label: t("map.orcasIsland"), colour: "secondary" },
		  { lat: 33.5904, lng: 130.4017, label: t("map.fukuoka"), colour: "secondary" },
		  { lat: 33.3197, lng: 130.5081, label: t("map.kurume"), colour: "secondary" },
		  { lat: 33.2494, lng: 130.2990, label: t("map.saga"), colour: "secondary" },
		  { lat: 33.3796, lng: 130.5080, label: t("map.tosu"), colour: "secondary" },
		  { lat: 32.7503, lng: 129.8779, label: t("map.nagasaki"), colour: "secondary" },
		  { lat: 31.5966, lng: 130.5571, label: t("map.kagoshima"), colour: "secondary" },
		  { lat: 32.8031, lng: 130.7079, label: t("map.kumamoto"), colour: "secondary" },
		  { lat: 31.9077, lng: 131.4202, label: t("map.miyazaki"), colour: "secondary" },
		  { lat: 33.2382, lng: 131.6126, label: t("map.oita"), colour: "secondary" },
		  { lat: 33.2843, lng: 131.4913, label: t("map.beppu"), colour: "secondary" },
		  { lat: 33.8834, lng: 130.8751, label: t("map.kitakyushu"), colour: "secondary" },
		  { lat: 34.3853, lng: 132.4553, label: t("map.hiroshima"), colour: "secondary" },
		  { lat: 34.1674, lng: 132.2237, label: t("map.iwakuni"), colour: "secondary" },
		  { lat: 34.2955, lng: 132.3192, label: t("map.miyajima"), colour: "secondary" },
		  { lat: 33.8416, lng: 132.7657, label: t("map.matsuyama"), colour: "secondary" },
		  { lat: 33.5597, lng: 133.5311, label: t("map.kochi"), colour: "secondary" },
		  { lat: 33.9081, lng: 133.8006, label: t("map.miyoshi"), colour: "secondary" },
		  { lat: 34.3401, lng: 134.0434, label: t("map.takamatsu"), colour: "secondary" },
		  { lat: 34.4618, lng: 134.1886, label: t("map.naoshima"), colour: "secondary" },
		  { lat: 34.6901, lng: 135.1956, label: t("map.kobe"), colour: "secondary" },
		  { lat: 34.6452, lng: 134.9980, label: t("map.akashi"), colour: "secondary" },
		  { lat: 34.8153, lng: 134.6854, label: t("map.himeji"), colour: "secondary" },
		  { lat: 34.6937, lng: 135.5023, label: t("map.osaka"), colour: "secondary" },
		  { lat: 35.6762, lng: 139.7503, label: t("map.tokyo"), colour: "secondary" },
		  { lat: 35.0116, lng: 135.7681, label: t("map.kyoto"), colour: "secondary" },
		  { lat: 34.6851, lng: 135.8048, label: t("map.nara"), colour: "secondary" },
		  { lat: 34.8841, lng: 135.7986, label: t("map.uji"), colour: "secondary" },
		  { lat: 35.1815, lng: 136.9066, label: t("map.nagoya"), colour: "secondary" },
		  { lat: 35.4437, lng: 139.6380, label: t("map.yokohama"), colour: "secondary" },
		  { lat: 34.9756, lng: 138.3827, label: t("map.shizuoka"), colour: "secondary" },
	]

	return (
		<Map
			center={[0, 0]}
			zoom={2}
			minZoom={2}
			maxBounds={[[-90, -180], [90, 180]]}
			maxBoundsViscosity={1.0}
		>
			<MapTileLayer />

			<MapMarkerClusterGroup>

				{markers.map((marker, i) => {

					const color = `var(--${marker.colour})`;
					return (
						<MapMarker
							key={marker.label}
							icon={<MapPin size={28} style={{ color }} />}
							position={[marker.lat, marker.lng]}
						>
							<MapPopup>{marker.label}</MapPopup>
						</MapMarker>
					)
				})}
			</MapMarkerClusterGroup>
		</Map>
	);
}