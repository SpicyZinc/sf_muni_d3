export const WIDTH = 1300;
export const HEIGHT = 900;

export const ROUTE_LIST_URL = "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni";
export const ALL_VEHICLE_URL = "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0";
export const ONE_ROUTE_VEHICLE_URL = "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0&r=";
export const UPDATE_INTERVAL = 15 * 1000;

export const SF_CENTER = [-122.433701, 37.767683];

export const SCALE = 300000;
export const SCALE_EXTENT = [0.5, 10];

export const MULTI_SELECTION_PLACEHOLDER = "Select route tag(s)";

export const NEIGHBORHOOD = "neighborhood";
export const ARTERY = "artery";
export const FREEWAY = "freeway";
export const STREET = "street";
