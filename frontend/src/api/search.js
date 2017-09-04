// API Users static class
export default class ApiSearch {
  // get a list of users
  static search(type, lat, lon) {
    //for debug
    /*lat = 51.5237155;
    lon = -0.1452524;*/

    /*lat = 51.547116;
    lon = -0.0569284;*/

    /*lat = 51.5131095;
    lon = -0.0886051
    lat = 51.5093611;
    lon = -0.0023906;*/
    lat = 51.531602;
    lon = -0.1244395;

    let filter = 'NaptanMetroStation,NaptanRailStation';

    if (type == 'Cycle') {
      filter = 'BikePoint';
    } else {
      let parse = function(text, method) {
        let json = JSON.parse(text);
        let result = [];
        let entry = {};
        let compare = 'tube';

        if (method == 'Overground') compare = 'overground';

        if ('places' in json) {
          let request = null;

          for (let place of json.places) {
            entry = {
              id: place.id,
              name: place.commonName,
              distance: place.distance,
              modes: {}
            };

            for (let mode of place.lineModeGroups) entry.modes[mode.modeName] = {mode: mode.modeName, lines: mode.lineIdentifier};

            // Skip those stops that don't even have our method
            if (!Object.keys(entry.modes).includes(compare)) continue;

            request = new XMLHttpRequest();
            // Synchronous request
            request.open('GET', `https://api.tfl.gov.uk/stoppoint/${place.id}/disruption`, false);
            // CORS
            request.withCredentials = false;

            request.onreadystatechange = function () {
              if (request.readyState === 4 && request.status === 200) {
                let disruption = [];
                let j = JSON.parse(request.responseText);

                for (let line of j) {
                  if (line.type != 'Information') {
                    disruption.push({
                      from: line.fromDate,
                      to: line.toDate,
                      type: line.type,
                      mode: line.mode,
                      description: line.description,
                    });
                  }
                }

                entry['disruption'] = disruption;
              }
            };

            request.send();

            result.push(entry);
          }

          return result;
        }

        return json;
      }

      return new Promise(res => {
        let request = new XMLHttpRequest();

        request.open('GET', `https://api.tfl.gov.uk/Place?type=${filter}&lat=${lat}&lon=${lon}&radius=800`, true);
        request.withCredentials = false;

        // Had issues with using fetch, so reverted to XMLHttpRequest
        request.onreadystatechange = function() {
          if (request.readyState === 4 && request.status === 200) {
            res(parse(request.responseText, type));
          } else if (request.readyState === 4 && request.status !== 200) {
            console.log('req err');
            res([]);
          }
        };

        request.send();
      });
    }
  }
}
