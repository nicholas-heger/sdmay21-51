package app.utilities;

import app.entities.common.Location;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class GoogleMapsAPIService {
    // AIzaSyB0RUeMt9fWhsmtkpvZRvKH87TjwM4-jYo
    private final String API_KEY = "AIzaSyB0RUeMt9fWhsmtkpvZRvKH87TjwM4-jYo";

    private final RestTemplate restTemplate;

    public GoogleMapsAPIService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public Double getDistanceBetweenTwoCoordinates(Location origin, Location destination) {
        StringBuilder link = new StringBuilder("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial");
        Map<String, String> parameters = new HashMap<>();

        parameters.put("origins", origin.getLatitude() + "," + origin.getLongitude());
        parameters.put("destinations", destination.getLatitude() + "," + destination.getLongitude());
        parameters.put("key", API_KEY);

        for (String key : parameters.keySet()) {
            link.append("&").append(key).append("=").append(parameters.get(key));
        }

        JsonResponse jsonResponse = this.restTemplate.getForObject(link.toString(), JsonResponse.class);
        Double distance = jsonResponse.rows[0].elements[0].distance.value;

        return distance;
    }

    public static class JsonResponse {
        public String[] destination_addresses;
        public String[] origin_addresses;
        public Row[] rows;

        public String toString() {
            return Arrays.toString(rows);
        }

        public static class Row {
            public Element[] elements;

            public static class Element {
                public DistanceOrDuration distance;
                public DistanceOrDuration duration;
                public String status;

                public static class DistanceOrDuration {
                    public String text;
                    public Double value;
                }
            }
        }

    }


}
